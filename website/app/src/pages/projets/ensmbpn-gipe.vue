<template>
    <NuxtLayout>
        <template v-if="project">
            <ProjectInfo :project />
            <article class="min-h-screen relative overflow-x-hidden max-w-6xl mx-auto px-2">
                <header class="max-w-3xl mx-auto text-center space-y-5">
                    <h1 class="text-4xl font-bold">Gestion Informatisée Pour l'Enseignement</h1>
                    <p>
                        GIPE est un projet auquel j'ai largement contribué. J'y ai apporté de nombreuses recommandations
                        afin d'en améliorer la conception et d'en assurer la pérennité.

                        Ce projet a pour objectif de soutenir le service des ressources humaines de l'école, ainsi que
                        d'optimiser la gestion des cours et des exercices.
                    </p>
                    <img :src="pageLoginHeader" alt="Présentation du projet GIPE. Page de connexion sur l'application">
                    <SkillBadge :tech-uses="techUses" />
                </header>
                <section class="py-20 flex flex-col-reverse lg:grid grid-cols-2 gap-4 items-start">
                    <Galery :images="images1" />
                    <div class="space-y-3">
                        <p class="text-justify">
                            Afin de reprendre le projet dans de bonnes conditions, nous l'avons restructuré en deux
                            services distincts : un site web et une API. Cette séparation nous a permis de mieux
                            comprendre l'architecture de l'application et d'envisager son évolution, notamment en
                            facilitant le développement futur d'autres applications pouvant s'y connecter.
                        </p>
                        <p class="text-justify">
                            Dans un premier temps, avec cette nouvelle configuration, nous avons consacré plusieurs
                            heures à concevoir un système modulable pour la gestion des groupes, ainsi qu'une méthode
                            plus efficace pour administrer les rôles au sein de l'application.
                        </p>
                        <p class="text-justify">
                            Pour y parvenir, je me suis appuyé sur différentes solutions avec lesquelles j'avais déjà
                            travaillé, et nous avons retenu cette approche. Nous avons ainsi mis en place une table «
                            Permissions », directement exploitée dans le code, puis défini des rôles regroupant
                            plusieurs de ces permissions.
                        </p>
                        <p class="text-justify">
                            Nous avons ensuite associé les rôles créés soit à des groupes, soit à des utilisateurs
                            individuels via un système d'affectation. Cela nous a permis de développer une application
                            dotée d'un système suffisamment modulable pour répondre aux besoins de notre école, et
                            potentiellement à ceux d'autres établissements.
                        </p>
                    </div>
                </section>
                <section class="py-20 flex flex-col lg:grid grid-cols-2 gap-4">
                    <div class="space-y-3">
                        <p class="text-justify">
                            Au sein de l'application, j'ai principalement contribué à la mise en place de la gestion des
                            groupes et des rôles, mais également au développement complet du module de gestion des
                            personnes : création, modification et assignation à des groupes. Pour cela, je me suis
                            appuyé en partie sur l'ancienne version du système afin d'en analyser le fonctionnement et
                            d'identifier précisément les besoins métiers, tout en veillant à moderniser et structurer
                            davantage l'architecture existante.
                        </p>
                        <p class="text-justify">
                            L'une des principales étapes a consisté à établir une liaison avec l'annuaire militaire.
                            Cette intégration a représenté un défi important, puisque nous travaillions sur un réseau
                            isolé, non directement connecté à celui de l'annuaire. J'ai donc dû concevoir un mécanisme
                            d'échange et de synchronisation fiable, en réalisant de nombreux tests entre les
                            environnements de développement et de préproduction. Après plusieurs phases de validation,
                            l'intégration s'est révélée concluante, permettant la création de nouvelles personnes ainsi
                            que l'importation et la mise à jour d'individus déjà présents dans l'annuaire.
                        </p>
                        <p class="text-justify">
                            J'ai ensuite développé les fonctionnalités de modification des profils enregistrés. Cela
                            inclut la mise à jour des informations professionnelles et personnelles, la gestion des
                            véhicules associés, ainsi que le suivi des affectations. Une attention particulière a été
                            portée à la cohérence des données, à la traçabilité des modifications et au respect des
                            règles RGPD afin de garantir un système fiable, évolutif
                            et conforme aux exigences opérationnelles.
                        </p>
                    </div>
                    <Galery :images="images2" />
                </section>
                <!-- <section class="py-20 grid grid-cols-2 gap-4">
                    <Galery :images="images3" />
                    <div class="space-y-3">
                        <p class="text-justify">

                        </p>
                        <p class="text-justify">

                        </p>

                    </div>
                </section> -->
                <section class="py-20 space-y-5">
                    <h2 class="text-center font-bold text-2xl">Autres fonctionnalités ajoutées à l'application</h2>
                    <div class="flex flex-col lg:grid grid-cols-3 gap-3">
                        <ImageDesc v-for="(img, n) in imagesOthers" :key="n" :image="img" />
                    </div>
                </section>
                <footer class="pb-20 text-center">
                    <p>
                        Je tiens à remercier l'ensemble de l'équipe pour son engagement, sa collaboration et son
                        implication tout au long du développement de l'application. Leur contribution a été essentielle
                        à la réussite de ce projet.
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
        "@type": "CreativeWork",
        "name": `Maxence Bessi - ${project.value?.name}`,
        "description": project.value?.description,
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
            "name": "Marine Nationale",
            "url": "https://www.defense.gouv.fr/marine"
        },
        "dateCreated": "2024-09",
        "datePublished": "2026-07",
        "keywords": [
            "website",
            "pedagogie",
            "marine nationale",
            "ensm-bpn"
        ]
    },
])

