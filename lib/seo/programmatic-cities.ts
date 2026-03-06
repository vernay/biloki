export interface ProgrammaticCityPage {
  slug: string;
  city: string;
  region: string;
  heroTitle: string;
  heroDescription: string;
  painPoints: string[];
  outcomes: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

export const PROGRAMMATIC_CITY_PAGES_FR: ProgrammaticCityPage[] = [
  {
    slug: 'paris',
    city: 'Paris',
    region: 'Ile-de-France',
    heroTitle: 'Logiciel de location saisonnière à Paris',
    heroDescription: 'Centralisez vos annonces, votre PMS et vos opérations terrain pour piloter vos logements courte durée à Paris sans perdre de temps.',
    painPoints: [
      'Latence de synchronisation entre Airbnb, Booking et votre planning interne, avec risque de surbooking sur les périodes tendues.',
      'Enchaînement check-out / ménage / maintenance difficile à tenir quand plusieurs logements tournent le même jour.',
      'Absence de pilotage fin par logement: taux d’occupation réel, revenu net par nuit et délais de réponse voyageurs.',
    ],
    outcomes: [
      'Calendriers OTA et planning opérationnel alignés en continu pour réduire fortement les conflits de disponibilité.',
      'Workflow terrain structuré avec priorisation claire des tâches critiques entre chaque séjour.',
      'Suivi hebdomadaire des KPI utiles par bien pour arbitrer prix, disponibilités et charge opérationnelle.',
    ],
    faq: [
      {
        question: 'Pourquoi utiliser un logiciel de location saisonniere a Paris ?',
        answer: 'Le volume de reservations et la concurrence imposent une gestion rapide et fiable. Un logiciel permet dautomatiser les taches cles et de limiter les erreurs operationnelles.',
      },
      {
        question: 'Biloki convient-il a une conciergerie locale ?',
        answer: 'Oui. Biloki aide les conciergeries a suivre plusieurs logements, coordonner les prestataires et garder une vision claire des operations quotidiennes.',
      },
    ],
  },
  {
    slug: 'marseille',
    city: 'Marseille',
    region: 'Provence-Alpes-Cote d Azur',
    heroTitle: 'Logiciel de location saisonniere a Marseille',
    heroDescription: 'Pilotez reservations, messages voyageurs et operations terrain depuis une seule plateforme adaptee au rythme de Marseille.',
    painPoints: [
      'Messages voyageurs repetitifs sur check-in et acces.',
      'Variation de la demande selon les periodes et evenements.',
      'Suivi manuel des taches menage et linge.',
    ],
    outcomes: [
      'Automatisation des messages pre-sejour et post-sejour.',
      'Vision plus claire des periodes fortes et creuses.',
      'Execution terrain plus fluide entre menage et maintenance.',
    ],
    faq: [
      {
        question: 'Un logiciel est-il utile pour quelques logements seulement ?',
        answer: 'Oui. Meme avec un parc reduit, automatiser la communication et la coordination fait gagner du temps et augmente la qualite de service.',
      },
      {
        question: 'Peut-on gerer equipe et proprietaires dans le meme outil ?',
        answer: 'Oui, Biloki propose des interfaces par role pour simplifier le suivi des operations et la communication.',
      },
    ],
  },
  {
    slug: 'lyon',
    city: 'Lyon',
    region: 'Auvergne-Rhone-Alpes',
    heroTitle: 'Logiciel de location saisonniere a Lyon',
    heroDescription: 'Optimisez votre gestion courte duree a Lyon avec un outil qui relie canaux de reservation, planning et operations.',
    painPoints: [
      'Multiplication des taches administratives quotidiennes.',
      'Mise a jour manuelle des disponibilites.',
      'Difficultes de coordination avec les prestataires.',
    ],
    outcomes: [
      'Gain de temps sur la gestion repetitive.',
      'Disponibilites unifiees sur tous les canaux.',
      'Meilleure execution des operations terrain.',
    ],
    faq: [
      {
        question: 'Quel est le principal benefice pour une conciergerie a Lyon ?',
        answer: 'Le principal benefice est la centralisation: moins daller-retours entre outils et une meilleure fiabilite operationnelle.',
      },
      {
        question: 'Biloki aide-t-il a reduire les erreurs de planning ?',
        answer: 'Oui, la synchronisation des calendriers et le suivi des operations reduisent fortement les oublis et conflits de planning.',
      },
    ],
  },
  {
    slug: 'toulouse',
    city: 'Toulouse',
    region: 'Occitanie',
    heroTitle: 'Logiciel de location saisonniere a Toulouse',
    heroDescription: 'Passez a une gestion plus fiable de vos locations saisonnieres a Toulouse grace a un pilotage centralise.',
    painPoints: [
      'Difficultes a suivre plusieurs annonces en meme temps.',
      'Retards sur le traitement des demandes voyageurs.',
      'Manque de visibilite sur les performances.',
    ],
    outcomes: [
      'Reponses plus rapides avec lautomatisation.',
      'Vue consolidee des reservations et disponibilites.',
      'Pilotage business plus data-driven.',
    ],
    faq: [
      {
        question: 'Un PMS est-il pertinent pour de la location courte duree ?',
        answer: 'Oui, un PMS adapte permet de structurer la gestion quotidienne et dabsorber la croissance sans complexite excessive.',
      },
      {
        question: 'Peut-on mieux suivre la rentabilite par logement ?',
        answer: 'Oui, en centralisant les donnees de reservation et doperation, vous suivez mieux les performances de chaque bien.',
      },
    ],
  },
  {
    slug: 'nice',
    city: 'Nice',
    region: 'Provence-Alpes-Cote d Azur',
    heroTitle: 'Logiciel de location saisonniere a Nice',
    heroDescription: 'Structurez votre activite courte duree a Nice avec une plateforme qui simplifie operations, communication et suivi.',
    painPoints: [
      'Flux de voyageurs important sur les periodes de pointe.',
      'Organisation complexe des check-in et check-out.',
      'Coordination multi-logements difficile sans outil central.',
    ],
    outcomes: [
      'Parcours voyageur plus fluide.',
      'Operations mieux planifiees et tracees.',
      'Temps de gestion reduit pour lequipe.',
    ],
    faq: [
      {
        question: 'Comment gagner du temps en haute saison a Nice ?',
        answer: 'La combinaison de calendriers synchronises, messages automatiques et suivi operationnel centralise fait une grande difference en haute saison.',
      },
      {
        question: 'Biloki convient-il aux conciergeries multi-biens ?',
        answer: 'Oui, Biloki est pense pour piloter plusieurs biens et equipes sans multiplier les outils.',
      },
    ],
  },
  {
    slug: 'bordeaux',
    city: 'Bordeaux',
    region: 'Nouvelle-Aquitaine',
    heroTitle: 'Logiciel de location saisonniere a Bordeaux',
    heroDescription: 'Reunissez vos operations de location courte duree a Bordeaux dans un seul environnement de travail.',
    painPoints: [
      'Mises a jour manuelles chronophages.',
      'Visibilite limitee sur les performances operationnelles.',
      'Communication equipe-proprietaires dispersee.',
    ],
    outcomes: [
      'Process mieux standardises.',
      'Suivi plus simple des indicateurs de gestion.',
      'Collaboration plus claire avec les proprietaires.',
    ],
    faq: [
      {
        question: 'Quel outil pour professionnaliser une conciergerie a Bordeaux ?',
        answer: 'Un outil centralisant reservations, operations et communication permet de structurer lactivite et de mieux passer a lechelle.',
      },
      {
        question: 'Biloki est-il adapte aux equipes terrain ?',
        answer: 'Oui, il facilite la coordination des interventions et le suivi des taches sur chaque logement.',
      },
    ],
  },
  {
    slug: 'lille',
    city: 'Lille',
    region: 'Hauts-de-France',
    heroTitle: 'Logiciel de location saisonniere a Lille',
    heroDescription: 'Simplifiez la gestion de vos locations courte duree a Lille avec un pilotage centralise et des operations mieux orchestrees.',
    painPoints: [
      'Mise a jour des annonces sur plusieurs plateformes.',
      'Suivi des equipes menage en temps reel.',
      'Retours voyageurs non centralises.',
    ],
    outcomes: [
      'Distribution mieux maitrisee.',
      'Operations terrain plus previsibles.',
      'Qualite de service plus constante.',
    ],
    faq: [
      {
        question: 'Biloki peut-il aider a harmoniser les process ?',
        answer: 'Oui, la plateforme aide a standardiser les etapes critiques du parcours operationnel.',
      },
      {
        question: 'Peut-on suivre les taches par logement ?',
        answer: 'Oui, chaque logement peut etre suivi avec un historique des actions et interventions.',
      },
    ],
  },
  {
    slug: 'nantes',
    city: 'Nantes',
    region: 'Pays de la Loire',
    heroTitle: 'Logiciel de location saisonniere a Nantes',
    heroDescription: 'Pilotez vos logements saisonniers a Nantes avec un outil concu pour les besoins des conciergeries et gestionnaires.',
    painPoints: [
      'Temps perdu entre outils non connectes.',
      'Difficultes a prioriser les urgences operationnelles.',
      'Manque de tableau de bord global.',
    ],
    outcomes: [
      'Moins de frictions entre equipe et outils.',
      'Meilleure priorisation des actions quotidiennes.',
      'Pilotage consolide de lactivite.',
    ],
    faq: [
      {
        question: 'Pourquoi centraliser la gestion de locations saisonnieres ?',
        answer: 'Centraliser evite les doublons, reduit les erreurs et permet de prendre de meilleures decisions plus rapidement.',
      },
      {
        question: 'Biloki est-il utile en phase de croissance ?',
        answer: 'Oui, c est justement dans la croissance que la centralisation et l automatisation apportent le plus de valeur.',
      },
    ],
  },
  {
    slug: 'strasbourg',
    city: 'Strasbourg',
    region: 'Grand Est',
    heroTitle: 'Logiciel de location saisonniere a Strasbourg',
    heroDescription: 'Gerez vos reservations et operations a Strasbourg depuis une seule plateforme pensee pour la location courte duree.',
    painPoints: [
      'Risque d oublis entre check-out et menage.',
      'Gestion manuelle des disponibilites.',
      'Communication interne dispersee.',
    ],
    outcomes: [
      'Transitions plus fluides entre sejours.',
      'Meilleure fiabilite du planning.',
      'Execution plus claire cote equipe.',
    ],
    faq: [
      {
        question: 'Quel gain attendre d un outil unique ?',
        answer: 'Un outil unique reduit la complexite operationnelle et ameliore la reactivite au quotidien.',
      },
      {
        question: 'Biloki peut-il accompagner une equipe multi-role ?',
        answer: 'Oui, chaque role accede a l information utile sans surcharge inutile.',
      },
    ],
  },
  {
    slug: 'montpellier',
    city: 'Montpellier',
    region: 'Occitanie',
    heroTitle: 'Logiciel de location saisonniere a Montpellier',
    heroDescription: 'Developpez une operation location courte duree plus performante a Montpellier avec Biloki.',
    painPoints: [
      'Volume operationnel variable selon la saison.',
      'Coordination menage, linge et maintenance complexe.',
      'Suivi insuffisant des indicateurs de performance.',
    ],
    outcomes: [
      'Capacite a absorber les pics d activite.',
      'Moins de frictions entre interventions.',
      'Vision KPI plus exploitable.',
    ],
    faq: [
      {
        question: 'Peut-on fiabiliser les operations en periode chargee ?',
        answer: 'Oui, des workflows clairs et un suivi central permettent de mieux encaisser les periodes fortes.',
      },
      {
        question: 'Biloki aide-t-il au pilotage quotidien ?',
        answer: 'Oui, vous disposez d une vue operationnelle et business pour prioriser les actions.',
      },
    ],
  },
  {
    slug: 'rennes',
    city: 'Rennes',
    region: 'Bretagne',
    heroTitle: 'Logiciel de location saisonniere a Rennes',
    heroDescription: 'Fluidifiez votre gestion locative courte duree a Rennes avec une solution tout-en-un.',
    painPoints: [
      'Actions repetitives sans automatisation.',
      'Manque de standardisation des process.',
      'Suivi proprietaires chronophage.',
    ],
    outcomes: [
      'Moins de taches manuelles.',
      'Process operationnels mieux standardises.',
      'Relation proprietaires plus fluide.',
    ],
    faq: [
      {
        question: 'Un outil tout-en-un est-il preferable a plusieurs outils ?',
        answer: 'Dans la plupart des cas, oui: moins de silos d information et plus de coherence operationnelle.',
      },
      {
        question: 'Biloki convient-il aux structures en expansion ?',
        answer: 'Oui, il aide a structurer les operations avant que la complexite n explose.',
      },
    ],
  },
  {
    slug: 'reims',
    city: 'Reims',
    region: 'Grand Est',
    heroTitle: 'Logiciel de location saisonniere a Reims',
    heroDescription: 'Passez a une gestion plus efficace de vos locations saisonnieres a Reims avec Biloki.',
    painPoints: [
      'Disponibilites dispersees sur plusieurs canaux.',
      'Suivi operationnel peu centralise.',
      'Difficultes de reporting.',
    ],
    outcomes: [
      'Calendriers unifies et plus fiables.',
      'Operations mieux suivies.',
      'Reporting simplifie.',
    ],
    faq: [
      {
        question: 'Comment mieux piloter une activite multi-canal ?',
        answer: 'La centralisation des reservations et des operations dans un meme outil apporte de la lisibilite immediate.',
      },
      {
        question: 'Biloki permet-il un suivi clair des equipes ?',
        answer: 'Oui, vous visualisez les taches et interventions par logement et par periode.',
      },
    ],
  },
  {
    slug: 'le-havre',
    city: 'Le Havre',
    region: 'Normandie',
    heroTitle: 'Logiciel de location saisonniere au Havre',
    heroDescription: 'Optimisez vos operations de location courte duree au Havre grace a une gestion centralisee.',
    painPoints: [
      'Coordination manuelle des sejours successifs.',
      'Manque de standardisation des procedures.',
      'Temps perdu dans le suivi operationnel.',
    ],
    outcomes: [
      'Meilleure continuite entre reservations.',
      'Process repetables et clairs.',
      'Gain de temps significatif au quotidien.',
    ],
    faq: [
      {
        question: 'Quel est l impact d une meilleure organisation operationnelle ?',
        answer: 'Une meilleure organisation augmente la qualite de service et reduit les couts caches lies aux erreurs et retards.',
      },
      {
        question: 'Biloki est-il adapte aux structures locales ?',
        answer: 'Oui, Biloki convient aussi bien aux petites equipes qu aux conciergeries plus etablies.',
      },
    ],
  },
  {
    slug: 'saint-malo',
    city: 'Saint-Malo',
    region: 'Bretagne',
    heroTitle: 'Logiciel de location saisonniere a Saint-Malo',
    heroDescription: 'Mettez en place une gestion location saisonniere robuste a Saint-Malo avec Biloki.',
    painPoints: [
      'Variations de demande importantes selon la saison.',
      'Tension operationnelle sur les periodes de forte activite.',
      'Mauvaise circulation de l information.',
    ],
    outcomes: [
      'Meilleure preparation des pics de reservations.',
      'Execution plus fluide en haute saison.',
      'Vision partagee entre les acteurs.',
    ],
    faq: [
      {
        question: 'Comment mieux gerer la saisonnalite en bord de mer ?',
        answer: 'L anticipation, la standardisation et la centralisation des operations sont les trois leviers principaux.',
      },
      {
        question: 'Biloki aide-t-il a maintenir la qualite de service ?',
        answer: 'Oui, la plateforme facilite le suivi des operations critiques a chaque rotation de voyageurs.',
      },
    ],
  },
  {
    slug: 'la-rochelle',
    city: 'La Rochelle',
    region: 'Nouvelle-Aquitaine',
    heroTitle: 'Logiciel de location saisonniere a La Rochelle',
    heroDescription: 'Gerez vos locations saisonnieres a La Rochelle avec un outil central qui simplifie chaque etape.',
    painPoints: [
      'Process fragmentes entre OTA, planning et terrain.',
      'Suivi manuel des equipes menage.',
      'Peu de visibilite sur les performances.',
    ],
    outcomes: [
      'Flux operationnel plus coherent.',
      'Coordination terrain plus simple.',
      'Meilleur pilotage de l activite.',
    ],
    faq: [
      {
        question: 'Un outil unique peut-il remplacer plusieurs routines manuelles ?',
        answer: 'Oui, c est un des objectifs principaux: fiabiliser les operations et liberer du temps pour la croissance.',
      },
      {
        question: 'Biloki est-il adapte a des equipes mixtes interne/externe ?',
        answer: 'Oui, chacun peut suivre ses actions dans une interface claire selon son role.',
      },
    ],
  },
  {
    slug: 'annecy',
    city: 'Annecy',
    region: 'Auvergne-Rhone-Alpes',
    heroTitle: 'Logiciel de location saisonniere a Annecy',
    heroDescription: 'Passez a une gestion moderne de la location courte duree a Annecy avec Biloki.',
    painPoints: [
      'Forte saisonnalite et pics de demande.',
      'Coordination operationnelle sous pression.',
      'Manque de standardisation des taches.',
    ],
    outcomes: [
      'Operations plus previsibles.',
      'Equipe mieux coordonnee.',
      'Moins d erreurs sur les rotations.',
    ],
    faq: [
      {
        question: 'Comment absorber les pics d activite sans degrader la qualite ?',
        answer: 'Il faut centraliser les informations et automatiser les actions repetitives pour garder de la marge operationnelle.',
      },
      {
        question: 'Biloki convient-il aux zones tres saisonnieres ?',
        answer: 'Oui, il est utile justement quand le rythme d activite varie fortement.',
      },
    ],
  },
  {
    slug: 'biarritz',
    city: 'Biarritz',
    region: 'Nouvelle-Aquitaine',
    heroTitle: 'Logiciel de location saisonniere a Biarritz',
    heroDescription: 'Structurez votre activite de location saisonniere a Biarritz avec une plateforme orientee execution.',
    painPoints: [
      'Complexite des operations en periode touristique.',
      'Gestion manuelle de la communication voyageurs.',
      'Difficultes de suivi multi-biens.',
    ],
    outcomes: [
      'Operations plus fluides sur les periodes chargees.',
      'Communication plus reactive.',
      'Pilotage multi-biens simplifie.',
    ],
    faq: [
      {
        question: 'Quel est le premier levier pour gagner en efficacite ?',
        answer: 'Centraliser les informations de reservation et les operations pour limiter les ruptures de process.',
      },
      {
        question: 'Biloki est-il pense pour les gestionnaires de plusieurs logements ?',
        answer: 'Oui, la plateforme est concue pour le multi-biens et la coordination equipe.',
      },
    ],
  },
  {
    slug: 'cannes',
    city: 'Cannes',
    region: 'Provence-Alpes-Cote d Azur',
    heroTitle: 'Logiciel de location saisonniere a Cannes',
    heroDescription: 'Pilotez vos locations courte duree a Cannes avec un logiciel adapte aux enjeux d execution terrain.',
    painPoints: [
      'Forte pression operationnelle pendant les evenements.',
      'Mise a jour manuelle des canaux de vente.',
      'Suivi disperses des interventions.',
    ],
    outcomes: [
      'Meilleure gestion des periodes de pointe.',
      'Moins d erreurs de disponibilite.',
      'Execution terrain plus lisible.',
    ],
    faq: [
      {
        question: 'Comment tenir la cadence lors des grands evenements ?',
        answer: 'Une organisation centralisee et des workflows clairs permettent de conserver la qualite de service.',
      },
      {
        question: 'Biloki aide-t-il a reduire les oublis operationnels ?',
        answer: 'Oui, le suivi des taches et des reservations dans une seule interface reduit fortement les oublis.',
      },
    ],
  },
  {
    slug: 'aix-en-provence',
    city: 'Aix-en-Provence',
    region: 'Provence-Alpes-Cote d Azur',
    heroTitle: 'Logiciel de location saisonniere a Aix-en-Provence',
    heroDescription: 'Mettez en place une gestion courte duree plus performante a Aix-en-Provence avec Biloki.',
    painPoints: [
      'Taches repetitives a faible valeur.',
      'Mauvaise synchronisation des informations.',
      'Suivi proprietaires et equipe chronophage.',
    ],
    outcomes: [
      'Automatisation des operations repetitives.',
      'Information unifiee et accessible.',
      'Collaboration amelioree entre parties prenantes.',
    ],
    faq: [
      {
        question: 'Pourquoi digitaliser la gestion quotidienne ?',
        answer: 'Digitaliser permet de fiabiliser les operations, gagner du temps et mieux piloter lactivite.',
      },
      {
        question: 'Biloki est-il utile pour une conciergerie locale ?',
        answer: 'Oui, la plateforme est adaptee aux besoins terrain des structures locales comme des equipes en croissance.',
      },
    ],
  },
  {
    slug: 'mont-saint-michel',
    city: 'Mont-Saint-Michel',
    region: 'Normandie',
    heroTitle: 'Logiciel de location saisonniere au Mont-Saint-Michel',
    heroDescription: 'Pilotez votre activite de location courte duree autour du Mont-Saint-Michel avec une gestion centralisee.',
    painPoints: [
      'Flux voyageurs fluctuants selon la saison.',
      'Organisation operationnelle complexe sur les rotations.',
      'Visibilite reduite sur les priorites du jour.',
    ],
    outcomes: [
      'Meilleure anticipation des periodes chargees.',
      'Gestion plus stable des rotations.',
      'Priorisation operationnelle plus efficace.',
    ],
    faq: [
      {
        question: 'Comment mieux anticiper les variations d activite ?',
        answer: 'Un pilotage centralise aide a planifier plus tot et a ajuster les ressources selon la demande.',
      },
      {
        question: 'Biloki peut-il s adapter a un contexte tres touristique ?',
        answer: 'Oui, la plateforme est pensee pour les contextes a forte variabilite de reservations.',
      },
    ],
  },
  {
    slug: 'avignon',
    city: 'Avignon',
    region: 'Provence-Alpes-Cote d Azur',
    heroTitle: 'Logiciel de location saisonniere a Avignon',
    heroDescription: 'Centralisez votre gestion location saisonniere a Avignon pour gagner en fiabilite et en rapidite.',
    painPoints: [
      'Gestion eparpillee entre plusieurs outils.',
      'Difficultes de communication entre intervenants.',
      'Suivi incomplet des performances.',
    ],
    outcomes: [
      'Pilotage plus lisible de bout en bout.',
      'Coordination renforcee des equipes.',
      'Decision plus rapide grace aux donnees.',
    ],
    faq: [
      {
        question: 'Quel benefice concret attendre des les premieres semaines ?',
        answer: 'Une reduction du temps passe sur les taches repetitives et une meilleure visibilite sur les operations critiques.',
      },
      {
        question: 'Biloki aide-t-il sur la communication operationnelle ?',
        answer: 'Oui, les informations cles sont centralisees et partagees entre les roles concernes.',
      },
    ],
  },
  {
    slug: 'antibes',
    city: 'Antibes',
    region: 'Provence-Alpes-Cote d Azur',
    heroTitle: 'Logiciel de location saisonniere a Antibes',
    heroDescription: 'Optimisez votre gestion de locations saisonnieres a Antibes avec une plateforme unique.',
    painPoints: [
      'Risque d erreurs en multi-canal.',
      'Operations terrain difficiles a suivre.',
      'Manque d automatisation sur les messages voyageurs.',
    ],
    outcomes: [
      'Moins d erreurs de disponibilite.',
      'Suivi plus clair des interventions.',
      'Communication voyageurs acceleree.',
    ],
    faq: [
      {
        question: 'Comment limiter les erreurs en gestion multi-canal ?',
        answer: 'La synchronisation des calendriers et un suivi central des operations reduisent les conflits de disponibilite.',
      },
      {
        question: 'Biloki est-il pertinent pour une petite equipe ?',
        answer: 'Oui, meme une petite equipe gagne en efficacite avec des workflows clairs et automatisees.',
      },
    ],
  },
];

const programmaticCityBySlug = new Map(
  PROGRAMMATIC_CITY_PAGES_FR.map((page) => [page.slug, page])
);

export function getProgrammaticCityPageFr(slug: string): ProgrammaticCityPage | undefined {
  return programmaticCityBySlug.get(slug);
}

export function getProgrammaticCitySlugsFr(): string[] {
  return PROGRAMMATIC_CITY_PAGES_FR.map((page) => page.slug);
}