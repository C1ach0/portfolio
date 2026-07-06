<template>
    <NuxtLayout>
        <template v-if="project">
            <ProjectInfo :project />
            <article class="min-h-screen relative overflow-x-hidden max-w-6xl mx-auto px-2">
                <header class="max-w-3xl mx-auto text-center space-y-5">
                    <h1 class="text-4xl font-bold">Foxpile Companion</h1>
                    <p>
                        Foxpile Companion est le client desktop Windows associé à Foxpile. Il surveille les fichiers de
                        sauvegarde de Foxhole, extrait les informations utiles, puis envoie des mises à jour signées à
                        l'API afin d'alimenter une base de données exploitable par d'autres développeurs.
                    </p>
                    <div class="flex items-center justify-center gap-4 lg:gap-10 flex-wrap">
                        <UButton href="https://github.com/C1ach0/foxhole-companion" target="_blank" class="rounded-full">
                            GitHub
                        </UButton>
                        <UButton href="https://compagnon-api.foxwar.net" target="_blank" class="rounded-full">
                            API
                        </UButton>
                    </div>
                    <SkillBadge :tech-uses="[
                        {
                            icon: 'typescript',
                            name: 'TypeScript'
                        },
                        {
                            icon: 'nodejs-light',
                            name: 'NodeJS'
                        },
                        {
                            icon: 'nestjs-light',
                            name: 'NestJS'
                        },
                        {
                            icon: 'windows-light',
                            name: 'Windows'
                        },
                        {
                            icon: 'github-light',
                            name: 'GitHub'
                        }
                    ]" />
                </header>

                <section class="py-20 flex flex-col-reverse lg:grid grid-cols-2 gap-4 items-start">
                    <Galery :images="imagesClient" />
                    <div class="space-y-4">
                        <h2 class="text-2xl font-bold">Client Windows</h2>
                        <p class="text-justify">
                            Le companion fonctionne comme une application locale pensée pour rester discrète pendant une
                            session de jeu. Il détecte le processus Foxhole, observe le dossier de sauvegarde et réagit
                            uniquement lorsque des fichiers pertinents sont modifiés.
                        </p>
                        <p class="text-justify">
                            L'application prend place dans la zone de notification Windows afin de ne pas gêner
                            l'utilisateur pendant une session. Depuis ce point d'accès, le joueur peut vérifier l'état du
                            companion, gérer la connexion Discord et garder un retour visuel sur les actions réalisées
                            en arrière-plan.
                        </p>
                        <p class="text-justify">
                            Avant chaque envoi, les fichiers sont contrôlés et hashés afin de produire des métadonnées
                            fiables. Cette étape permet de limiter les uploads inutiles, de garder une trace cohérente
                            des changements et de transmettre seulement les informations attendues par l'écosystème
                            Foxpile.
                        </p>
                        <p class="text-justify">
                            La surveillance locale est également pensée pour être robuste : le client distingue le
                            lancement et l'arrêt du jeu, centralise les erreurs dans un système de logs et conserve l'état
                            de connexion de manière persistante. Cela permet de relancer l'application sans perdre la
                            configuration utilisateur, tout en gardant un comportement prévisible si Foxhole ou l'API ne
                            sont pas disponibles.
                        </p>
                    </div>
                </section>

                <section class="py-20 flex flex-col lg:grid grid-cols-2 gap-4">
                    <div class="space-y-4">
                        <h2 class="text-2xl font-bold">API et modèle de confiance</h2>
                        <p class="text-justify">
                            L'application communique avec l'API Foxpile via des requêtes signées. Chaque mise à jour est
                            associée à une identité de companion et à un secret dédié, ce qui permet à l'API de refuser
                            les données qui ne proviennent pas d'un client autorisé.
                        </p>
                        <p class="text-justify">
                            Le lien entre le companion et l'utilisateur repose principalement sur l'identifiant Steam du
                            joueur, récupérable depuis les fichiers du jeu. Lors de la première utilisation, l'API
                            utilise ces informations pour identifier le joueur et récupérer les données publiques utiles,
                            comme son pseudo, afin de créer une association fiable sans demander de configuration
                            supplémentaire.
                        </p>
                        <p class="text-justify">
                            Discord reste une intégration complémentaire, utilisée pour débloquer davantage de
                            fonctionnalités côté API. Le choix de Steam comme base d'identification simplifie
                            l'utilisation du companion et permet aussi aux joueurs de pays où Discord n'est pas
                            accessible de profiter de l'application.
                        </p>
                        <p class="text-justify">
                            La configuration repose sur des variables d'environnement, une configuration générée au
                            moment du build et des valeurs de développement locales. Cette organisation rend le projet
                            adaptable entre développement, test et production sans mélanger les secrets ni les paramètres
                            d'exécution.
                        </p>
                        <p class="text-justify">
                            L'API sert ensuite de point d'entrée pour les développeurs souhaitant exploiter les données
                            Foxpile. La documentation présente les routes disponibles, les mécanismes d'identification et
                            les formats de réponse attendus, afin de faciliter l'intégration dans des outils externes,
                            des tableaux de bord ou des services communautaires autour de Foxhole.
                        </p>
                    </div>
                    <Galery :images="imagesApi" />
                </section>

                <section class="py-20 gap-4">
                    <div class="space-y-4">
                        <h2 class="text-2xl font-bold">Distribution et mises à jour</h2>
                        <p class="text-justify">
                            Le build Windows génère une application autonome avec Node SEA, une interface système, un
                            installeur et un updater séparé. L'objectif est de fournir un outil simple à installer, tout
                            en conservant un processus de publication reproductible.
                        </p>
                        <p class="text-justify">
                            Les releases sont automatisées via GitHub Actions à partir des tags de version. Le pipeline
                            vérifie la cohérence entre le tag et le package, construit les artefacts Windows puis publie
                            les fichiers nécessaires à l'installation et aux futures mises à jour.
                        </p>
                    </div>
                </section>
                <footer class="pb-20 text-center max-w-3xl mx-auto">
                    <p>
                        Ce projet m'a permis de travailler sur une application desktop complète, reliée à une API, avec
                        des contraintes concrètes de sécurité, de packaging Windows et d'automatisation de release.
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
        "@type": "SoftwareApplication",
        "name": `Maxence Bessi - ${project.value?.name}`,
        "description": project.value?.description!,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Windows",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Maxence Bessi - Développeur Full Stack",
            "url": "https://maxence-bessi.com"
        },
        "author": {
            "@type": "Person",
            "name": "Bessi Maxence"
        },
        "codeRepository": "https://github.com/C1ach0/foxhole-companion",
        "dateCreated": "2026-05",
        "datePublished": "2026-05",
        "keywords": [
            "foxhole",
            "foxpile",
            "desktop",
            "windows",
            "api",
            "typescript",
            "node sea",
            "updater",
            "companion"
        ]
    },
])

