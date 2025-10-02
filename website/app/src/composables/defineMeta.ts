import type { UseSeoMetaInput } from "@unhead/vue";

export function defineMeta(options: {
    title: string,
    description: string,
    url?: string,
    image?: {
        component: string,
        props?: Record<string, any>
    }
}) {
    const routeUrl = useRequestURL();
    const pageUrl = options.url || routeUrl.href;

    if(options.image) {
        defineOgImageComponent(options.image.component, options.image.props);
    }

    const meta: UseSeoMetaInput = {
        title: options.title,
        description: options.description,
        ogTitle: options.title,
        ogDescription: options.description,
        ogUrl: pageUrl,
        twitterTitle: options.title,
        twitterDescription: options.description,
        twitterCard: 'summary_large_image'
    }

    useSeoMeta(meta);
    useServerSeoMeta(meta);
}