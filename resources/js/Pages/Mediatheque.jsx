import SeoHead from '@/Components/SeoHead';
import PublicLayout from '@/Layouts/PublicLayout';
import MediathequeTabs from '@/Components/MediathequeTabs';

export default function Mediatheque({ medias }) {
    return (
        <PublicLayout>
            <SeoHead
                title="Médiathèque — Ngazidja"
                description="L'espace mémoire du Gouverneur : discours longs et courts, citations marquantes, galerie et documents officiels."
            />

            {/* Hero */}
            <section className="bg-gradient-to-br from-bleu-nuit to-bleu-ng text-white py-16">
                <div className="wrap" style={{ maxWidth: '680px' }}>
                    <p className="eyebrow">Médiathèque</p>
                    <h1 className="font-serif text-4xl sm:text-5xl font-semibold mt-1">
                        Discours, citations &amp; mémoire
                    </h1>
                    <p className="mt-3" style={{ color: '#d4e3f4', fontSize: '1.04rem' }}>
                        L'espace mémoire du Gouverneur : discours longs et courts, citations marquantes,
                        galerie et documents officiels.
                    </p>
                </div>
            </section>

            {/* Contenu */}
            <section className="py-12">
                <div className="wrap">
                    <MediathequeTabs medias={medias || {}} />
                </div>
            </section>
        </PublicLayout>
    );
}
