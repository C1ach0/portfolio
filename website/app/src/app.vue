<template>
  <UApp>
    <NuxtPage/>
    <!-- <NpptPresenter />
    <NpptLauncher label="Démarrer la présentation" class="fixed z-50 bottom-4 right-4 hover:-rotate-2 ease-in-out duration-250 shadow"/> -->
  </UApp>
</template>

<script setup lang="ts">
defineOgImageComponent("Base", {
  title: "Maxence Bessi - Développeur Full Stack",
  description: "Je suis Maxence Bessi, un développeur passionné. J'adore travailler avec toutes sortes de technologies et développer des applications.",
  theme: "#f43f5e",
  colorMode: "dark"
});

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
