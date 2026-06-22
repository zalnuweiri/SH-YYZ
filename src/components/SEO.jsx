export default function SEO({ title, description, jsonLd, url }) {
    return (
        <>
            {/* Title */}
            <title>{title}</title>

            {/* Meta Description */}
            <meta name="description" content={description} />

            {/* Canonical */}
            {url && <link rel="canonical" href={url} />}

            {/* Robots */}
            <meta name="robots" content="index, follow" />

            {/* JSON-LD (supports single object OR array) */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </>
    );
}