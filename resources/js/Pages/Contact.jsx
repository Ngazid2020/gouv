import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import FormulaireContact from '@/Components/FormulaireContact';

export default function Contact({ membres }) {
    return (
        <PublicLayout>
            <Head>
                <title>Contact</title>
                <meta name="description" content="Contactez le Gouvernorat de l'Île Autonome de Ngazidja ou un membre du cabinet." />
            </Head>

            {/* Hero */}
            <section className="bg-gradient-to-br from-bleu-nuit to-bleu-ng text-white py-16">
                <div className="wrap">
                    <p className="eyebrow">Nous contacter</p>
                    <h1 className="font-serif text-4xl sm:text-5xl font-semibold mt-1">Contact</h1>
                    <p className="text-[#d4e3f4] mt-3 max-w-xl">
                        Adressez votre message au Gouvernorat ou directement à un membre du cabinet.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="wrap">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Infos */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="eyebrow mb-3">Adresse</h2>
                                <address className="not-italic text-sm text-bleu-nuit/80 leading-relaxed">
                                    Palais du Gouvernorat<br/>
                                    Mrodjuu, Moroni<br/>
                                    Ngazidja — Union des Comores
                                </address>
                            </div>

                            {(membres || []).length > 0 && (
                                <div>
                                    <h2 className="eyebrow mb-3">Cabinet</h2>
                                    <ul className="space-y-3">
                                        {membres.slice(0, 5).map(m => (
                                            <li key={m.id} className="text-sm">
                                                <p className="font-semibold text-bleu-nuit">{m.nom}</p>
                                                <p className="text-gris text-xs">{m.role}</p>
                                                {m.email && (
                                                    <a href={`mailto:${m.email}`} className="text-azur hover:underline text-xs">{m.email}</a>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Formulaire */}
                        <div className="lg:col-span-2 bg-white border border-ligne rounded-[18px] p-8 shadow-soft">
                            <h2 className="font-serif text-2xl font-semibold text-bleu-nuit mb-6">Envoyer un message</h2>
                            <FormulaireContact membres={membres}/>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
