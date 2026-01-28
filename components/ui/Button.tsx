interface ButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Button({
  text,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) {
  // Classes de base
  const baseStyles = "font-semibold rounded-full transition-all duration-300 inline-block";

  // Variants
  const variants = {
    primary: "bg-primary text-white hover:shadow-lg hover:scale-105",
    secondary: "bg-white text-primary hover:bg-gray-100",
    ghost: "text-white hover:opacity-80",
  };

  // Sizes
  const sizes = {
    sm: "py-2 px-6 text-sm",
    md: "py-3 px-8 text-base",
    lg: "py-4 px-12 text-lg",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  // Si c'est un lien
  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {text}
      </a>
    );
  }

  // Si c'est un bouton
  return (
    <button onClick={onClick} className={combinedClassName}>
      {text}
    </button>
  );
}
