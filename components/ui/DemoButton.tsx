import Link from 'next/link';
import { trackDemoClick } from '@/lib/tracking';

interface DemoButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  location?: string;
  onClick?: () => void;
}

export default function DemoButton({
  href,
  children,
  className = 'bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all',
  location = 'unknown',
  onClick
}: DemoButtonProps) {
  const handleClick = () => {
    trackDemoClick(location);
    onClick?.();
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
