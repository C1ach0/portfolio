
export default function defineSchema(schemas: object[]) {
    const scripts = schemas.map(schema => ({
        type: 'application/ld+json',
        children: JSON.stringify(schema)
    }));

    useHead({
        script: scripts,
    })
}