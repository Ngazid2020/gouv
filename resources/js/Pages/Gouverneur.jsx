import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Gouverneur({ biographie, vision, citation }) {
    return (
        <PublicLayout>
            <Head>
                <title>Le Gouverneur</title>
                <meta name="description" content="Biographie, vision et missions du Gouverneur de l'Île Autonome de Ngazidja." />
            </Head>

            {/* Hero */}
            <section className="bg-gradient-to-br from-bleu-nuit to-bleu-ng text-white py-16">
                <div className="wrap">
                    <p className="eyebrow">Gouverneur</p>
                    <h1 className="font-serif text-4xl sm:text-5xl font-semibold mt-1">Le Gouverneur<br/>de Ngazidja</h1>
                </div>
            </section>

            {/* Bio + photo */}
            <section className="py-16">
                <div className="wrap">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Photo placeholder */}
                        <div className="lg:col-span-1">
                            <div className="rounded-[18px] bg-azur-pale aspect-[3/4] flex items-center justify-center max-w-xs mx-auto lg:mx-0">
                                <div className="text-center">
                                    <div className="w-20 h-20 rounded-full bg-bleu-ng/20 flex items-center justify-center mx-auto mb-3">
                                        <span className="font-serif text-3xl text-bleu-ng font-bold">IM</span>
                                    </div>
                                    <p className="font-label text-xs uppercase tracking-wider text-gris">Gouverneur</p>
                                    <p className="font-serif text-sm text-bleu-nuit mt-1 font-semibold">Île Autonome de Ngazidja</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {citation && (
                                <blockquote className="border-l-4 border-or pl-6 py-2">
                                    <p className="font-serif text-xl italic text-bleu-nuit leading-relaxed">"{citation}"</p>
                                    <footer className="font-label text-xs uppercase tracking-wider text-or mt-3 font-semibold">Le Gouverneur</footer>
                                </blockquote>
                            )}

                            {biographie && (
                                <div>
                                    <h2 className="eyebrow">Biographie</h2>
                                    <div
                                        className="prose prose-sm max-w-none text-bleu-nuit/80 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: biographie }}
                                    />
                                </div>
                            )}

                            {vision && (
                                <div>
                                    <h2 className="eyebrow">Vision et missions</h2>
                                    <div
                                        className="prose prose-sm max-w-none text-bleu-nuit/80 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: vision }}
                                    />
                                </div>
                            )}

                            {!biographie && !vision && (
                                <div className="bg-azur-pale rounded-[18px] p-8 text-center">
                                    <p className="text-gris">Les informations biographiques seront publiées prochainement.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
