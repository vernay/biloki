#!/bin/bash

# Script de test de l'API HubSpot pour le support technique
# Usage: ./test-hubspot.sh

echo "🧪 Test de l'API HubSpot - Support technique"
echo "=============================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# URL de l'API (change selon ton environnement)
API_URL="${1:-http://localhost:3000}/api/hubspot/create-contact"

echo "📡 URL testée: $API_URL"
echo ""

# Payload de test
read -r -d '' PAYLOAD << EOM
{
  "firstName": "Test",
  "lastName": "Support",
  "email": "test-support-$(date +%s)@biloki.fr",
  "phone": "+33612345678",
  "propertyCount": "10",
  "role": "Gestionnaire",
  "conversation": "🛠 SUPPORT TECHNIQUE\n\nProblème décrit:\nTest de problème technique\n\nVisiteur: J'ai un problème\nAssistant: Comment puis-je vous aider ?",
  "source": "Chatbot - Support technique",
  "locale": "fr",
  "requestType": "Support technique",
  "problemDescription": "Test de problème technique",
  "urgent": true
}
EOM

echo "📤 Envoi de la requête..."
echo ""

# Faire la requête
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

# Séparer le body et le code HTTP
HTTP_BODY=$(echo "$RESPONSE" | head -n -1)
HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)

echo "📥 Réponse HTTP: $HTTP_CODE"
echo ""

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✅ SUCCÈS${NC}"
  echo ""
  echo "Body de la réponse:"
  echo "$HTTP_BODY" | jq '.' 2>/dev/null || echo "$HTTP_BODY"
else
  echo -e "${RED}❌ ERREUR${NC}"
  echo ""
  echo "Body de la réponse:"
  echo "$HTTP_BODY" | jq '.' 2>/dev/null || echo "$HTTP_BODY"
fi

echo ""
echo "=============================================="
echo "💡 Maintenant vérifie les logs du serveur Next.js"
echo "   et va dans HubSpot pour voir si le contact a été créé"
