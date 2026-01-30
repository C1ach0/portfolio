<template>
  <UApp>
    <IntroConfig v-model:isOpen="open"/>
    <NuxtPage/>
  </UApp>
</template>

<script setup lang="ts">
defineOgImageComponent("Base", {
  title: "Maxence Bessi - Développeur Full Stack",
  description: "Je suis Maxence Bessi, un développeur passionné. J'adore travailler avec toutes sortes de technologies et développer des applications.",
  theme: "#f43f5e",
  colorMode: "dark"
});

defineSchema([
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Bessi Maxence",
    "givenName": "Maxence",
    "familyName": "Bessi",
    "jobTitle": "Développeur web",
    "url": "https://maxence-bessi.com",
    "sameAs": [
      "https://github.com/C1ach0",
      "https://www.linkedin.com/in/maxence-bessi"
    ],
    "knowsAbout": [
      "JavaScript", "TypeScript",
      "Vue.js", "Nuxt",
      "Java", "Spring",
      "PHP", "Symfony",
      "TailwindCSS",
      "Docker", "Linux"
    ]
  }
]);

if (typeof window !== 'undefined') {
  console.log(`
https://maxence-bessi.com
https://rosystudio.net

     ++++++++
    +++++++++++     =+++
    ++++++++++++   +++++=
    =++++++++++++ +++++++
     +=++++++++++ ++++++
        ==+++++++ =++++
  ++++++++ =++++++ +++
 +++++++++++++++++ ==
 ++++++++++++++=        +++=+++++=+
  +++++++=+=       =+++++++++++++++++++
               +++++++++++++++++++++++++++
            ++++++++++++++++++++++++++++++=
         +++++++++++++++++++++++++++++++++++
       +++++++++++++++++++++++++++++++++++++
     =++++++++++++++++++++++++++++++++++++++
    +++++++++++++++++++++++++++++++++++++++++
  +++++++++++++++++++++++=      ++++++++++++
 +++++++++++++++++++++          ++++++++++++
+++++++++++++++++++             ++++++++++++
++++++++++++++++        ++     ++++++++++++
++++++++++++++         +++     +++++++++++
+++++++++++++        +++++    +++++++++++
 ++++++++++++       +++++=   +++++++++++        =
  +=+++++++++++    ++++++  ++++++++++++      ++++
     ++++++++++++  ++++++ =++++++++++   +++++++++
                  ++++++++++++++++++++++++++++++
                  ++++++++++++++++++++++++++++++
                  +++++++++++++++++++++++++++++
                  ++++++++++++++++++++++++++++
                  ++++++++++++++++++++++++++=
                  =+++++++++  =++++++++++++
                   ++++++++++      ==+=+
                     =++++++++=
                       +++++++++
`);
}

const open = ref<boolean>(true);
</script>
