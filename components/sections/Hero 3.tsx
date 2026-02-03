"use client";

export default function Hero() {

  const displayedText = "Pilotez votre conciergerie sans friction";
  const splitPoint = "Pilotez votre";

  return (
    <section className="pt-28 pb-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 min-h-[8rem] md:min-h-[9rem]">
          {displayedText.substring(0, splitPoint.length)}
          {displayedText.length > splitPoint.length && (
            <>
              <br />
              <span className="text-primary">
                {displayedText.substring(splitPoint.length)}
              </span>
            </>
          )}
        </h1>

        <p className="mt-8 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          Biloki centralise, automatise et orchestre l’ensemble du cycle de vie
          de vos séjours. Une seule application intelligente pour conciergeries,
          propriétaires, prestataires et locataires.
        </p>


        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/s-abonner"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl
                       text-white font-semibold bg-primary
                       hover:opacity-90 transition"
          >
            Je m'abonne →
          </a>

          <a
            href="/commencer-gratuitement"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl
                       border border-primary text-primary font-semibold
                       hover:bg-blue-50 transition"
          >
            Essai gratuit
          </a>
        </div>
      </div>
    </section>
  );
}
