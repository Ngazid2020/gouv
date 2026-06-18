import { Link, router } from '@inertiajs/react';
import SeoHead from '@/Components/SeoHead';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import FiltreActualites from '@/Components/FiltreActualites';

export default function Actualites({ articles, categories }) {
    const [filtre, setFiltre] = useState(null);

    const items = articles?.data || [];
    const filtered = filtre ? items.filter(a => a.categorie === filtre) : items;
    const pagination = articles || {};

    return (
        <PublicLayout>
            <SeoHead
                title="Actualités — Ngazidja"
                description="Toute l'actualité du Gouvernorat de l'Île Autonome de Ngazidja : gouvernance, communes, économie, culture."
            />

            {/* Hero */}
            <section className="bg-gradient-to-br from-bleu-nuit to-bleu-ng text-white py-16">
                <div className="wrap">
                    <p className="eyebrow">Actualités</p>
                    <h1 className="font-serif text-4xl sm:text-5xl font-semibold mt-1">Toutes les actualités</h1>
                </div>
            </section>

            <section className="py-12">
                <div className="wrap">
                    {/* Filtres */}
                    <div className="mb-8">
                        <FiltreActualites categories={categories} actif={filtre} onChange={setFiltre}/>
                    </div>

                    {/* Grille */}
                    {filtered.length === 0 ? (
                        <p className="text-center text-gris py-16">Aucun article disponible.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map(a => (
                                <ArticleCard key={a.id} article={a}/>
                            ))}
                        </div>
                    )}

                    {/* Pagination Inertia */}
                    {!filtre && pagination.last_page > 1 && (
                        <div className="flex justify-center gap-2 mt-12">
                            {pagination.links?.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    className={`min-w-[2.5rem] h-10 px-3 rounded-full text-sm font-semibold transition-colors ${
                                        link.active
                                            ? 'bg-bleu-ng text-white'
                                            : link.url
                                                ? 'bg-azur-pale text-bleu-nuit hover:bg-bleu-ng/10'
                                                : 'bg-transparent text-gris/40 cursor-default'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}

function ArticleCard({ article: a }) {
    const typeColors = { video: 'bg-bleu text-white', photo: 'bg-vert text-white', info: 'bg-or text-bleu-nuit' };
    return (
        <Link href={`/actualites/${a.slug}`} className="group block bg-white border border-ligne rounded-[18px] overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-azur-pale h-40 flex items-center justify-center overflow-hidden">
                {a.media_principal ? (
                    <img src={`/storage/${a.media_principal}`} alt={a.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                ) : (
                    <div className="opacity-30 text-azur">
                        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9l4-4 4 4 4-4 4 4"/></svg>
                    </div>
                )}
            </div>
            <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                    {a.type && <span className={`font-label text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full ${typeColors[a.type] || 'bg-azur-pale text-bleu'}`}>{a.type}</span>}
                    {a.categorie && <span className="text-xs text-gris">{a.categorie}</span>}
                </div>
                <h3 className="font-serif text-[1rem] font-semibold text-bleu-nuit mb-2 leading-tight group-hover:text-bleu transition-colors line-clamp-2">{a.titre}</h3>
                <p className="text-sm text-gris line-clamp-2">{a.extrait}</p>
                <p className="text-xs text-gris/60 mt-3 font-label">{formatDate(a.date_publication)}</p>
            </div>
        </Link>
    );
}

function formatDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
