

export interface ProjectData {
    /**
     * Url du projet
     */
    slug: string;
    /**
     * Bot, Plugin, Web, ...
     */
    types: string[];
    /**
     * Date de réalisation (YYYY-MM-DD)
     */
    date: string;
    /**
     * Nom du projet
     */
    name: string;
    /**
     * Lien github
     */
    github?: string;
    /**
     * Lien du site
     */
    website?: string;
    /**
     * Description du projet
     */
    description: string;
    /**
     * Description OpenGraph
     */
    ogDescription?: string;
    /**
     * Technologie utilisé : Max 5
     */
    techs: string[];
    /**
     * Image de présentation
     */
    previewImage?: string;
    /**
     * Provenance
     */
    devFrom?: "home" | "school" | "company";
    /**
     * Nom de l'établissement : (school = Bonaparte, comany = ...)
     */
    locationName?: string;
    /**
     * Complement du nom de l'établissement
     */
    sndName?: string;
}