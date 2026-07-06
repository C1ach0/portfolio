<template>
    <NuxtLayout>
        <template v-if="project">
            <ProjectInfo :project />
            <article class="min-h-screen relative overflow-x-hidden max-w-6xl mx-auto px-2">
                <header class="max-w-4xl mx-auto text-center space-y-6">
                    <p class="text-sm uppercase tracking-wide text-rose-500 font-semibold">Framework TypeScript pour Discord.js</p>
                    <h1 class="text-4xl font-bold">HarmonixJS</h1>
                    <p class="text-lg text-muted leading-8">
                        HarmonixJS est un écosystème TypeScript construit au-dessus de Discord.js pour développer des
                        bots Discord plus maintenables. Le projet rassemble un coeur orienté décorateurs, une CLI, des
                        plugins officiels, un kit UI autonome et une documentation pensée pour les développeurs comme
                        pour les assistants IA.
                    </p>
                    <div class="flex items-center justify-center gap-4 lg:gap-10 flex-wrap">
                        <UButton href="https://github.com/harmonixjs" target="_blank" class="rounded-full">
                            GitHub
                        </UButton>
                        <UButton href="https://harmonixjs.rosystudio.net" target="_blank" class="rounded-full">
                            Documentation
                        </UButton>
                    </div>
                    <SkillBadge :tech-uses="[
                        {
                            icon: 'typescript',
                            name: 'TypeScript'
                        },
                        {
                            icon: 'discord',
                            name: 'DiscordJS v14'
                        },
                        {
                            icon: 'nodejs-light',
                            name: 'Node.js'
                        },
                        {
                            icon: 'github-light',
                            name: 'GitHub'
                        },
                        {
                            icon: 'npm-light',
                            name: 'NPM'
                        }
                    ]" />
                </header>

                <section class="py-20 grid md:grid-cols-3 gap-4">
                    <div v-for="item in highlights" :key="item.title"
                        class="border border-default rounded-lg p-5 bg-muted/20 space-y-3">
                        <UIcon :name="item.icon" class="text-2xl text-rose-500" />
                        <h2 class="text-xl font-bold">{{ item.title }}</h2>
                        <p class="text-sm text-muted leading-6">{{ item.description }}</p>
                    </div>
                </section>

                <section class="py-20 flex flex-col-reverse lg:grid grid-cols-2 gap-8 items-start">
                    <Galery :images="imagesCore" />
                    <div class="space-y-5">
                        <h2 class="text-2xl font-bold">Un coeur typé pour structurer les bots</h2>
                        <p class="text-justify">
                            Le package <UKbd size="lg" class="kdb-text">@harmonixjs/core</UKbd> organise un bot autour
                            de commandes, événements, composants Discord et providers. L'objectif est de sortir du
                            modèle du fichier unique et de fournir une architecture claire pour les bots qui grandissent.
                        </p>
                        <p class="text-justify">
                            Les commandes sont déclarées avec <UKbd size="lg" class="kdb-text">Command()</UKbd>. La même
                            définition sert au décorateur de classe et au handler, ce qui permet d'inférer le contexte
                            d'exécution : slash command, commande préfixée, commande mixte ou menu contextuel Discord.
                        </p>
                        <ul class="grid sm:grid-cols-2 gap-3">
                            <li v-for="item in coreItems" :key="item"
                                class="border border-default rounded-lg px-4 py-3 text-sm text-muted">
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                </section>

                <section class="py-20 flex flex-col lg:grid grid-cols-2 gap-8 items-start">
                    <div class="space-y-5">
                        <h2 class="text-2xl font-bold">Une CLI pour créer, générer et diagnostiquer</h2>
                        <p class="text-justify">
                            La CLI <UKbd size="lg" class="kdb-text">@harmonixjs/cli</UKbd> accompagne tout le cycle de
                            vie d'une application : initialisation du projet, génération des handlers, ajout de plugins,
                            compilation, démarrage et diagnostic de production.
                        </p>
                        <div class="grid gap-3">
                            <div v-for="command in cliCommands" :key="command.name"
                                class="border border-default rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                <UKbd class="kdb-text shrink-0">{{ command.name }}</UKbd>
                                <p class="text-sm text-muted">{{ command.description }}</p>
                            </div>
                        </div>
                    </div>
                    <Galery :images="imagesPlugins" />
                </section>

                <section class="py-20 grid lg:grid-cols-2 gap-8 items-start">
                    <div class="space-y-5">
                        <h2 class="text-2xl font-bold">Plugins et providers</h2>
                        <p class="text-justify">
                            HarmonixJS sépare les extensions réutilisables des services propres à l'application. Les
                            plugins exposent des intégrations typées via <UKbd size="lg"
                                class="kdb-text">bot.plugins</UKbd>, tandis que les providers gardent la logique métier
                            dans des services accessibles via <UKbd size="lg" class="kdb-text">bot.providers</UKbd>.
                        </p>
                        <div class="grid sm:grid-cols-2 gap-3">
                            <div v-for="pkg in packages" :key="pkg.name" class="border border-default rounded-lg p-4">
                                <h3 class="font-bold">{{ pkg.name }}</h3>
                                <p class="text-sm text-muted mt-2 leading-6">{{ pkg.description }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-5">
                        <h2 class="text-2xl font-bold">Un kit UI autonome</h2>
                        <p class="text-justify">
                            Le package <UKbd size="lg" class="kdb-text">@harmonixjs/ui</UKbd> permet de composer des
                            interfaces Discord avec des vues, embeds, composants V2, paginations, menus de sélection,
                            recherches, actions et modals.
                        </p>
                        <p class="text-justify">
                            Il fonctionne avec HarmonixJS, mais reste utilisable dans un bot Discord.js classique. Ce
                            choix rend l'écosystème plus ouvert : le framework peut rester léger, pendant que les projets
                            qui ont besoin d'interactions riches disposent d'une base dédiée.
                        </p>
                        <div class="border border-default rounded-lg p-5 bg-muted/20 space-y-3">
                            <h3 class="font-bold">Principe retenu</h3>
                            <p class="text-sm text-muted leading-6">
                                Composer une seule vue stateful plutôt que multiplier des classes fermées pour chaque
                                cas : paginator, select searchable, boutons d'action ou modal.
                            </p>
                        </div>
                    </div>
                </section>

                <section class="py-20 grid lg:grid-cols-2 gap-8">
                    <div class="space-y-5">
                        <h2 class="text-2xl font-bold">Documentation et usage par IA</h2>
                        <p class="text-justify">
                            La documentation HarmonixJS expose des pages classiques, mais aussi des entrées dédiées aux
                            assistants : <UKbd size="lg" class="kdb-text">/llms.txt</UKbd>, <UKbd size="lg"
                                class="kdb-text">/llms-full.txt</UKbd> et un endpoint <UKbd size="lg"
                                class="kdb-text">/mcp</UKbd>. Ces points d'accès décrivent les packages, les commandes
                            CLI, les exemples et les pages canoniques de documentation.
                        </p>
                        <div class="grid gap-3">
                            <a v-for="doc in docs" :key="doc.label" :href="doc.href" target="_blank"
                                class="border border-default rounded-lg px-4 py-3 flex items-center justify-between gap-4 hover:border-rose-500 transition-colors">
                                <span>{{ doc.label }}</span>
                                <UIcon name="i-lucide-external-link" class="text-muted shrink-0" />
                            </a>
                        </div>
                    </div>
                    <div class="space-y-5">
                        <h2 class="text-2xl font-bold">Ce que le projet m'a apporté</h2>
                        <p class="text-justify">
                            HarmonixJS m'a permis de travailler sur un projet plus proche d'un produit développeur que
                            d'un simple bot : API publique, typage avancé, génération de projet, publication npm,
                            documentation, packages séparés et conventions de production.
                        </p>
                        <div class="grid gap-3">
                            <div v-for="learning in learnings" :key="learning"
                                class="border-l-2 border-rose-500 pl-4 py-1 text-muted">
                                {{ learning }}
                            </div>
                        </div>
                    </div>
                </section>

                <footer class="pb-20 text-center max-w-3xl mx-auto">
                    <p>
                        HarmonixJS est devenu un écosystème complet autour de Discord.js : un coeur typé, des outils de
                        génération, des intégrations officielles, une documentation exploitable par les développeurs et
                        une base pensée pour faire évoluer des bots Discord sans perdre en clarté.
                    </p>
                </footer>
            </article>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { projects } from '~/assets/data/projects';

definePageMeta({
    ssr: true
})

const route = useRoute();

const project = computed(() => {
    const slugRouteSplit = route.path.split('/');
    const slugRoute = slugRouteSplit[slugRouteSplit.length - 1];
    return projects.find(p => p.slug === slugRoute);
})

defineMeta({
    title: `Maxence Bessi - ${project.value?.name}`,
    description: project.value?.description!,
    image: {
        component: `BlogPost`,
        props: {
            headline: `Maxence Bessi`,
            title: project.value?.name,
            description: project.value?.ogDescription || project.value?.description.split('.')[0]
        }
    }
})

defineSchema([
    {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        "name": `Maxence Bessi - ${project.value?.name}`,
        "description": project.value?.description!,
        "programmingLanguage": "TypeScript",
        "runtimePlatform": "Node.js",
        "codeRepository": "https://github.com/harmonixjs",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Maxence Bessi - Développeur Full Stack",
            "url": "https://maxence-bessi.com"
        },
        "author": {
            "@type": "Person",
            "name": "Bessi Maxence"
        },
        "publisher": {
            "@type": "Organization",
            "name": "HarmonixJS",
            "url": "https://github.com/harmonixjs"
        },
        "dateCreated": "2025-12",
        "datePublished": "2026-01",
        "keywords": [
            "framework",
            "discord",
            "discord.js",
            "bot",
            "handler",
            "typescript",
            "decorators",
            "reflection",
            "cli",
            "plugins",
            "ui",
            "mcp"
        ]
    },
])

