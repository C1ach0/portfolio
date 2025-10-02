<template>
    <h2 class="text-2xl font-bold mb-6">Image Management ({{ renderedImages.length }})</h2>
    <div class="mb-6">
        <input type="file" @change="uploadFile" accept="image/*"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="img in renderedImages" :key="img"
            class="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
            <img :src="img" alt="Uploaded Image" class="w-full h-48 object-cover rounded mb-4" />
            <UInput :model-value="img" readonly class="mb-4 text-sm text-gray-600" />
            <div class="flex justify-between">
                <UButton @click="copyToClipboard(img)" color="info" size="sm" variant="outline">
                    Copy URL
                </UButton>
                <UButton @click="removeFile(img)" color="error" size="sm" variant="outline">
                    Remove
                </UButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useApi } from '~/services/api';
const toast = useToast();
const route = useRoute();

const images = ref<string[]>([]);

const renderedImages = computed(() => images.value); 

const loadImage = async (filename: string) => {
    try {
        const res = await useApi(`/projects/${useRoute().params.slug}/images/${filename}`);
        if (res.ok) {
            images.value.push(res.url);
            console.log(res.url);
        }
    } catch (error) {
        console.error("Error loading image:", error);
    }
};

const uploadFile = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    console.log(file);

    useApi(`/projects/${route.params.slug}/upload`, {
        method: "post",
        headers: {
            'Content-Type': file.type, // Type MIME de l'image
        },
        body: file
    }).then(async res => {
        console.log(res);
        if (!res.ok) {
            toast.add({
                id: "error",
                title: "Image Upload",
                description: "Error while uploading file.",
                icon: "",
                color: "error"
            });
        } else {
            images.value.push(res.url);
            toast.add({
                id: "success",
                title: "Image Upload",
                description: "Image uploaded.",
                icon: "",
                color: "success"
            });
            await loadImages();
        }
    })
}

const removeFile = (imgUrl: string) => {
    const splitted = imgUrl.split("/");
    const fileName = splitted[splitted.length - 1];
    console.log(fileName);
    useApi(`/projects/${route.params.slug}/images/${fileName}`, {
        method: "delete"
    }).then(async res => {
        if (!res.ok) {
            toast.add({
                id: "error",
                title: "Image Remove",
                description: "Error while removing file.",
                icon: "",
                color: "error"
            });
        } else {
            images.value.push(res.url);
            toast.add({
                id: "success",
                title: "Image Remove",
                description: "Image removed.",
                icon: "",
                color: "success"
            });
            await loadImages();
        }
    })
}

const copyToClipboard = (imgUrl: string) => {
    navigator.clipboard.writeText(imgUrl).then(() => {
        toast.add({
            id: "copy-success",
            title: "Copy to Clipboard",
            description: "Image URL copied successfully.",
            icon: "",
            color: "success"
        });
    }).catch(err => {
        console.error('Failed to copy: ', err);
        toast.add({
            id: "copy-error",
            title: "Copy Error",
            description: "Failed to copy image URL.",
            icon: "",
            color: "error"
        });
    });
}

// Load images function
const loadImages = async () => {
    try {
        const res = await useApi(`/projects/${route.params.slug}/images`);
        const urls = await res.json();
        images.value = [];
        for (let img of urls) {
            await loadImage(img);
        }
    } catch (error) {
        console.error("Error loading images:", error);
    }
};

// Initialize content if markdown exists
onMounted(async () => {
    await loadImages();
});
</script>