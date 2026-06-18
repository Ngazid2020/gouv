import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Agenda({ evenements }) {
    const now = new Date();
    const avenir = (evenements || []).filter(e => new Date(e.date) >= now);
    const passes = (evenements || []).filter(e => new Date(e.date) < now);

    return (
        <PublicLayout>
            <Head>
                <title>Agenda</title>
                <meta name="description" content="Agenda officiel du Gouvernorat de l'Île Autonome de Ngazidja : événements, cérémonies, réunions publiques." />
            </Head>

            {/* Hero */}
            <section className="bg-gradient-to-br from-bleu-nuit to-bleu-ng text-white py-16">
                <div className="wrap">
                    <p className="eyebrow">Agenda</p>
                    <h1 className="font-serif text-4xl sm:text-5xl font-semibold mt-1">Agenda officiel</h1>
                </div>
            </section>

            <section className="py-12">
                <div className="wrap max-w-3xl">
                    {(evenements || []).length === 0 ? (
                        <p className="text-center text-gris py-16">Aucun événement publié.</p>
                    ) : (
                        <>
                            {avenir.length > 0 && (
                                <div className="mb-12">
                                    <h2 className="eyebrow mb-6">Prochains événements</h2>
                                    <div className="space-y-4">
                                        {avenir.map(e => <EvenementCard key={e.id} evenement={e} upcoming/>)}
                                    </div>
                                </div>
                            )}
                            {passes.length > 0 && (
                                <div>
                                    <h2 className="eyebrow mb-6 text-gris">Événements passés</h2>
                                    <div className="space-y-4 opacity-60">
                                        {passes.reverse().map(e => <EvenementCard key={e.id} evenement={e}/>)}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}

function EvenementCard({ evenement: e, upcoming }) {
    const d = new Date(e.date);
    return (
        <div className={`rounded-[18px] border p-5 flex gap-5 items-start transition-shadow ${upcoming ? 'border-ligne bg-white hover:shadow-md' : 'border-ligne/50 bg-white/50'}`}>
            {/* Date block */}
            <div className={`text-center flex-shrink-0 w-14 h-14 rounded-[12px] flex flex-col items-center justify-center ${upcoming ? 'bg-bleu-ng text-white' : 'bg-gris-clair text-gris'}`}>
                <span className="font-serif text-xl font-bold leading-none">{d.getDate()}</span>
                <span className="font-label text-[0.6rem] uppercase tracking-wider mt-0.5">
                    {d.toLocaleDateString('fr-FR', { month: 'short' })}
                </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className="font-serif text-[1rem] font-semibold text-bleu-nuit leading-tight">{e.titre}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gris">
                    {e.lieu && (
                        <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                            </svg>
                            {e.lieu}
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                {e.description && (
                    <p className="text-sm text-gris mt-2 line-clamp-2">{e.description}</p>
                )}
            </div>
        </div>
    );
}