import windowsCompanionTrayPng from "~/assets/data/images/projects/foxpile-companion/windows-companion-tray.png";
import windowsCompanionNotificationPng from "~/assets/data/images/projects/foxpile-companion/windows-companion-notification.png";
const imagesClient = [
    {
        url: windowsCompanionTrayPng,
        alt: "Emplacement pour une capture du client Foxpile Companion",
        description: "Présentation du client Foxpile Companion, montrant l'icône dans la barre des tâches et le menu contextuel accessible via un clic droit"
    },
    {
        url: windowsCompanionNotificationPng,
        alt: "Emplacement pour une capture de la surveillance des sauvegardes Foxhole",
        description: "Exemple des notifications générées par le client lorsqu'il détecte le lancement du jeu et l'arrêt de celui-ci. Le client surveille les fichiers de sauvegarde et envoie des mises à jour signées à l'API Foxpile pour alimenter la base de données"
    }
];

import foxpileWebpagePng from "~/assets/data/images/projects/foxpile-companion/foxpile-webpage.png";
import foxpileOauthPng from "~/assets/data/images/projects/foxpile-companion/foxpile-oauth.png";
import foxpileDocumentationPng from "~/assets/data/images/projects/foxpile-companion/foxpile-documentation.png";
const imagesApi = [
    {
        url: foxpileWebpagePng,
        alt: "Emplacement pour une capture de la documentation de l'API Foxpile",
        description: "Présentation de la page web de l'API Foxpile, avec les informations sur les endpoints et les méthodes disponibles"
    },
    {
        url: foxpileOauthPng,
        alt: "Emplacement pour une capture illustrant les requêtes signées",
        description: "Page de connexion au sein de l'api, permettant de générer un token d'accès en utilisant Steam ou Discord (Si relier sur le compagnon) comme fournisseur d'identité. Le token d'accès est ensuite utilisé pour récupérer les informations de l'utilisateur garantissant la récolte en fonction des autorisations du joueur"
    },
    {
        url: foxpileDocumentationPng,
        alt: "Emplacement pour une capture de la documentation de l'API Foxpile",
        description: "Présentation de la documentation de l'API Foxpile, intégrant les informations sur les endpoints, les méthodes disponibles et les exemples d'utilisation pour les développeurs souhaitant interagir avec l'API"
    }
];
</script>