const techUses = [
    {
        icon: "typescript",
        name: "TypeScript"
    },
    {
        icon: "vuejs-light",
        name: "VueJS"
    },
    {
        icon: "tailwindcss-light",
        name: "TailwindCSS"
    },
    {
        icon: "php-light",
        name: "PHP 8.3"
    },
    {
        icon: "symfony-light",
        name: "Symfony 6.4"
    },
    {
        icon: "mysql-light",
        name: "MariaDB"
    },
    {
        icon: "git",
        name: "Git"
    },
    {
        icon: "gitlab-light",
        name: "GitLab"
    }
]

import pageLoginHeader from "~/assets/data/images/projects/ensmbpn-gipe/page_login.png";

import manageGroups from "~/assets/data/images/projects/ensmbpn-gipe/manage_groups.png";
import manageRolePermission from "~/assets/data/images/projects/ensmbpn-gipe/ajout_perm_role.png";
import manageRole from "~/assets/data/images/projects/ensmbpn-gipe/create_roles.png";
import manageGroupsRoles from "~/assets/data/images/projects/ensmbpn-gipe/manage_permission_groups.png";
const images1 = [
    { 
        url: manageGroups, 
        alt: "Gestion des groupes au sein de l'école", 
        description: "Création et gestion des groupes au sein de l'école, permettant une organisation hiérarchique et l'affectation des utilisateurs à leurs groupes respectifs." 
    },
    { 
        url: manageRolePermission, 
        alt: "Gestion des permissions associées aux rôles",
        description: "Attribution de permissions définies dans l'application aux rôles, permettant un contrôle précis des actions disponibles."
    },
    { 
        url: manageRole, 
        alt: "Gestion des rôles et de leurs permissions",
        description: "Création, modification et gestion des rôles utilisés dans l'application. Chaque rôle peut être configuré avec des permissions spécifiques afin de définir précisément les actions autorisées pour les utilisateurs, facilitant ainsi une gestion claire et sécurisée des accès."
    },
    { 
        url: manageGroupsRoles, 
        alt: "Attribution de rôles aux groupes",
        description: "Attribution d'un ou plusieurs rôles à un groupe afin d'accorder des permissions à ses membres ainsi qu'à ceux des groupes enfants, héritant de ces permissions."
    },
];

import personCreateS from "~/assets/data/images/projects/ensmbpn-gipe/search_before_create.png";
import personCreate from "~/assets/data/images/projects/ensmbpn-gipe/create_person.png";
import personInfo from "~/assets/data/images/projects/ensmbpn-gipe/person_information.png";
const images2 = [
    { 
        url: personCreateS, 
        alt: "Recherche d'une personne existante dans l'application ou l'annuaire militaire",
        description: "Formulaire de recherche dans l'annuaire (LDAP) avant la création d'une personne. Cette étape permet de récupérer les données existantes et d'éviter les doublons."
    },
    { 
        url: personCreate, 
        alt: "Création d'une personne avec ou sans les informations collectées",
        description: "Création d'une personne à partir des informations récupérées via le LDAP ou saisies manuellement. Seules les informations essentielles sont მოთხოვ afin de permettre aux ressources humaines d'effectuer l'enregistrement plus rapidement."
    },
    { 
        url: personInfo, 
        alt: "Visualisation des informations des personnes enregistrées dans l'application", 
        description: "Consultation des informations des personnes enregistrées dans l'application, incluant les données professionnelles, personnelles ainsi que celles liées à la formation ou à l'affectation au sein de l'école."
    }
];

// const images3 = [
//     { url: personInfo, alt: "Visionage des informations des personnes enregistrer dans l'application" }

// ];


// petit.e ajoute / modification
import sessionView from "~/assets/data/images/projects/ensmbpn-gipe/session_view.png";
const imagesOthers = [
    {
        url: sessionView,
        alt: "Visualisation des sessions acttives avec leurs dates de début et de fin",
        description: "Affichage détaillé des sessions actives, incluant leurs dates de début et de fin, offrant une vision claire de leur période de validité et un suivi précis de leur état. La consultation est limitée à une fenêtre temporelle de trois semaines : la semaine en cours, la semaine précédente et la semaine suivante, afin de conserver une vue pertinente et synthétique."
    }
];

</script>