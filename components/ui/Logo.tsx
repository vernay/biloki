import Link from "next/link";

interface LogoProps {
  className?: string;
  alt?: string;
}

export default function Logo({ className = "h-[120px]", alt = "Biloki" }: LogoProps) {
  return (
    <Link href="/">
      <img
        src="/logos/logo biloki.png"
        alt={alt}
        className={className}
      />
    </Link>
  );
}
