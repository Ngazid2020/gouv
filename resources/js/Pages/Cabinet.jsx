import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import OrganigrammeCabinet from '@/Components/OrganigrammeCabinet';

export default function Cabinet({ membres }) {
    return (
        <PublicLayout>
            <Head>
                <title>Cabinet du Gouverneur</title>
                <meta name="description" content="Composition et organigramme du Cabinet du Gouverneur de l'Île Autonome de Ngazidja." />
            </Head>

            {/* Hero */}
            <section className="bg-gradient-to-br from-bleu-nuit to-bleu-ng text-white py-16">
                <div className="wrap">
                    <p className="eyebrow">Organisation</p>
                    <h1 className="font-serif text-4xl sm:text-5xl font-semibold mt-1">Le Cabinet<br/>du Gouverneur</h1>
                    <p className="text-[#d4e3f4] mt-4 max-w-xl">
                        Composition et organigramme du cabinet de l'île autonome de Ngazidja.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="wrap">
                    {(membres || []).length === 0 ? (
                        <p className="text-center text-gris py-16">Aucun membre du cabinet publié pour le moment.</p>
                    ) : (
                        <OrganigrammeCabinet membres={membres}/>
                    )}
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-12 bg-azur-pale">
                <div className="wrap text-center">
                    <p className="eyebrow">Prendre contact</p>
                    <h2 className="section-title">Contacter le Cabinet</h2>
                    <p className="text-gris mb-6">Adressez votre message directement au membre du cabinet concerné.</p>
                    <Link href="/contact" className="btn-or">Écrire au Cabinet →</Link>
                </div>
            </section>
        </PublicLayout>
    );
}
