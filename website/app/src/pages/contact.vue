<template>
    <NuxtLayout>
        <section id="about"
            class="min-h-screen flex flex-col items-center py-20 justify-center relative overflow-hidden">
            <div class="container mx-auto px-6 relative z-10">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div ref="aboutContent" class="space-y-6">
                        <div class="overflow-hidden">
                            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-rose-500 dark:text-rose-400 transform translate-y-full opacity-0"
                                ref="aboutTitle">
                                Me Contacter
                            </h2>
                        </div>
                        <div class="space-y-3">
                            <p class="text-lg text-gray-800 dark:text-gray-300 leading-relaxed transform translate-y-8 opacity-0"
                            ref="aboutText1">
                                Toujours ouvert à de nouveaux défis et collaborations,
                                je m'investis avec sérieux dans des projets aux enjeux variés.
                                N'hésitez pas à me contacter pour échanger autour de vos besoins ou de vos idées.
                            </p>
                            <p class="text-lg text-gray-800 dark:text-gray-300 leading-relaxed transform translate-y-8 opacity-0"
                            ref="aboutText2">
                                Que ce soit pour une prise de contact, une proposition de projet,
                                un échange technique ou un entretien, je reste disponible.
                                Vous pouvez me joindre facilement par email ou via LinkedIn.
                            </p>
                        </div>
                    </div>
                    <div ref="aboutImage" class="relative group scale-90 lg:scale-100">
                        <div
                            class="relative w-full h-96 transform rotate-3 group-hover:rotate-6 transition-transform duration-700">
                            <div
                                class="absolute inset-0 bg-gradient-to-br from-rose-600 via-purple-600 to-pink-600 rounded-2xl transform rotate-6 opacity-80 group-hover:rotate-12 transition-all duration-700">
                            </div>
                            <img src="~/assets/data/images/45deg.jpg" class="absolute h-96 w-full object-cover object-center inset-0 rounded-2xl opacity-60 group-hover:opacity-80 transition-all duration-500"/>
                        </div>
                        <div
                            class="absolute -top-4 -right-4 w-24 h-24 bg-rose-500/20 rounded-full blur-xl animate-pulse">
                        </div>
                        <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"
                            style="animation-delay: 1s;"></div>
                        <div class="absolute top-8 right-8 w-4 h-4 bg-rose-400 rotate-45 animate-bounce"
                            style="animation-delay: 0.5s;"></div>
                        <div class="absolute bottom-8 left-8 w-3 h-3 bg-purple-400 rounded-full animate-ping"
                            style="animation-delay: 1.5s;"></div>
                        <div class="absolute -top-6 left-1/4 tech-float">
                            <div
                                class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                Vue
                            </div>
                        </div>
                        <div class="absolute -right-6 top-1/3 tech-float" style="animation-delay: 0.8s;">
                            <div
                                class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                TS
                            </div>
                        </div>
                        <div class="absolute -bottom-6 right-1/4 tech-float" style="animation-delay: 1.2s;">
                            <div
                                class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                Java
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

defineMeta({
    title: "Maxence Bessi - Développeur FullStack",
    description: "Maxence Bessi, développeur passionné, spécialisé dans la création d'applications et l'exploration de technologies variées pour proposer des solutions performantes et innovantes.",
    image: {
        component: "Base",
        props: {
            headline: "Portfolio",
            title: "Maxence Bessi",
            description: "Développeur passionné et curieux, toujours en quête d'amélioration et de nouvelles compétences."
        }
    }
})

defineSchema([
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Maxence Bessi - Développeur Full Stack",
        "url": "https://maxence-bessi.com",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Maxence Bessi - Développeur Full Stack",
            "url": "https://maxence-bessi.com"
        },
        "about": {
            "@type": "Person",
            "name": "Bessi Maxence"
        }
    }
])

const aboutContent = useTemplateRef("aboutContent");

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)

    // About section animations
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: aboutContent.value,
            start: "top 80%",
            end: "bottom 20%"
        }
    })

    // Animate about title
    aboutTl
        .fromTo("#about h2",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo("#about p",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" },
            "-=0.4"
        )
        .fromTo(".skill-card",
            { opacity: 0, y: 40, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "back.out(1.7)" },
            "-=0.3"
        )
        .fromTo(".metric-item",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
            "-=0.2"
        );
});
</script>