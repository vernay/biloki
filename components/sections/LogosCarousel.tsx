'use client';

interface Logo {
  src: string;
  alt: string;
}

interface LogosCarouselProps {
  logos: Logo[];
}

export default function LogosCarousel({ logos }: LogosCarouselProps) {
  // Diviser les logos en 4 rangées
  const logosPerRow = Math.ceil(logos.length / 4);
  const topRow = logos.slice(0, logosPerRow);
  const secondRow = logos.slice(logosPerRow, logosPerRow * 2);
  const thirdRow = logos.slice(logosPerRow * 2, logosPerRow * 3);
  const bottomRow = logos.slice(logosPerRow * 3);

  return (
    <div className="space-y-4">
      {/* Mobile: grille statique */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:hidden">
        {logos.map((logo) => (
          <div
            key={logo.alt}
            className="logo-card logo-card--grid rounded-2xl bg-white/50 p-3 flex items-center justify-center"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-9 object-contain"
              width={120}
              height={36}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* Desktop: marquees */}
      <div className="hidden md:block overflow-hidden">
        <div className="logo-marquee logo-marquee--left">
          {[...topRow, ...topRow].map((logo, index) => (
            <div
              key={`${logo.alt}-top-${index}`}
              className="logo-card logo-card--marquee rounded-2xl bg-white/50 p-4 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 object-contain"
                width={120}
                height={40}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:block overflow-hidden">
        <div className="logo-marquee logo-marquee--right">
          {[...secondRow, ...secondRow].map((logo, index) => (
            <div
              key={`${logo.alt}-second-${index}`}
              className="logo-card logo-card--marquee rounded-2xl bg-white/50 p-4 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 object-contain"
                width={120}
                height={40}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:block overflow-hidden">
        <div className="logo-marquee logo-marquee--left logo-marquee--slow">
          {[...thirdRow, ...thirdRow].map((logo, index) => (
            <div
              key={`${logo.alt}-third-${index}`}
              className="logo-card logo-card--marquee rounded-2xl bg-white/50 p-4 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 object-contain"
                width={120}
                height={40}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:block overflow-hidden">
        <div className="logo-marquee logo-marquee--right logo-marquee--slow">
          {[...bottomRow, ...bottomRow].map((logo, index) => (
            <div
              key={`${logo.alt}-bottom-${index}`}
              className="logo-card logo-card--marquee rounded-2xl bg-white/50 p-4 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 object-contain"
                width={120}
                height={40}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .logo-marquee {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: marquee-left 14s linear infinite;
          will-change: transform;
        }
        .logo-marquee--right {
          animation-name: marquee-right;
        }
        .logo-marquee--slow {
          animation-duration: 18s;
        }
        .logo-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .logo-card--marquee {
          min-width: 120px;
        }
        .logo-card:hover {
          transform: translateY(-2px) scale(1.02);
          border-color: rgba(4, 164, 255, 0.6);
          box-shadow: 0 8px 20px rgba(4, 164, 255, 0.18);
        }
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-marquee { animation: none; }
        }
      `}</style>
    </div>
  );
}
