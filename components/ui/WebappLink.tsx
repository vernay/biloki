'use client';

import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n/config';
import { WEBAPP_LOGIN_URL, WEBAPP_REGISTER_URL } from '@/lib/config';

interface WebappLinkProps {
  type?: 'login' | 'register';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function WebappLink({ 
  type = 'register', 
  children, 
  className = '',
  onClick 
}: WebappLinkProps) {
  const pathname = usePathname();
  const pathLocale = pathname.split('/')[1] as Locale;
  const locale = locales.includes(pathLocale) ? pathLocale : 'fr';
  
  const baseUrl = type === 'login' ? WEBAPP_LOGIN_URL : WEBAPP_REGISTER_URL;
  const href = `${baseUrl}?lang=${locale}`;
  
  return (
    <a 
      href={href} 
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
