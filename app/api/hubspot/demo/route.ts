import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const HUBSPOT_BASE_URL = 'https://api.hubapi.com';

type DemoPayload = {
  email?: string;
  language?: string;
  role?: string;
  propertyCount?: number;
  source?: string;
};

async function hubspotFetch(path: string, options: RequestInit) {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) {
    throw new Error('HUBSPOT_PRIVATE_APP_TOKEN manquante');
  }

  const response = await fetch(`${HUBSPOT_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  return response;
}

async function findContactIdByEmail(email: string): Promise<string | null> {
  const response = await hubspotFetch('/crm/v3/objects/contacts/search', {
    method: 'POST',
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'email',
              operator: 'EQ',
              value: email,
            },
          ],
        },
      ],
      properties: ['email'],
      limit: 1,
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { results?: Array<{ id: string }> };
  return data?.results?.[0]?.id ?? null;
}

async function handleHubspotError(response: Response, context: string) {
  const details = await response.text();
  console.error(`[HubSpot] ${context} failed`, {
    status: response.status,
    details,
  });
  return NextResponse.json(
    { error: 'Erreur HubSpot', status: response.status, details },
    { status: response.status || 502 }
  );
}

function buildProperties(payload: DemoPayload) {
  const properties: Record<string, string | number> = {};
  const languageMap: Record<string, string> = {
    fr: 'Fr',
    en: 'En',
    es: 'Es',
    pt: 'Pt',
  };

  if (payload.email) properties.email = payload.email;
  if (payload.language) {
    properties.langue = languageMap[payload.language] ?? payload.language;
  }
  if (payload.role) properties.role = payload.role;
  if (typeof payload.propertyCount === 'number') {
    properties.biloki_property_count = payload.propertyCount;
  }
  if (payload.source) properties.source_biloki = payload.source;

  return properties;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DemoPayload;
    if (!body?.email) {
      return NextResponse.json({ error: 'Email manquant' }, { status: 400 });
    }

    const properties = buildProperties(body);
    const existingId = await findContactIdByEmail(body.email);

    if (existingId) {
      const updateResponse = await hubspotFetch(`/crm/v3/objects/contacts/${existingId}`, {
        method: 'PATCH',
        body: JSON.stringify({ properties }),
      });

      if (!updateResponse.ok) {
        return handleHubspotError(updateResponse, 'Update contact');
      }

      return NextResponse.json({ success: true, updated: true });
    }

    const createResponse = await hubspotFetch('/crm/v3/objects/contacts', {
      method: 'POST',
      body: JSON.stringify({ properties }),
    });

    if (!createResponse.ok) {
      return handleHubspotError(createResponse, 'Create contact');
    }

    return NextResponse.json({ success: true, created: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur interne du serveur', details: String(error) },
      { status: 500 }
    );
  }
}
