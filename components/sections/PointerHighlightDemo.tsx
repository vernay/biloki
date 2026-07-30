import Image from "next/image";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { getTranslations } from "next-intl/server";

type CardConfig = {
  key: "centralize" | "automate" | "visibility";
  image: string;
  rectangleClassName: string;
  pointerClassName: string;
  containerClassName: string;
  imageClassName?: string;
  imageWrapperClassName?: string;
};

const defaultCards: CardConfig[] = [
  {
    key: "centralize",
    image: "/images/Page prestataire/pexels-rdne-5591501.jpg",
    rectangleClassName: "border-sky-300 bg-sky-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-primary",
    containerClassName: "mx-1 inline-block",
  },
  {
    key: "automate",
    image: "/images/Page prestataire/hannah-busing-Zyx1bK9mqmA-unsplash.jpg",
    rectangleClassName: "border-emerald-300 bg-emerald-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-emerald-600",
    containerClassName: "mx-1 inline-block",
  },
  {
    key: "visibility",
    image: "/images/Page prestataire/glenn-carstens-peters-RLw-UC03Gwc-unsplash.jpg",
    rectangleClassName: "border-amber-300 bg-amber-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-amber-600",
    containerClassName: "mx-1 inline-block",
  },
];

const reservationsCards: CardConfig[] = [
  {
    key: "centralize",
    image: "/images/Page réservation/Design site Biloki.svg",
    rectangleClassName: "border-sky-300 bg-sky-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-primary",
    containerClassName: "mx-1 inline-block",
  },
  {
    key: "automate",
    image: "/images/Page réservation/Channel manager calendrier.svg",
    rectangleClassName: "border-emerald-300 bg-emerald-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-emerald-600",
    containerClassName: "mx-1 inline-block",
  },
  {
    key: "visibility",
    image: "/images/Page réservation/Modifier prix.svg",
    rectangleClassName: "border-amber-300 bg-amber-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-amber-600",
    containerClassName: "mx-1 inline-block",
  },
];

const additionalSalesCards: CardConfig[] = [
  {
    key: "centralize",
    image: "/images/Section ventes additionnelles/mini-visual-revenu.svg",
    rectangleClassName: "border-orange-300 bg-orange-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-orange-600",
    containerClassName: "mx-1 inline-block",
  },
  {
    key: "automate",
    image: "/images/Section ventes additionnelles/mini-visual-paiement.svg",
    rectangleClassName: "border-sky-300 bg-sky-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-primary",
    containerClassName: "mx-1 inline-block",
  },
  {
    key: "visibility",
    image: "/images/Section ventes additionnelles/mini-visual-marge.svg",
    rectangleClassName: "border-violet-300 bg-violet-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-violet-600",
    containerClassName: "mx-1 inline-block",
  },
];

const statisticsCards: CardConfig[] = [
  {
    key: "centralize",
    image: "/images/Page statistiques/pexels-burst-374085.jpg",
    rectangleClassName: "border-sky-300 bg-sky-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-primary",
    containerClassName: "mx-1 inline-block",
  },
  {
    key: "automate",
    image: "/images/Page statistiques/pexels-jessica-olivella-555697728-37809796.jpg",
    rectangleClassName: "border-emerald-300 bg-emerald-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-emerald-600",
    containerClassName: "mx-1 inline-block",
  },
  {
    key: "visibility",
    image: "/images/Page statistiques/pexels-pripicart-2346091.jpg",
    rectangleClassName: "border-amber-300 bg-amber-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-amber-600",
    containerClassName: "mx-1 inline-block",
  },
];

const ownerInterfaceCards: CardConfig[] = [
  {
    key: "centralize",
    image: "/images/Interface propriétaire/pexels-fauxels-3182764.jpg",
    rectangleClassName: "border-sky-300 bg-sky-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-primary",
    containerClassName: "mx-1 inline-block",
  },
  {
    key: "automate",
    image: "/images/Interface propriétaire/pexels-julio-lopez-75309646-29469337.jpg",
    rectangleClassName: "border-emerald-300 bg-emerald-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-emerald-600",
    containerClassName: "mx-1 inline-block",
  },
  {
    key: "visibility",
    image: "/images/Interface propriétaire/pexels-mikhail-nilov-9301860.jpg",
    rectangleClassName: "border-amber-300 bg-amber-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-amber-600",
    containerClassName: "mx-1 inline-block",
  },
];

const smartLocksCards: CardConfig[] = [
  {
    key: "centralize",
    image: "/images/serrures/sebastian-scholz-nuki-IJkSskfEqrM-unsplash.jpg",
    rectangleClassName: "border-sky-300 bg-sky-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-primary",
    containerClassName: "mx-1 inline-block",
  },
  {
    key: "automate",
    image: "/images/serrures/61J-j-5citL.jpg",
    rectangleClassName: "border-emerald-300 bg-emerald-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-emerald-600",
    containerClassName: "mx-1 inline-block",
  },
  {
    key: "visibility",
    image: "/images/serrures/pro_header-1.webp",
    rectangleClassName: "border-amber-300 bg-amber-100/95 leading-loose",
    pointerClassName: "h-3 w-3 text-amber-600",
    containerClassName: "mx-1 inline-block",
  },
];

type PointerHighlightDemoProps = {
  namespace?: string;
};

export default async function PointerHighlightDemo({
  namespace = "featureSections.pointerHighlight",
}: PointerHighlightDemoProps) {
  const t = await getTranslations(namespace);
  const cards = namespace === "featureSections.additionalSalesPointerHighlight"
    ? additionalSalesCards
    : namespace === "featureSections.statisticsPointerHighlight"
      ? statisticsCards
    : namespace === "featureSections.smartLocksPointerHighlight"
      ? smartLocksCards
    : namespace === "featureSections.ownerInterfacePointerHighlight"
      ? ownerInterfaceCards
    : namespace === "featureSections.reservationsPointerHighlight"
      ? reservationsCards
      : defaultCards;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.key}
            className="font-sans overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
          >
            <div className={["relative h-52 w-full overflow-hidden rounded-t-[28px]", card.imageWrapperClassName ?? ""].join(" ")}>
              <Image
                src={card.image}
                alt={t(`${card.key}.imageAlt`)}
                fill
                className={["rounded-t-[28px]", card.imageClassName ?? "object-cover"].join(" ")}
              />
            </div>

            <div className="p-6">
              <div className="text-xl font-black tracking-tight text-slate-900 md:text-2xl">
                <span>{t(`${card.key}.titleBefore`)}</span>
                <PointerHighlight
                  rectangleClassName={card.rectangleClassName}
                  pointerClassName={card.pointerClassName}
                  containerClassName={card.containerClassName}
                >
                  <span className="relative z-10">{t(`${card.key}.highlighted`)}</span>
                </PointerHighlight>
                <span>{t(`${card.key}.titleAfter`)}</span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
                {t(`${card.key}.description`)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}