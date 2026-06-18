import { Head, usePage } from '@inertiajs/react';

const SITE_NAME = 'Gouvernorat de Ngazidja';
const DEFAULT_OG_IMAGE = '/images/og-default.jpg';

export default function SeoHead({ title, description, image, type = 'website' }) {
    const { ziggy } = usePage().props;
    const url = ziggy?.location || '';
    const fullTitle = title.includes('Ngazidja') ? title : `${title} — ${SITE_NAME}`;

    return (
        <Head>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
            <link rel="canonical" href={url} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={fullTitle} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image || DEFAULT_OG_IMAGE} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            {description && <meta name="twitter:description" content={description} />}
            <meta name="twitter:image" content={image || DEFAULT_OG_IMAGE} />
        </Head>
    );
}
