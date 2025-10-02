import type {
    ProjectData
} from "~/models/Project.models";

export const projects: ProjectData[] = [
    {
        slug: "rosy-discordjs",
        name: "Bot Discord Rosy",
        description: "RosyBot est un robot Discord utilisé pour diverses tâches de gestion, d'activités et de contenu sur la plateforme Discord. Ce projet a marqué mes débuts dans le développement.",
        ogDescription: "RosyBot, robot Discord pour gestion et activités, mon premier projet de développement.",
        date: "2019-08-01",
        techs: ["JavaScript", "NodeJS", "Discord"],
        types: ["Bot"],
        devFrom: "home"
    },
    {
        slug: "mc-paper-handler",
        name: "Minecraft Plugin Handler",
        description: "Cet outil est un gestionnaire simple de commandes et d'événements pour la création de plugins Paper sur Minecraft. Il m'a permis de mieux comprendre le fonctionnement des annotations et le chargement automatique d'instances.",
        date: "2023-07-20",
        techs: ["Java", "Minecraft", "Paper"],
        types: ["Plugin"],
        devFrom: "home"
    },
    {
        slug: "frog-dpp",
        name: "Bot Discord Frog",
        description: "FrogBot est un bot Discord développé en C++ avec la librairie D++. Ce projet m'a principalement permis de découvrir et approfondir mes connaissances en C++ et d'expérimenter le développement d'applications pour Discord.",
        date: "2022-10-22",
        techs: ["C++", "Discord"],
        types: ["Bot"],
        devFrom: "home"
    },
    {
        slug: "discord-reflect",
        name: "DiscordReflect",
        description: "Ce projet est un handler Discord développé en TypeScript qui utilise Reflect pour gérer les annotations sur les commandes et les événements. Il permet une organisation efficace des commandes et des événements grâce à une utilisation innovante des métadonnées TypeScript.",
        date: "2023-08-21",
        techs: ["TypeScript", "NodeJS", "Discord"],
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
        date: "dev",
        techs: ["Nuxt", "TailwindCss", "Spring Boot", "Stripe"],
        types: ["Website", "Bot", "API"],
        devFrom: "home"
    },
    {
        slug: "portfolio",
        name: "Portfolio",
        description: "Ce portfolio est un projet que j'ai développé pour présenter mes compétences, mes projets et mon expérience de manière interactive et moderne. Construit avec TypeScript, Nuxt, NestJS et SQLite, il met en avant mon approche full-stack et mes capacités à créer des interfaces réactives et un back-end performant.",
        date: "2025-08-27",
        techs: ["TypeScript", "Nuxt", "TailwindCss"],
        types: ["Website"],
        devFrom: "home"
    }
]