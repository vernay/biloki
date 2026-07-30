import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useTranslations } from "next-intl";

type AnimatedTestimonialsDemoProps = {
  namespace?: string;
  showNote?: boolean;
};

export function AnimatedTestimonialsDemo({
  namespace = "testimonialsHome",
  showNote = true,
}: AnimatedTestimonialsDemoProps) {
  const t = useTranslations(namespace);
  const testimonials = [
    {
      quote: t("quotes.1.text"),
      name: "Claire D.",
      designation: t("quotes.1.designation"),
      src: "/images/Témoignage/Claire.jpg",
    },
    {
      quote: t("quotes.2.text"),
      name: "Julien R.",
      designation: t("quotes.2.designation"),
      src: "/images/Témoignage/Julien.jpg",
    },
    {
      quote: t("quotes.4.text"),
      name: "Jean.L",
      designation: t("quotes.4.designation"),
      src: "/images/Témoignage/Jean.jpg",
    },
    {
      quote: t("quotes.5.text"),
      name: "Karim B.",
      designation: t("quotes.5.designation"),
      src: "/images/Témoignage/Karim.jpg",
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 pt-10 text-center md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
          {t("kicker")}
        </p>
        <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-5xl">
          {t("title")}
        </h2>
        {showNote ? (
          <p className="mt-3 text-xs font-medium text-slate-500 md:text-sm">
            {t("note")}
          </p>
        ) : null}
      </div>
      <AnimatedTestimonials testimonials={testimonials} />
    </section>
  );
}
