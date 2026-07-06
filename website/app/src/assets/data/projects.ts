import type {
    ProjectData
} from "~/models/Project.models";

export const projects: ProjectData[] = [
    {
        slug: "harmonix",
        name: "HarmonixJS",
        description: "HarmonixJS est un écosystème TypeScript construit au-dessus de Discord.js pour développer des bots Discord maintenables. Il regroupe un coeur orienté décorateurs, une CLI, des plugins officiels, un kit UI autonome et une documentation exploitable par les développeurs comme par les assistants IA.",
        previewImage: "https://avatars.githubusercontent.com/u/247443023?s=400&u=a5ee14f63343f440adb9f7d8ef302c33553635ee&v=4",
        date: "2026-06-30",
        techs: ["TypeScript", "NodeJS", "Discord", "Reflect-Metadata"],
        types: ["Framework"],
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
    // {
    //     slug: "rosy-rp",
    //     name: "RosyRP",
    //     description: "RosyRP est une application ambitieuse permettant aux joueurs consoles de pratiquer du rôle-play sur GTA et d'autres jeux via Discord. Les utilisateurs interagissent avec le bot depuis leur téléphone. Les serveurs peuvent personnaliser entièrement l'expérience, en ajoutant des items, entreprises et autres fonctionnalités. J'ai développé ce projet pour répondre à de nombreuses demandes, malgré son caractère un peu niche.",
    //     previewImage: "/__og-image__/image/projets/rosy-rp/og.png",
    //     date: "2025-12-01",
    //     techs: ["Nuxt", "TailwindCss", "Spring Boot", "Stripe", "DiscordJS"],
    //     types: ["Website", "Bot", "API"],
    //     devFrom: "home"
    // },
    {
        slug: "portfolio",
        name: "Portfolio",
        description: "Ce portfolio est un projet que j'ai développé pour présenter mes compétences, mes projets et mon expérience de manière interactive et moderne. Construit avec TypeScript et Nuxt, il mets en avant mes capacités à créer des interfaces réactives et performantes.",
        previewImage: "/__og-image__/image/og.png",
        date: "2025-08-27",
        techs: ["TypeScript", "Nuxt", "TailwindCss"],
        types: ["Website"],
        devFrom: "home"
    },
    {
        slug: "ensmbpn-gipe",
        name: "GIPE",
        description: "GIPE est l'outil de Gestion Informatisée Pour l'Enseignement qui soutient l'activité pédagogique de l'école ENSM-BPN. Le projet s'inscrit dans une dynamique de transformation numérique de l'enseignement de la Marine, avec des leviers comme l'amélioration de la traçabilité pédagogique, la facilitation du pilotage des formations et la rationalisation des outils métiers.",
        previewImage: "/project_preview/logo_gipe.png",
        date: "2026-06-30",
        techs: ["Symfony", "VueJS", "TailwindCss"],
        types: ["Website"],
        devFrom: "company",
        locationName: "ENSM-BPN",
        sndName: "Marine National",
        workingHours: (37 * 2 * 20) - 50
    },
    {
        slug: "foxpile-companion",
        name: "Foxpile Companion",
        description: "Foxpile Companion est une application Windows qui surveille les fichiers de sauvegarde de Foxhole, génère des métadonnées fiables et envoie des mises à jour signées à l'API Foxpile. Les données collectées alimentent ensuite une base exploitable par les développeurs via une API dédiée.",
        previewImage: "/__og-image__/image/projets/foxpile-companion/og.png",
        date: "2026-05-01",
        techs: ["TypeScript", "NodeJS", "NestJS", "Windows"],
        types: ["Application", "API"],
        devFrom: "home",
        github: "https://github.com/C1ach0/foxhole-companion",
        website: "https://compagnon-api.foxwar.net"
    }
]