const highlights = [
    {
        icon: "i-lucide-box",
        title: "Écosystème npm",
        description: "Un coeur framework, une CLI, un kit UI et des plugins officiels publiés comme packages séparés."
    },
    {
        icon: "i-lucide-braces",
        title: "API typée",
        description: "Des commandes, événements, composants, plugins et providers conçus pour conserver l'inférence TypeScript."
    },
    {
        icon: "i-lucide-terminal",
        title: "Workflow outillé",
        description: "Initialisation, génération, plugins, build, start, Docker et diagnostics depuis une même interface CLI."
    }
];

const coreItems = [
    "Slash commands, prefix commands et commandes mixtes",
    "Menus contextuels utilisateur et message",
    "Handlers de boutons, selects et modals",
    "Providers pour isoler les services applicatifs"
];

const cliCommands = [
    {
        name: "npx @harmonixjs/cli init my-bot",
        description: "Créer un projet HarmonixJS avec template, package manager, plugins et options Docker."
    },
    {
        name: "harmonix create command ban --subtype slash",
        description: "Générer un handler de commande avec les conventions du framework."
    },
    {
        name: "harmonix add quick-db",
        description: "Installer et configurer un plugin officiel dans l'application."
    },
    {
        name: "harmonix doctor --build",
        description: "Compiler et vérifier que la configuration est prête pour la production."
    }
];

