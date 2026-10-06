import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  alt?: string;
}

export default function Logo({ className = "h-8 w-auto", alt = "Biloki" }: LogoProps) {
  return (
    <Link href="/">
      <Image
        src="/logos/logo-biloki.png"
        alt={alt}
        className={className}
        width={240}
        height={120}
      />
    </Link>
  );
}
