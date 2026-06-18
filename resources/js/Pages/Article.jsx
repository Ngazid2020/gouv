import { Link } from '@inertiajs/react';
import SeoHead from '@/Components/SeoHead';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Article({ article }) {
    return (
        <PublicLayout>
            <SeoHead
                title={`${article.titre} — Ngazidja`}
                description={article.extrait || ''}
                image={article.media_principal ? `/storage/${article.media_principal}` : undefined}
                type="article"
            />

            {/* Breadcrumb */}
            <div className="bg-azur-pale py-3 border-b border-ligne">
                <div className="wrap">
                    <nav className="text-sm text-gris flex gap-1 items-center font-label">
                        <Link href="/actualites" className="hover:text-bleu transition-colors">Actualités</Link>
                        <span className="mx-1">›</span>
                        <span className="text-bleu-nuit line-clamp-1">{article.titre}</span>
                    </nav>
                </div>
            </div>

            <article className="py-14">
                <div className="wrap max-w-3xl">
                    {/* Header */}
                    <header className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            {article.type && (
                                <span className="font-label text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-azur-pale text-bleu font-semibold">
                                    {article.type}
                                </span>
                            )}
                            {article.categorie && (
                                <span className="font-label text-xs text-gris uppercase tracking-wider">{article.categorie}</span>
                            )}
                        </div>
                        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-bleu-nuit leading-tight mb-4">
                            {article.titre}
                        </h1>
                        {article.extrait && (
                            <p className="text-lg text-gris leading-relaxed border-l-4 border-or pl-5 py-1">
                                {article.extrait}
                            </p>
                        )}
                        <p className="text-sm text-gris mt-4 font-label">{formatDate(article.date_publication)}</p>
                    </header>

                    {/* Image principale */}
                    {article.media_principal && (
                        <div className="rounded-[18px] overflow-hidden mb-10">
                            <img
                                src={`/storage/${article.media_principal}`}
                                alt={article.titre}
                                className="w-full h-72 object-cover"
                            />
                        </div>
                    )}

                    {/* Contenu */}
                    {article.contenu && (
                        <div
                            className="prose prose-lg max-w-none text-bleu-nuit/80 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: article.contenu }}
                        />
                    )}

                    {/* Médias */}
                    {(article.medias || []).length > 0 && (
                        <div className="mt-12 pt-8 border-t border-ligne">
                            <h2 className="eyebrow mb-4">Médias associés</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {article.medias.filter(m => m.type === 'photo').map(m => (
                                    <div key={m.id} className="rounded-[12px] overflow-hidden aspect-square bg-azur-pale">
                                        {m.chemin && <img src={`/storage/${m.chemin}`} alt={m.titre} className="w-full h-full object-cover"/>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Back */}
                    <div className="mt-12 pt-8 border-t border-ligne">
                        <Link href="/actualites" className="btn-outline">← Retour aux actualités</Link>
                    </div>
                </div>
            </article>
        </PublicLayout>
    );
}

function formatDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