const packages = [
    {
        name: "@harmonixjs/core",
        description: "Framework principal pour commandes, événements, composants, providers et plugins."
    },
    {
        name: "@harmonixjs/cli",
        description: "Création de projet, génération de handlers, plugins, diagnostics et workflows dev/build/start."
    },
    {
        name: "@harmonixjs/ui",
        description: "Vues et contrôles Discord autonomes pour HarmonixJS et les bots Discord.js classiques."
    },
    {
        name: "@harmonixjs/express",
        description: "Plugin HTTP pour exposer des endpoints API à côté du bot."
    },
    {
        name: "@harmonixjs/i18n",
        description: "Plugin de localisation runtime et commandes d'application Discord."
    },
    {
        name: "@harmonixjs/shard",
        description: "Helpers de sharding pour accompagner les bots Discord amenés à grandir."
    }
];

const docs = [
    {
        label: "Introduction",
        href: "https://harmonixjs.rosystudio.net/guide/introduction"
    },
    {
        label: "Commandes",
        href: "https://harmonixjs.rosystudio.net/core/commands"
    },
    {
        label: "Plugins",
        href: "https://harmonixjs.rosystudio.net/plugins/overview"
    },
    {
        label: "UI Kit",
        href: "https://harmonixjs.rosystudio.net/ui/overview"
    },
    {
        label: "CLI",
        href: "https://harmonixjs.rosystudio.net/cli/overview"
    },
    {
        label: "Contexte IA",
        href: "https://harmonixjs.rosystudio.net/llms-full.txt"
    }
];

const learnings = [
    "Concevoir une API développeur cohérente avec des contraintes fortes de typage.",
    "Découper un projet en packages npm maintenables et documentés séparément.",
    "Créer une CLI capable de générer, configurer et diagnostiquer une application.",
    "Penser une documentation exploitable par des humains, des LLMs et un serveur MCP."
];

import harmonixIndexPng from "~/assets/data/images/projects/harmonix/harmonix-index.png";
import harmonixCommandPng from "~/assets/data/images/projects/harmonix/harmonix-command.png";
import harmonixEventPng from "~/assets/data/images/projects/harmonix/harmonix-event.png";
const imagesCore = [
    {
        url: harmonixIndexPng,
        alt: "Présentation de l'index du framework",
        description: "Présentation de l'index utilisé pour initialiser un bot Discord avec HarmonixJS"
    },
    {
        url: harmonixCommandPng,
        alt: "Présentation de l'utilisation du décorateur Command",
        description: "Exemple de création d'une commande slash, prefix ou mixte avec le décorateur Command"
    },
    {
        url: harmonixEventPng,
        alt: "Présentation de l'utilisation du décorateur Event",
        description: "Exemple de création d'un handler d'évènement typé"
    },
];

import harmonixCliPng from "~/assets/data/images/projects/harmonix/harmonix-cli.png";
import harmonixPluginsPng from "~/assets/data/images/projects/harmonix/harmonx-plugins.png";
const imagesPlugins = [
    {
        url: harmonixCliPng,
        alt: "Présentation de l'utilisation du CLI HarmonixJS",
        description: "Présentation de l'utilisation du CLI et des commandes disponibles pour créer, générer et diagnostiquer un bot Discord"
    },
    {
        url: harmonixPluginsPng,
        alt: "Présentation des plugins disponibles pour HarmonixJS",
        description: "Voici les plugins possibles d'installer directement via le CLI HarmonixJS pour étendre les fonctionnalités du bot Discord"
    }
]
</script>
