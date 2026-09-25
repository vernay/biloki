import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SecurityTrustSection() {
  const t = useTranslations("securityTrust");

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 text-center">
        <div className="relative h-12 w-40 md:h-14 md:w-48">
          <Image
            src="/images/cybersécurité/logo123-2.svg"
            alt="Cybercare"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-base font-semibold text-slate-900 md:text-lg">
          {t("title")}
        </p>
        <p className="max-w-2xl text-sm text-slate-500 md:text-base">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
