"use client";

export default function Hero() {
  return (
    <section className="pt-20 pb-24 px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Colonne gauche - Contenu */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 animate-slide-in-left">
              Gérez vos séjours{" "}
              <span className="text-primary">sans effort</span>
            </h1>

            <p className="text-lg text-gray-700 max-w-xl animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
              5 outils en un, de la réservation au check-out. Une plateforme unique pour conciergeries, propriétaires, prestataires et voyageurs.
            </p>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                <div className="flex-shrink-0 w-5 h-5 rounded border-2 border-primary flex items-center justify-center bg-white">
                  <svg className="w-3 h-3 stroke-primary" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Du propriétaire indépendant aux grandes conciergeries</span>
              </div>
              <div className="flex items-center gap-3 animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
                <div className="flex-shrink-0 w-5 h-5 rounded border-2 border-primary flex items-center justify-center bg-white">
                  <svg className="w-3 h-3 stroke-primary" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Le plus performant du marché</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <a
                href="/commencer-gratuitement"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-semibold bg-primary hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-slide-in-left"
                style={{ animationDelay: "0.4s" }}
              >
                Commencer gratuitement →
              </a>

              <a
                href="/reserver-demo"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-blue-50 transition-all duration-300 animate-slide-in-left"
                style={{ animationDelay: "0.5s" }}
              >
                Réserver votre démo
              </a>
            </div>

            {/* Social Proof */}
            <p className="text-sm text-gray-600 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              Déjà adopté par <span className="font-bold text-gray-900">500+ conciergeries</span> en France
            </p>
          </div>

          {/* Colonne droite - Maquettes de téléphones */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {/* Conciergerie */}
              <div className="animate-float-up flex flex-col items-center space-y-2" style={{ animationDelay: "0s" }}>
                <div className="text-center">
                  <span className="text-xs sm:text-sm font-bold text-gray-800">Conciergerie</span>
                </div>
                <div className="w-32 sm:w-40 hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/images/interfaces/gestionnaire.png" 
                    alt="Interface Conciergerie" 
                    className="w-full rounded-2xl shadow-2xl"
                  />
                </div>
              </div>

              {/* Propriétaire */}
              <div className="animate-float-up flex flex-col items-center space-y-2" style={{ animationDelay: "0.15s" }}>
                <div className="text-center">
                  <span className="text-xs sm:text-sm font-bold text-gray-800">Propriétaire</span>
                </div>
                <div className="w-32 sm:w-40 hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/images/interfaces/proprietaire.png" 
                    alt="Interface Propriétaire" 
                    className="w-full rounded-2xl shadow-2xl"
                  />
                </div>
              </div>

              {/* Prestataire */}
              <div className="animate-float-up flex flex-col items-center space-y-2" style={{ animationDelay: "0.3s" }}>
                <div className="text-center">
                  <span className="text-xs sm:text-sm font-bold text-gray-800">Prestataire</span>
                </div>
                <div className="w-32 sm:w-40 hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/images/interfaces/prestataire.png" 
                    alt="Interface Prestataire" 
                    className="w-full rounded-2xl shadow-2xl"
                  />
                </div>
              </div>

              {/* Locataire */}
              <div className="animate-float-up flex flex-col items-center space-y-2" style={{ animationDelay: "0.45s" }}>
                <div className="text-center">
                  <span className="text-xs sm:text-sm font-bold text-gray-800">Locataire</span>
                </div>
                <div className="w-32 sm:w-40 hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/images/interfaces/locataire.png" 
                    alt="Interface Locataire" 
                    className="w-full rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes floatUp {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float-up {
          animation: floatUp 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
