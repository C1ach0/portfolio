<template>
    <UModal v-model:open="isOpen">
        <template #content>
            <div class="space-y-4 p-4">
                <h2 class="text-lg font-semibold">Configuration de la présentation</h2>
                <p class="mt-4">
                    Choisissez les options que vous souhaitez pour la présentation.
                </p>
                
                <!-- Control -->
                <UFormField label="Mode de contrôle">
                    <URadioGroup v-model="control" :items="[
                        { label: 'Automatique', value: 'auto' },
                        { label: 'Manuel', value: 'manual' }
                    ]" class="mt-4"/>
                </UFormField>

                <!-- Duration (auto mode only) -->
                <UFormField label="Duration" v-if="control == 'auto'">
                    <UInputNumber
                        v-model="duration"
                        label="Durée de chaque étape (en secondes)"
                        class="mt-4 w-full"
                        :min="1"
                        :max="60"/>
                </UFormField>
                <!-- Projects Selection -->
                <UFormField label="Projets à inclure">
                  <UTable :key="control" :data="projects" :columns="columnsProjects" class="flex-1" />
                </UFormField>

                <div class="flex justify-end gap-2 pt-4">
                    <UButton color="secondary" variant="soft" @click="close">
                        Annuler
                    </UButton>
                    <UButton @click="confirm">
                        Lancer la présentation
                    </UButton>
                </div>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { projects } from "~/assets/data/projects"
import { useRouter, useRoute } from "vue-router"
import type { TableColumn } from "@nuxt/ui"
import type { ProjectData } from "~/models/Project.models"
import { UCheckbox, URadioGroup } from "#components"

const router = useRouter()
const route = useRoute()

const isOpen = ref(false)

watch(
  () => route.query.intro,
  (value) => {
    isOpen.value = value === 'config'
  },
  { immediate: true }
)


const duration = ref(3500)
const control = ref<"auto" | "manual">("auto")

type ProjectMode = 'out' | 'in'
const projectModes = ref<Record<string, ProjectMode>>({})

const colorMode = useColorMode()
const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set(_isDark) {
        colorMode.preference = _isDark ? 'dark' : 'light'
    }
})

watch(control, (value) => {
  if (value === 'auto') {
    projectModes.value = {}
  }
})

const close = () => {
  isOpen.value = false

  const { intro, ...rest } = route.query
  router.replace({ query: rest })
}

const confirm = () => {

  const projectsParam = Object.entries(projectModes.value)
    .map(([slug, mode]) =>
      mode === 'in' ? `${slug}[in]` : slug
    )
    .join(',')

  isDark.value = false;

  router.push({
    query: {
      ...route.query,
      intro: "start",
      ...(control.value === 'auto' ? { duration: duration.value } : null),
      control: control.value,
      projects: projectsParam
    }
  }).then(() => {
    window.location.reload();
  })
}

const columnsProjects = computed<TableColumn<ProjectData>[]>(() => [
  {
    accessorKey: 'name',
    header: 'Projet',
    cell: ({row}) => row.getValue('name') as string
  },
  {
    header: 'Présenter',
    cell: ({ row }) => {
      const slug = row.original.slug
      const isPresented = slug in projectModes.value

      return h(UCheckbox, {
        modelValue: isPresented,
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => {
          if (value) {
            projectModes.value[slug] = projectModes.value[slug] ?? 'out'
          } else {
            delete projectModes.value[slug]
          }
        }
      })
    }
  },
  {
    header: 'Entrer (manuel)',
    cell: ({ row }) => {
      const slug = row.original.slug
      const isManual = control.value === 'manual'
      const isPresented = slug in projectModes.value
      const isIn = projectModes.value[slug] === 'in'

      return h(UCheckbox, {
        disabled: !isPresented || !isManual,
        modelValue: isIn,
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => {
          projectModes.value[slug] = value ? 'in' : 'out'
        }
      })
    }
  }
]);
</script>
