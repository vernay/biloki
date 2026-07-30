import Image from "next/image";
import { useTranslations } from "next-intl";
import CanvaGlassFrame from "@/components/ui/CanvaGlassFrame";

const partners = [
  {
    name: "Airbnb",
    src: "/images/1%C3%A8re%20page%20photos/Airbnb2026.png",
    labelKey: "cards.airbnb",
  },
  {
    name: "Vrbo",
    src: "/images/1%C3%A8re%20page%20photos/VRBO%20partner.png",
    labelKey: "cards.vrbo",
  },
  {
    name: "Booking.com",
    src: "/images/1%C3%A8re%20page%20photos/2026-booking.png",
    labelKey: "cards.booking",
  },
  {
    name: "Expedia Group",
    src: "/images/1%C3%A8re%20page%20photos/Expedia%20partner.jpg",
    labelKey: "cards.expedia",
  },
] as const;

export default function ConnectivityPASection() {
  const t = useTranslations("connectivity");

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <CanvaGlassFrame inline={false} className="rounded-2xl md:rounded-3xl">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/Page réservation/franco-debartolo-kUd6KkVfbCY-unsplash.jpg"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/72" />
          </div>

          <div className="relative z-10 p-6 md:p-8 lg:p-10">
          <h3 className="mt-4 text-2xl md:text-3xl font-bold text-white">
            {t("title")}
          </h3>
          <p className="mt-2 text-sm md:text-base text-white/75 max-w-2xl">
            {t("description")}
          </p>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="rounded-xl border border-white/35 bg-white/8 p-3 md:p-4 backdrop-blur-md shadow-[0_10px_22px_rgba(2,8,20,0.25),inset_0_1px_0_rgba(255,255,255,0.22)]"
              >
                <div className="h-10 flex items-center">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={130}
                    height={40}
                    className="max-h-10 w-auto object-contain"
                  />
                </div>
                <p className="mt-3 text-xs md:text-sm font-semibold text-white/95 leading-snug drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
                  {t(partner.labelKey)}
                </p>
              </div>
            ))}
          </div>
          </div>
        </CanvaGlassFrame>
      </div>
    </section>
  );
}
