'use client';

interface Logo {
  name: string;
  logo: string;
}

interface LogosCarouselProps {
  logos: Logo[];
  rows?: number;
}

export default function LogosCarousel({
  logos,
  rows = 4
}: LogosCarouselProps) {
  // Diviser les logos en rangées
  const logosPerRow = Math.ceil(logos.length / rows);
  const rowsArray = Array.from({ length: rows }, (_, i) =>
    logos.slice(i * logosPerRow, (i + 1) * logosPerRow)
  );

  return (
    <div className="relative w-full space-y-6">
      {rowsArray.map((rowLogos, rowIndex) => {
        const isReversed = rowIndex % 2 !== 0;
        const duplicatedLogos = [...rowLogos, ...rowLogos];

        return (
          <div key={rowIndex} className="relative w-full overflow-hidden">
            <div
              className={`flex w-max ${isReversed ? 'logo-marquee--right' : 'logo-marquee--left'}`}
            >
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 mx-6 h-20 flex items-center justify-center"
                >
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className="h-10 w-28 object-contain"
                    loading="lazy"
                    width={112}
                    height={40}
                    decoding="async"
                  />
                </div>
              ))}
            </div>

            {/* Gradient overlays pour effet de fondu */}
            <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        );
      })}

      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .logo-marquee--left {
          display: flex;
          animation: marquee-left 20s linear infinite;
          will-change: transform;
        }

        .logo-marquee--right {
          display: flex;
          animation: marquee-right 20s linear infinite;
          will-change: transform;
        }

        @media (max-width: 768px) {
          .logo-marquee--left,
          .logo-marquee--right {
            animation-duration: 12s;
          }
        }
      `}</style>
    </div>
  );
}
