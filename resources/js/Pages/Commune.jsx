import { Link } from '@inertiajs/react';
import SeoHead from '@/Components/SeoHead';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Commune({ commune, articles }) {
    const elus = commune.elus || [];
    const maire = elus.find(e => e.role === 'maire');
    const adjoints = elus.filter(e => e.role === '1er_adjoint' || e.role === '2e_adjoint');

    return (
        <PublicLayout>
            <SeoHead
                title={`Commune de ${commune.nom} — Ngazidja`}
                description={`Fiche de la commune de ${commune.nom}, préfecture de ${commune.prefecture?.nom || ''}, île de Ngazidja.`}
            />

            {/* Hero */}
            <section
                className="py-16 text-white relative"
                style={{ background: `linear-gradient(135deg, #071A33, ${commune.couleur || '#08457E'})` }}
            >
                <div className="wrap relative z-10">
                    <nav className="text-sm text-white/60 mb-4 flex gap-1 items-center font-label">
                        <Link href="/communes" className="hover:text-white transition-colors">Communes</Link>
                        <span className="mx-1">›</span>
                        <span className="text-white">{commune.nom}</span>
                    </nav>
                    <p className="eyebrow">Commune</p>
                    <h1 className="font-serif text-4xl sm:text-5xl font-semibold mt-1">{commune.nom}</h1>
                    {commune.prefecture && (
                        <p className="text-[#d4e3f4] mt-2">Préfecture de {commune.prefecture.nom}</p>
                    )}
                </div>
            </section>

            {/* Infos */}
            <section className="py-12">
                <div className="wrap">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Stats */}
                        <div className="lg:col-span-1 space-y-4">
                            {commune.superficie && (
                                <StatCard label="Superficie" value={`${commune.superficie} km²`}/>
                            )}
                            {commune.population && (
                                <StatCard label="Population" value={commune.population?.toLocaleString('fr-FR')}/>
                            )}
                            {commune.chef_lieu && (
                                <StatCard label="Chef-lieu" value={commune.chef_lieu}/>
                            )}
                            {maire && (
                                <StatCard label="Maire" value={maire.nom}/>
                            )}
                        </div>

                        {/* Description + élus */}
                        <div className="lg:col-span-2 space-y-8">
                            {commune.description && (
                                <div>
                                    <h2 className="eyebrow">Présentation</h2>
                                    <p className="text-bleu-nuit/80 leading-relaxed">{commune.description}</p>
                                </div>
                            )}

                            {elus.length > 0 && (
                                <div>
                                    <h2 className="eyebrow mb-4">Élus</h2>
                                    <div className="space-y-3">
                                        {elus.map(e => (
                                            <div key={e.id} className="flex items-center gap-4 p-3 rounded-[12px] border border-ligne hover:bg-azur-pale transition-colors">
                                                <div className="w-9 h-9 rounded-full bg-azur-pale flex items-center justify-center text-sm font-serif font-semibold text-bleu-ng">
                                                    {initiales(e.nom)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm text-bleu-nuit">{e.nom}</p>
                                                    <p className="text-xs text-gris capitalize">{e.fonction}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles rattachés */}
            {(articles || []).length > 0 && (
                <section className="py-12 bg-azur-pale">
                    <div className="wrap">
                        <h2 className="section-title mb-8">Actualités liées</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {articles.map(a => (
                                <Link key={a.id} href={`/actualites/${a.slug}`} className="bg-white rounded-[18px] p-4 hover:shadow-md transition-shadow">
                                    <p className="font-serif text-sm font-semibold text-bleu-nuit mb-1 line-clamp-2">{a.titre}</p>
                                    <p className="text-xs text-gris">{formatDate(a.date_publication)}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Back */}
            <section className="py-8">
                <div className="wrap">
                    <Link href="/communes" className="btn-outline">← Retour à la carte</Link>
                </div>
            </section>
        </PublicLayout>
    );
}

function StatCard({ label, value }) {
    return (
        <div className="bg-azur-pale rounded-[12px] p-4">
            <p className="eyebrow text-[0.65rem]">{label}</p>
            <p className="font-serif text-xl font-semibold text-bleu-nuit">{value}</p>
        </div>
    );
}

function initiales(nom) {
    return (nom || '').split(' ').map(w => w[0] || '').slice(0, 2).join('').toUpperCase();
}

function formatDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
