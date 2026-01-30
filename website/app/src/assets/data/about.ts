import type {
    AboutAll
} from "@/models/About.models";

export const about: AboutAll = {
    devYearsStart: "2019",
    links: {
        email: "contact+via-portfolio@maxence-bessi.com",
        linkedin: "https://linkedin.com/in/maxence-bessi",
        github: "https://github.com/C1ach0",
        discord: "https://discord.com/users/358629612584173568",
        x: null
    },
    skills: [
        "html", "css", "sass", "javascript", "typescript", "java-light", "php-light", "cpp", "bash-light", "nodejs-light",
        "vuejs-light", "nuxtjs-light", "tailwindcss-light", "nestjs-light", "discord", "maven-light", "spring-light", "symfony-light",
        "mysql-light", "redis-light", "git", "docker", "nginx", "cloudflare-light",
        "linux", "vscode", "intellij"
    ],
    careers: [
        {
            status: "Développeur",
            description: "Stage chez Aesis Conseil : Développement et maintenance d'applications web avec PHP (Laravel) et Vue.js/Bootstrap. Renforcement des compétences en bases de données et optimisation des performances, tout en collaborant avec l'équipe pour livrer des solutions fiables et adaptées aux besoins clients.",
            from: "Aesis Conseil",
            start: "07/2023",
            end: "09/2023",
            link: "https://www.aesis-conseil.com"
        },
        {
            status: "Développeur",
            description: "En alternance à l'ENSM-BPN, j'ai contribué au développement d'une plateforme de gestion scolaire type Pronote/Moodle, axée sur les enseignants et la programmation de cours. Réalisée en PHP (Symfony), Vue.js et TailwindCSS, elle facilite la gestion RH et le suivi pédagogique.",
            from: "Marine Nationale",
            start: "09/2024",
            link: "https://www.defense.gouv.fr/marine"
        }
    ],
    schools: [
        {
            status: "Apprentis",
            description: "La formation CDA chez WebForce3 m'a permis de développer des compétences avancées en développement web et mobile, avec PHP, Java, Symfony et Spring Boot, en réalisant des projets concrets, intégration d'APIs, gestion de bases de données et travail en mode agile.",
            from: "WebForce3",
            start: "01/2023",
            end: "09/2023"
        },
        {
            status: "Apprentis",
            description: "Je poursuis un BTS Services Informatiques aux Organisations (SLAM), consolidant mes connaissances tout en découvrant de nouvelles technologies. Cette alternance me permet de mettre en pratique mes acquis et d'explorer des outils modernes pour répondre aux besoins des entreprises.",
            from: "Lycée Bonaparte",
            start: "09/2024",
            link: "https://bts-sio.lyc-bonaparte.fr"
        }
    ]
};