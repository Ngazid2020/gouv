import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import MediathequeTabs from '@/Components/MediathequeTabs';

export default function Mediatheque({ medias }) {
    const totalCount = Object.values(medias || {}).reduce((s, arr) => s + arr.length, 0);

    return (
        <PublicLayout>
            <Head>
                <title>Médiathèque</title>
                <meta name="description" content="Médiathèque du Gouvernorat de Ngazidja : photos, vidéos, documents officiels et infographies." />
            </Head>

            {/* Hero */}
            <section className="bg-gradient-to-br from-bleu-nuit to-bleu-ng text-white py-16">
                <div className="wrap">
                    <p className="eyebrow">Médiathèque</p>
                    <h1 className="font-serif text-4xl sm:text-5xl font-semibold mt-1">Médiathèque</h1>
                    <p className="text-[#d4e3f4] mt-3">{totalCount} médias disponibles</p>
                </div>
            </section>

            <section className="py-12">
                <div className="wrap">
                    {totalCount === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 rounded-full bg-azur-pale flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-azur" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9l4-4 4 4 4-4 4 4"/>
                                </svg>
                            </div>
                            <p className="text-gris">Aucun média publié pour le moment.</p>
                        </div>
                    ) : (
                        <MediathequeTabs medias={medias}/>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
