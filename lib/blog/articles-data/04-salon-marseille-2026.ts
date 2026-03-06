import type { BlogArticle } from "../types";

const article: BlogArticle = {
    slug: "salon-marseille-2026",
    category: "event",
    date: "2026-02-05",
    readTime: "4 min",
    image: "/images/blog/salon-marseille.jpg",
    relatedSlugs: ["channel-manager-guide-complet-conciergeries", "automatiser-gestion-locations-saisonnieres"],
    translations: {
      fr: {
        title: "Salon Marseille 2026: demo Biloki pour conciergeries ambitieuses",
        excerpt: "Rendez-vous au salon de la conciergerie a Marseille pour voir Biloki en action: PMS, channel manager, messagerie automatisee, serrures connectees et integrations API.",
        tags: ["salon conciergerie marseille 2026", "demo pms channel manager", "evenement location saisonniere france", "logiciel conciergerie", "salon technologie conciergerie", "rdv conciergeries marseille"],
        content: `
          <div class="prose prose-lg max-w-none">
            <h2>Pourquoi venir nous rencontrer ?</h2>
            <p>Rien ne vaut une démo en direct. Au salon, vous pourrez échanger avec notre équipe produit et découvrir comment Biloki simplifie la gestion de votre conciergerie.</p>
            <ul>
              <li>Voir l'outil en action, avec des cas concrets du quotidien.</li>
              <li>Comprendre comment centraliser vos opérations sans friction.</li>
              <li>Identifier les automatisations les plus adaptées à votre organisation.</li>
            </ul>

            <h2>Ce que nous allons présenter</h2>
            <div class="grid md:grid-cols-2 gap-6 my-8">
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">PMS & opérations</h3>
                <p>Gérez vos séjours, logements et équipes depuis une interface unique, avec une vue claire de votre activité.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Channel Manager</h3>
                <p>Synchronisez vos calendriers et tarifs sur 120+ plateformes pour éviter les doubles réservations.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Messagerie automatisée</h3>
                <p>Réduisez les échanges répétitifs grâce à des scénarios intelligents et des réponses instantanées.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Serrures connectées</h3>
                <p>Automatisez l'accès voyageurs et prestataires avec des codes sécurisés selon les dates de séjour.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg md:col-span-2">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Marketplace API</h3>
                <p>Connectez Biloki à vos outils existants pour un écosystème sur mesure.</p>
              </div>
            </div>

            <h2>Infos pratiques</h2>
            <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 my-6">
              <p class="mb-2"><strong>24 mars 2026</strong></p>
              <p class="mb-2"><strong>Salon de la conciergerie, Marseille</strong></p>
              <p>Passez nous voir, même sans rendez-vous. Nous vous accueillerons pour une démo personnalisée.</p>
            </div>

            <div class="bg-primary text-white p-8 rounded-3xl my-8">
              <h3 class="text-2xl font-bold mb-3">Vous voulez une démo dédiée ?</h3>
              <p class="mb-6 opacity-90">Réservez un créneau à l'avance pour que l'équipe Biloki vous prépare une démonstration adaptée à votre activité.</p>
              <div class="flex flex-col sm:flex-row gap-4">
                <a href="/reserver-demo" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:shadow-xl transition-all">
                  Réserver une démo
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all">
                  Voir le post LinkedIn
                </a>
              </div>
            </div>
          </div>
        `,
      },
      en: {
        title: "Marseille 2026 show: live Biloki demo for concierge teams",
        excerpt: "Meet Biloki at the Marseille concierge show and explore a live demo of PMS, channel management, automated messaging, smart locks, and API integrations.",
        tags: ["marseille concierge show 2026", "pms channel manager demo", "short-term rental event france", "concierge software demo", "vacation rental technology show", "book concierge demo marseille"],
        content: `
          <div class="prose prose-lg max-w-none">
            <h2>Why visit us?</h2>
            <p>Nothing beats a live demo. At the show, you can talk with our product team and discover how Biloki simplifies your concierge management.</p>
            <ul>
              <li>See the tool in action with real-world examples.</li>
              <li>Understand how to centralize your operations seamlessly.</li>
              <li>Identify the automations best suited to your organization.</li>
            </ul>

            <h2>What we'll present</h2>
            <div class="grid md:grid-cols-2 gap-6 my-8">
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">PMS & Operations</h3>
                <p>Manage your stays, properties and teams from a single interface with clear visibility of your activity.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Channel Manager</h3>
                <p>Synchronize your calendars and rates across 120+ platforms to prevent double bookings.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Automated Messaging</h3>
                <p>Reduce repetitive exchanges with intelligent scenarios and instant responses.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Smart Locks</h3>
                <p>Automate guest and vendor access with secure codes based on stay dates.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg md:col-span-2">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Marketplace API</h3>
                <p>Connect Biloki to your existing tools for a custom ecosystem.</p>
              </div>
            </div>

            <h2>Practical information</h2>
            <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 my-6">
              <p class="mb-2"><strong>March 24, 2026</strong></p>
              <p class="mb-2"><strong>Concierge Show, Marseille</strong></p>
              <p>Stop by and see us, even without an appointment. We'll welcome you for a personalized demo.</p>
            </div>

            <div class="bg-primary text-white p-8 rounded-3xl my-8">
              <h3 class="text-2xl font-bold mb-3">Want a dedicated demo?</h3>
              <p class="mb-6 opacity-90">Book a time slot in advance so the Biloki team can prepare a demo tailored to your business.</p>
              <div class="flex flex-col sm:flex-row gap-4">
                <a href="/reserver-demo" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:shadow-xl transition-all">
                  Book a demo
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all">
                  See the LinkedIn post
                </a>
              </div>
            </div>
          </div>
        `,
      },
      es: {
        title: "Feria Marseille 2026: demo en vivo de Biloki para conserjerias",
        excerpt: "Visitanos en la feria de conserjeria de Marsella y descubre Biloki en vivo: PMS, channel manager, mensajeria automatizada, cerraduras inteligentes e integraciones API.",
        tags: ["feria conserjeria marsella 2026", "demo pms channel manager", "evento alquiler vacacional francia", "software conserjeria", "feria tecnologia alquiler turistico", "demo conserjerias marsella"],
        content: `
          <div class="prose prose-lg max-w-none">
            <h2>¿Por qué visitarnos?</h2>
            <p>Nada se compara con una demostración en vivo. En la feria, puedes hablar directamente con nuestro equipo de producto y descubrir cómo Biloki simplifica la gestión de tu conserjería.</p>
            <ul>
              <li>Ver la herramienta en acción con ejemplos reales del día a día.</li>
              <li>Comprender cómo centralizar tus operaciones sin fricciones.</li>
              <li>Identificar las automatizaciones más adecuadas para tu organización.</li>
            </ul>

            <h2>Lo que presentaremos</h2>
            <div class="grid md:grid-cols-2 gap-6 my-8">
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">PMS y Operaciones</h3>
                <p>Gestiona tus estancias, propiedades y equipos desde una única interfaz con visibilidad clara de tu actividad.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Channel Manager</h3>
                <p>Sincroniza tus calendarios y tarifas en más de 120 plataformas para evitar dobles reservas.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Mensajería Automatizada</h3>
                <p>Reduce intercambios repetitivos con escenarios inteligentes y respuestas instantáneas.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Cerraduras Inteligentes</h3>
                <p>Automatiza el acceso de huéspedes y proveedores con códigos seguros según las fechas de estancia.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg md:col-span-2">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Marketplace API</h3>
                <p>Conecta Biloki a tus herramientas existentes para un ecosistema personalizado.</p>
              </div>
            </div>

            <h2>Información práctica</h2>
            <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 my-6">
              <p class="mb-2"><strong>24 de marzo de 2026</strong></p>
              <p class="mb-2"><strong>Feria de la Conserjería, Marsella</strong></p>
              <p>Pásate a vernos, incluso sin cita previa. Te recibiremos para una demostración personalizada.</p>
            </div>

            <div class="bg-primary text-white p-8 rounded-3xl my-8">
              <h3 class="text-2xl font-bold mb-3">¿Quieres una demo dedicada?</h3>
              <p class="mb-6 opacity-90">Reserva un horario con anticipación para que el equipo de Biloki te prepare una demostración adaptada a tu negocio.</p>
              <div class="flex flex-col sm:flex-row gap-4">
                <a href="/reserver-demo" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:shadow-xl transition-all">
                  Reservar una demostración
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all">
                  Ver la publicación en LinkedIn
                </a>
              </div>
            </div>
          </div>
        `,
      },
      pt: {
        title: "Feira Marseille 2026: demo ao vivo da Biloki para concierges",
        excerpt: "Encontre a Biloki na feira de concierge em Marselha e veja uma demo ao vivo de PMS, channel manager, mensagens automatizadas, fechaduras inteligentes e API.",
        tags: ["feira concierge marselha 2026", "demo pms channel manager", "evento aluguel de temporada franca", "software para concierge", "feira tecnologia locacao turistica", "agendar demo marselha"],
        content: `
          <div class="prose prose-lg max-w-none">
            <h2>Por que nos visitar?</h2>
            <p>Nada se compara com uma demonstração ao vivo. Na feira, você pode falar diretamente com nosso time de produto e descobrir como Biloki simplifica a gestão da sua concierge.</p>
            <ul>
              <li>Veja a ferramenta em ação com exemplos reais do dia a dia.</li>
              <li>Entenda como centralizar suas operações sem fricção.</li>
              <li>Identifique as automações melhor adequadas para sua organização.</li>
            </ul>

            <h2>O que apresentaremos</h2>
            <div class="grid md:grid-cols-2 gap-6 my-8">
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">PMS e Operações</h3>
                <p>Gerencie suas estadias, propriedades e times a partir de uma única interface com visibilidade clara da sua atividade.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Channel Manager</h3>
                <p>Sincronize seus calendários e tarifas em mais de 120 plataformas para evitar duplas reservas.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Mensagens Automatizadas</h3>
                <p>Reduza trocas repetitivas com cenários inteligentes e respostas instantâneas.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Fechaduras Inteligentes</h3>
                <p>Automatize o acesso de hóspedes e fornecedores com códigos seguros baseados nas datas de hospedagem.</p>
              </div>
              <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg md:col-span-2">
                <h3 class="text-xl font-bold text-gray-900 mb-2">Marketplace API</h3>
                <p>Conecte Biloki com suas ferramentas existentes para um ecossistema personalizado.</p>
              </div>
            </div>

            <h2>Informações práticas</h2>
            <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 my-6">
              <p class="mb-2"><strong>24 de março de 2026</strong></p>
              <p class="mb-2"><strong>Feira de Concierge, Marselha</strong></p>
              <p>Nos visite, mesmo sem agendamento prévio. Vamos acolhê-lo para uma demonstração personalizada.</p>
            </div>

            <div class="bg-primary text-white p-8 rounded-3xl my-8">
              <h3 class="text-2xl font-bold mb-3">Quer uma demonstração dedicada?</h3>
              <p class="mb-6 opacity-90">Reserve um horário com antecedência para que o time da Biloki prepare uma demonstração adaptada ao seu negócio.</p>
              <div class="flex flex-col sm:flex-row gap-4">
                <a href="/reserver-demo" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:shadow-xl transition-all">
                  Agendar uma demonstração
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all">
                  Ver a publicação no LinkedIn
                </a>
              </div>
            </div>
          </div>
        `,
      },
    },
  };

export default article;
