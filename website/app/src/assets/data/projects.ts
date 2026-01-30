import type {
    ProjectData
} from "~/models/Project.models";

export const projects: ProjectData[] = [
    {
        slug: "rosy-discordjs",
        name: "Bot Discord Rosy",
        description: "RosyBot est un robot Discord utilisé pour gérer différentes activités et contenus sur la plateforme. C’est avec ce projet que j’ai commencé à me lancer dans le développement, et aujourd’hui, par nostalgie, je conserve le nom « Rosy » pour mes autres projets.",
        ogDescription: "RosyBot, robot Discord pour gestion et activités, mon premier projet de développement.",
        previewImage: "/__og-image__/image/projets/rosy-discordjs/og.png",
        date: "2019-08-01",
        techs: ["JavaScript", "NodeJS", "Discord"],
        types: ["Bot"],
        devFrom: "home"
    },
    {
        slug: "harmonix",
        name: "HarmonixJS",
        description: "HarmonixJS est un framework de développement de bots Discord en TypeScript, conçu pour simplifier la création et la gestion de fonctionnalités avancées telles que les commandes slash, les événements, la gestion des permissions et l'intégration avec des bases de données. Il vise à offrir une structure modulaire et extensible pour les développeurs de bots Discord.",
        previewImage: "/__og-image__/image/projets/harmonix/og.png",
        date: "2023-08-21",
        techs: ["TypeScript", "NodeJS", "Discord", "Reflect-Metadata"],
        types: ["Bot"],
        devFrom: "home"
    },
    {
        slug: "png-generation",
        name: "PNG Generation",
        description: "PNG Generation est un service léger qui transforme des templates HTML, Vue ou React en images statiques. Il est utile pour générer des images Open Graph, des aperçus pour les réseaux sociaux, ou tout autre visuel personnalisé à partir de code. Le contenu généré peut être stylé avec Tailwind CSS, et des données dynamiques peuvent être injectées via des variables.",
        previewImage: "https://png-generation.maxence-bessi.com/banner.png",
        date: "2025-07-31",
        techs: ["TypeScript", "NestJS"],
        types: ["API"],
        devFrom: "home"
    },
    {
        slug: "rosy-rp",
        name: "RosyRP",
        description: "RosyRP est une application ambitieuse permettant aux joueurs consoles de pratiquer du rôle-play sur GTA et d'autres jeux via Discord. Les utilisateurs interagissent avec le bot depuis leur téléphone. Les serveurs peuvent personnaliser entièrement l'expérience, en ajoutant des items, entreprises et autres fonctionnalités. J'ai développé ce projet pour répondre à de nombreuses demandes, malgré son caractère un peu niche.",
        previewImage: "/__og-image__/image/projets/rosy-rp/og.png",
        date: "2025-12-01",
        techs: ["Nuxt", "TailwindCss", "Spring Boot", "Stripe", "DiscordJS"],
        types: ["Website", "Bot", "API"],
        devFrom: "home"
    },
    {
        slug: "portfolio",
        name: "Portfolio",
        description: "Ce portfolio est un projet que j'ai développé pour présenter mes compétences, mes projets et mon expérience de manière interactive et moderne. Construit avec TypeScript, Nuxt, NestJS et SQLite, il met en avant mon approche full-stack et mes capacités à créer des interfaces réactives et un back-end performant.",
        previewImage: "/__og-image__/image/og.png",
        date: "2025-08-27",
        techs: ["TypeScript", "Nuxt", "TailwindCss"],
        types: ["Website"],
        devFrom: "home"
    },
    {
        slug: "gsb-frais",
        name: "GSB Frais",
        description: "Application de gestion des frais pour le compte rendu de visite des délégués médicaux de l'entreprise GSB (Galaxy Swiss Bourdin). Ce projet académique m'a permis de mettre en pratique mes compétences en développement d'applications web, en travaillant sur des fonctionnalités telles que la saisie, la validation et le suivi des frais professionnels.",
        previewImage: "/__og-image__/image/projets/gsb-frais/og.png",
        date: "2025-05-15",
        techs: ["PHP", "MySQL", "Bootstrap"],
        types: ["Website"],
        devFrom: "school"
    },
    {
        slug: "ensmbpn-gipe",
        name: "GIPE",
        description: "GIPE v3 est une refonte majeure du logiciel de gestion des formations de l'ENSM/BPN. Développé en Vue.js (front-end) et Symfony (back-end), il modernise la gestion des formations et activités annuelles. Cette version sépare l'interface utilisateur du serveur pour une meilleure évolutivité et maintenabilité. Elle intègre les fonctionnalités clés de la v1 (tests, documentation) tout en restant compatible avec l'ajout d'autres écoles.",
        previewImage: "__og-image__/image/projects/ensmbpn-gipe/og.png",
        date: "2026-06-30",
        techs: ["Symfony", "VueJS", "TailwindCss"],
        types: ["Website"],
        devFrom: "company",
        locationName: "ENSM-BPN",
        sndName: "Marine National"
    }
]