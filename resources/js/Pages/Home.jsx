import { Link } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import CarteNgazidja from '@/Components/CarteNgazidja';
import FicheCommune from '@/Components/FicheCommune';
import SeoHead from '@/Components/SeoHead';

const ICO_ARROW = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
        <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
);
const ICO_PIN = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>
    </svg>
);

export default function Home({ citation, communes, prefectures, actualites, evenements }) {
    const [ficheCommune, setFicheCommune] = useState(null);
    const [activePrefId, setActivePrefId] = useState(prefectures?.[3]?.id || prefectures?.[0]?.id || null);

    const activePref = prefectures?.find(p => p.id === activePrefId) || prefectures?.[0];
    const communesDePref = communes?.filter(c => c.prefecture === activePref?.nom) || [];

    return (
        <PublicLayout>
            <SeoHead
                title="Gouvernorat de l'Île Autonome de Ngazidja"
                description="Portail institutionnel du Gouvernorat de Ngazidja. Communes, actualités, cabinet et agenda de l'île autonome de Grande Comore."
            />

            {/* ===== HÉRO ===== */}
            <section className="relative overflow-hidden text-white" style={{ background: 'radial-gradient(120% 90% at 80% -10%, #16518f 0%, #08457E 45%, #072647 100%)', padding: 0 }}>
                <svg className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    {[...Array(60)].map((_, i) => (
                        <circle key={i} cx={(i * 137.5 + 40) % 1200} cy={(i * 97.3 + 30) % 600} r={i % 3 === 0 ? 1.4 : 0.8} fill="#fff" opacity={0.2 + (i % 5) * 0.1}/>
                    ))}
                    <path d="M1050 90 a55 55 0 1 1 -22-44 a42 42 0 1 0 22 44Z" fill="#ffffff" opacity=".06"/>
                </svg>

                <div className="wrap relative z-10" style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: '40px', alignItems: 'center', padding: '64px 22px 70px', minHeight: '560px' }}>
                    {/* Gauche */}
                    <div>
                        <span className="inline-flex items-center gap-2 mb-6" style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.22)', padding: '.38rem .9rem', borderRadius: '999px', fontSize: '.76rem', fontFamily: 'Archivo, sans-serif', letterSpacing: '.12em', textTransform: 'uppercase' }}>
                            {ICO_PIN} Île Autonome de Ngazidja · Grande Comore
                        </span>
                        <h1 className="font-serif" style={{ fontSize: 'clamp(2.3rem, 5.2vw, 4rem)', fontWeight: 600, letterSpacing: '-.02em', marginBottom: '1.1rem', lineHeight: 1.12 }}>
                            Le portail officiel du{' '}
                            <em style={{ fontStyle: 'italic', color: '#E3C878' }}>Gouvernorat</em>
                            {' '}de Ngazidja
                        </h1>
                        <p style={{ fontSize: '1.12rem', color: '#d4e3f4', maxWidth: '520px', marginBottom: '2rem' }}>
                            Institution, proximité et modernité au service des huit préfectures et des vingt-huit communes de l'île. Une fenêtre numérique sur l'action publique.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <Link href="/communes" className="inline-flex items-center gap-2 font-semibold text-[.92rem] px-5 py-3 rounded-full transition-all" style={{ background: 'linear-gradient(135deg, #C8A24A, #E3C878)', color: '#3a2c06', boxShadow: '0 10px 24px -12px rgba(200,162,74,.8)' }}>
                                Explorer les communes {ICO_ARROW}
                            </Link>
                            <Link href="/gouverneur" className="inline-flex items-center gap-2 font-semibold text-[.92rem] px-5 py-3 rounded-full transition-all" style={{ border: '1.5px solid rgba(255,255,255,.4)', color: '#fff', background: 'transparent' }}>
                                Le Gouverneur
                            </Link>
                        </div>
                        <div className="flex gap-8 flex-wrap mt-10">
                            {[['8','Préfectures'],['28','Communes'],['~520 000','Habitants'],['1 148 km²','Superficie']].map(([n,l]) => (
                                <div key={l}>
                                    <span className="font-serif block" style={{ fontSize: '1.9rem', fontWeight: 600 }}>{n}</span>
                                    <small className="font-label uppercase tracking-wider text-[.66rem]" style={{ color: '#9fc0e0' }}>{l}</small>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Droite — gov-card */}
                    <div style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.16)', borderRadius: '24px', padding: '18px', backdropFilter: 'blur(6px)', boxShadow: '0 30px 70px -30px rgba(0,0,0,.6)' }}>
                        {/* Photo placeholder */}
                        <div style={{ aspectRatio: '4/4.4', borderRadius: '16px', overflow: 'hidden', background: 'linear-gradient(160deg, #0d4a86, #0a3360)', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'end center', paddingBottom: '24px' }}>
                                <svg viewBox="0 0 120 160" width="90" opacity="0.2">
                                    <ellipse cx="60" cy="45" rx="32" ry="35" fill="#cfe0f2"/>
                                    <path d="M5 160 Q5 100 60 100 Q115 100 115 160Z" fill="#cfe0f2"/>
                                </svg>
                            </div>
                            <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(7,26,51,.55)', color: '#cfe0f2', fontSize: '.62rem', fontFamily: 'Archivo, sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '6px', backdropFilter: 'blur(4px)' }}>
                                Portrait officiel
                            </span>
                        </div>
                        {/* Meta */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '14px', padding: '4px 6px' }}>
                            <div style={{ width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, #C8A24A, #E3C878)', color: '#3a2c06', fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: '1rem' }}>
                                IM
                            </div>
                            <div>
                                <div className="font-serif font-semibold text-white" style={{ fontSize: '1.05rem' }}>Ibrahim Mze Mohamed</div>
                                <div className="font-label uppercase tracking-wider" style={{ fontSize: '.74rem', color: '#a9c6e3' }}>Gouverneur de l'île de Ngazidja</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== MOT DU GOUVERNEUR ===== */}
            <section className="py-20">
                <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: '50px', alignItems: 'center' }}>
                    {/* Photo */}
                    <div style={{ aspectRatio: '5/4', borderRadius: '18px', overflow: 'hidden', background: 'linear-gradient(160deg, #0d4a86, #0a3360)', position: 'relative', display: 'grid', placeItems: 'end center', paddingBottom: '20px' }}>
                        <svg viewBox="0 0 120 160" width="120" opacity="0.2">
                            <ellipse cx="60" cy="45" rx="32" ry="35" fill="#cfe0f2"/>
                            <path d="M5 160 Q5 100 60 100 Q115 100 115 160Z" fill="#cfe0f2"/>
                        </svg>
                    </div>
                    {/* Citation */}
                    <div>
                        <p className="eyebrow">Le mot du Gouverneur</p>
                        <blockquote className="font-serif relative pl-8" style={{ fontSize: 'clamp(1.3rem, 2.6vw, 1.9rem)', color: '#08457E', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.4 }}>
                            <span className="absolute font-serif" style={{ left: '-6px', top: '-14px', fontSize: '4rem', color: '#E3C878', lineHeight: 1 }}>"</span>
                            {citation || 'Ngazidja avance lorsque ses communes avancent. Ce portail est notre engagement de transparence, de proximité et de modernité au service de chaque habitant de l\'île.'}
                        </blockquote>
                        <p className="font-label mt-6" style={{ letterSpacing: '.04em', color: '#5B6B7E', fontSize: '.86rem' }}>
                            — {citation ? 'Le Gouverneur' : 'Texte d\'illustration à valider · Cabinet du Gouverneur'}
                        </p>
                        <Link href="/gouverneur" className="inline-flex items-center gap-2 font-semibold text-[.92rem] px-5 py-3 rounded-full mt-6 transition-all" style={{ background: '#08457E', color: '#fff' }}>
                            Lire la vision du Gouverneur {ICO_ARROW}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== CARTE INTERACTIVE ===== */}
            <section style={{ background: 'linear-gradient(180deg, #fff, #f3f8fd)' }}>
                <div className="wrap py-20">
                    <div className="mb-10">
                        <p className="eyebrow">Carte interactive</p>
                        <h2 className="font-serif text-bleu-ng" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', marginBottom: '.4rem' }}>L'île, ses préfectures et ses communes</h2>
                        <p className="text-gris" style={{ fontSize: '1.04rem' }}>Cliquez sur une préfecture pour afficher ses communes, puis ouvrez la fiche d'une commune.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '34px', alignItems: 'stretch' }}>
                        {/* Panneau carte */}
                        <div style={{ background: 'linear-gradient(180deg, #0a3a6e 0%, #06203f 100%)', borderRadius: '24px', padding: '18px', position: 'relative', overflow: 'hidden', boxShadow: '0 18px 50px -22px rgba(7,26,51,.35)' }}>
                            <span className="absolute font-label uppercase tracking-wider" style={{ top: '16px', left: '18px', color: '#bcd4ef', fontSize: '.68rem', letterSpacing: '.1em', zIndex: 3 }}>
                                Karthala 2 361 m · 8 préfectures
                            </span>
                            <CarteNgazidja
                                communes={communes}
                                prefectures={prefectures}
                                onSelect={setFicheCommune}
                                onHoverPref={id => id && setActivePrefId(id)}
                            />
                        </div>

                        {/* Panneau blocs */}
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                                <h3 className="font-serif text-bleu-ng" style={{ fontSize: '1.5rem' }}>
                                    {activePref ? `Préfecture de ${activePref.nom}` : 'Sélectionnez une préfecture'}
                                </h3>
                                {activePref && (
                                    <span className="inline-flex items-center gap-2 font-label uppercase tracking-wider text-white text-[.74rem] px-3 py-1.5 rounded-full" style={{ background: '#14609E' }}>
                                        <i className="block w-2.5 h-2.5 rounded-full" style={{ background: '#E3C878' }}/>
                                        Chef-lieu : {activePref.chef_lieu || activePref.nom.split('–')[0]}
                                    </span>
                                )}
                            </div>

                            {/* Préfecture selector buttons */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {(prefectures || []).map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => setActivePrefId(p.id)}
                                        className="font-label text-[.68rem] uppercase tracking-wider px-2.5 py-1 rounded-full transition-colors"
                                        style={activePrefId === p.id
                                            ? { background: p.couleur, color: '#fff' }
                                            : { background: '#E8F1FA', color: '#5B6B7E' }
                                        }
                                    >
                                        {p.nom.split('–')[0].trim()}
                                    </button>
                                ))}
                            </div>

                            {/* Commune blocs */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', flex: 1 }}>
                                {communesDePref.length > 0 ? communesDePref.map(c => (
                                    <button
                                        key={c.slug}
                                        onClick={() => setFicheCommune(c)}
                                        className="text-left relative overflow-hidden transition-all hover:-translate-y-0.5"
                                        style={{ background: '#fff', border: '1px solid #E2E9F1', borderRadius: '12px', padding: '14px', cursor: 'pointer' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#2E8FD6'; e.currentTarget.style.boxShadow = '0 8px 24px -12px rgba(7,26,51,.28)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E9F1'; e.currentTarget.style.boxShadow = 'none'; }}
                                    >
                                        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[12px]" style={{ background: activePref?.couleur || '#2E8FD6' }}/>
                                        <p className="font-serif font-semibold text-bleu-ng pl-2" style={{ fontSize: '1.02rem', marginBottom: '2px' }}>{c.nom}</p>
                                        <p className="text-gris pl-2" style={{ fontSize: '.78rem' }}>Voir la fiche</p>
                                    </button>
                                )) : (
                                    <p className="col-span-2 text-gris text-sm p-4">Sélectionnez une préfecture sur la carte.</p>
                                )}
                            </div>
                            <p className="text-gris mt-4" style={{ fontSize: '.82rem' }}>Survolez la carte ou choisissez une préfecture. Chaque commune dispose de sa propre fiche.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== MUNICIPALITÉS (aperçu 8 communes) ===== */}
            <section className="py-20">
                <div className="wrap">
                    <div className="flex items-end justify-between mb-10" style={{ maxWidth: 'none' }}>
                        <div>
                            <p className="eyebrow">Municipalités</p>
                            <h2 className="font-serif text-bleu-ng" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.7rem)' }}>Les communes de Ngazidja</h2>
                        </div>
                        <Link href="/communes" className="inline-flex items-center gap-2 font-semibold text-[.92rem] px-5 py-3 rounded-full transition-all border border-gris-clair text-bleu-ng hover:border-azur hover:text-azur">
                            Voir les 28 communes {ICO_ARROW}
                        </Link>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '18px' }}>
                        {(communes || []).slice(0, 8).map(c => (
                            <MuniCard key={c.slug} commune={c} onClick={() => setFicheCommune(c)}/>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ACTUALITÉS ===== */}
            <section className="py-20" style={{ background: '#f3f8fd' }}>
                <div className="wrap">
                    <div className="mb-10">
                        <p className="eyebrow">Actualités</p>
                        <h2 className="font-serif text-bleu-ng" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', marginBottom: '.4rem' }}>L'action du Gouverneur</h2>
                        <p className="text-gris" style={{ fontSize: '1.04rem' }}>Articles, reportages photo, vidéos et infographies sur les activités et réalisations du Gouvernorat.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '22px' }}>
                        {(actualites || []).length > 0 && <FeaturedArticle article={actualites[0]}/>}
                        {(actualites || []).slice(1).map(a => <ArtCard key={a.id} article={a}/>)}
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/actualites" className="inline-flex items-center gap-2 font-semibold text-[.92rem] px-5 py-3 rounded-full transition-all" style={{ background: '#14609E', color: '#fff' }}>
                            Toutes les actualités {ICO_ARROW}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== AGENDA + MÉDIATHÈQUE ===== */}
            <section className="py-20">
                <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                    {/* Agenda */}
                    <div>
                        <p className="eyebrow">Agenda</p>
                        <h2 className="font-serif text-bleu-ng" style={{ fontSize: '1.9rem', marginBottom: '1rem' }}>Prochains rendez-vous</h2>
                        <div>
                            {(evenements || []).slice(0, 3).map(e => {
                                const d = new Date(e.date);
                                return (
                                    <div key={e.id} style={{ display: 'grid', gridTemplateColumns: '84px 1fr', gap: '24px', padding: '22px 0', borderBottom: '1px solid #E2E9F1' }}>
                                        <div className="text-right">
                                            <span className="font-serif block text-bleu-ng font-semibold" style={{ fontSize: '1.7rem', lineHeight: 1 }}>{d.getDate()}</span>
                                            <small className="font-label uppercase tracking-wider text-gris" style={{ fontSize: '.66rem' }}>{d.toLocaleDateString('fr-FR', { month: 'short' })}</small>
                                        </div>
                                        <div className="pl-7 border-l-2 border-azur-pale relative">
                                            <span className="absolute bg-or rounded-full border-[3px] border-white" style={{ left: '-7px', top: '4px', width: '12px', height: '12px', boxShadow: '0 0 0 2px #E3C878' }}/>
                                            <h4 className="font-serif text-bleu-ng" style={{ fontSize: '1.15rem', marginBottom: '3px' }}>{e.titre}</h4>
                                            {e.lieu && (
                                                <div className="flex items-center gap-1.5 text-gris" style={{ fontSize: '.84rem' }}>
                                                    {ICO_PIN} {e.lieu}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <Link href="/agenda" className="inline-flex items-center gap-2 font-semibold text-[.92rem] px-5 py-3 rounded-full transition-all mt-5 border border-gris-clair text-bleu-ng hover:border-azur hover:text-azur">
                            Agenda complet {ICO_ARROW}
                        </Link>
                    </div>

                    {/* Médiathèque teaser */}
                    <div>
                        <p className="eyebrow">Médiathèque</p>
                        <h2 className="font-serif text-bleu-ng" style={{ fontSize: '1.9rem', marginBottom: '1rem' }}>Discours & mémoire</h2>
                        <div className="relative overflow-hidden rounded-[18px] mb-4" style={{ background: 'linear-gradient(150deg, #0b3d74, #082a52)', padding: '26px' }}>
                            <span className="absolute font-serif" style={{ top: '8px', right: '18px', fontSize: '3.4rem', color: 'rgba(227,200,120,.4)', lineHeight: 1 }}>"</span>
                            <p className="font-serif italic relative z-10" style={{ fontSize: '1.12rem', fontWeight: 500, color: '#fff' }}>
                                {citation || 'Extrait de discours marquant du Gouverneur — à intégrer depuis les archives officielles.'}
                            </p>
                            <small className="block mt-4 font-label uppercase tracking-wider" style={{ fontSize: '.64rem', color: '#9fc0e0' }}>Médiathèque · Citations</small>
                        </div>
                        <Link href="/mediatheque" className="inline-flex items-center gap-2 font-semibold text-[.92rem] px-5 py-3 rounded-full transition-all" style={{ background: '#14609E', color: '#fff' }}>
                            Discours, citations & galerie {ICO_ARROW}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Modale commune */}
            {ficheCommune && <FicheCommune commune={ficheCommune} onClose={() => setFicheCommune(null)}/>}
        </PublicLayout>
    );
}

function MuniCard({ commune: c, onClick }) {
    return (
        <div
            onClick={onClick}
            className="rounded-[18px] overflow-hidden cursor-pointer transition-all hover:-translate-y-1"
            style={{ background: '#fff', border: '1px solid #E2E9F1' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 18px 50px -22px rgba(7,26,51,.35)'; e.currentTarget.style.borderColor = 'transparent'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#E2E9F1'; }}
        >
            <div className="h-[88px] flex items-end p-3" style={{ background: `linear-gradient(135deg, ${c.couleur || '#14609E'}, #0a2f59)` }}>
                <span className="font-label uppercase tracking-wider text-white text-[.58rem] px-2 py-1 rounded" style={{ background: 'rgba(7,26,51,.35)', backdropFilter: 'blur(3px)' }}>
                    {c.prefecture || ''}
                </span>
            </div>
            <div className="p-4">
                <h4 className="font-serif text-bleu-ng" style={{ fontSize: '1.2rem', marginBottom: '3px' }}>{c.nom}</h4>
                <div className="flex items-center gap-1.5 text-gris" style={{ fontSize: '.8rem' }}>
                    {ICO_PIN} Commune de Ngazidja
                </div>
                <span className="mt-3 font-label uppercase tracking-wider text-azur font-semibold flex items-center gap-1.5" style={{ fontSize: '.72rem' }}>
                    Page de la commune {ICO_ARROW}
                </span>
            </div>
        </div>
    );
}

function FeaturedArticle({ article: a }) {
    const kindColors = { video: { bg: '#fdeceb', color: '#c0392b' }, photo: { bg: '#e7f1fb', color: '#14609E' }, info: { bg: '#eaf6f0', color: '#1F7A5C' } };
    const k = kindColors[a.type] || { bg: '#e7f1fb', color: '#14609E' };
    return (
        <Link href={`/actualites/${a.slug}`} className="block rounded-[18px] overflow-hidden border border-ligne bg-white transition-all hover:shadow-md cursor-pointer" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1.15fr 1fr' }}>
            <div className="min-h-[300px] relative" style={{ background: 'linear-gradient(135deg, #1d6e8c, #0a3a5a)', display: 'grid', placeItems: 'center' }}>
                <svg className="w-12 h-12 text-white/70" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="11" opacity=".25"/><path d="M10 8l6 4-6 4Z"/></svg>
                <span className="absolute bottom-3 left-3 font-label uppercase tracking-wider text-[.6rem]" style={{ color: 'rgba(255,255,255,.8)' }}>Vidéo / Reportage à intégrer</span>
            </div>
            <div className="p-9 flex flex-col justify-center">
                <div className="flex items-center gap-2.5 mb-2">
                    <span className="font-label text-[.62rem] uppercase tracking-wider font-semibold px-2 py-0.5 rounded" style={{ background: k.bg, color: k.color }}>À la une</span>
                    <span className="text-gris text-xs">{a.categorie} · {formatDate(a.date_publication)}</span>
                </div>
                <h3 className="font-serif text-bleu-ng mb-3" style={{ fontSize: '1.7rem' }}>{a.titre}</h3>
                <p className="text-gris" style={{ fontSize: '.95rem' }}>{a.extrait}</p>
                <div className="mt-5">
                    <span className="inline-flex items-center gap-2 font-semibold text-[.92rem] px-5 py-3 rounded-full" style={{ background: 'linear-gradient(135deg, #C8A24A, #E3C878)', color: '#3a2c06' }}>
                        Lire l'article {ICO_ARROW}
                    </span>
                </div>
            </div>
        </Link>
    );
}

function ArtCard({ article: a }) {
    const kindColors = { video: { bg: '#fdeceb', color: '#c0392b' }, photo: { bg: '#e7f1fb', color: '#14609E' }, info: { bg: '#eaf6f0', color: '#1F7A5C' } };
    const k = kindColors[a.type] || { bg: '#e7f1fb', color: '#14609E' };
    return (
        <Link href={`/actualites/${a.slug}`} className="block rounded-[18px] overflow-hidden border border-ligne bg-white transition-all hover:-translate-y-1 cursor-pointer" onMouseEnter={e => e.currentTarget.style.boxShadow='0 18px 50px -22px rgba(7,26,51,.35)'} onMouseLeave={e => e.currentTarget.style.boxShadow='none'}>
            <div className="h-40 relative" style={{ background: 'linear-gradient(135deg, #0c4a86, #0a2f59)', display: 'grid', placeItems: 'center' }}>
                <svg className="w-10 h-10 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7l2-3h4l2 3"/><circle cx="12" cy="13" r="3.5"/></svg>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2.5 mb-2">
                    <span className="font-label text-[.62rem] uppercase tracking-wider font-semibold px-2 py-0.5 rounded" style={{ background: k.bg, color: k.color }}>{a.type}</span>
                    <span className="text-gris text-xs">{a.categorie}</span>
                </div>
                <h4 className="font-serif text-bleu-ng mb-2" style={{ fontSize: '1.12rem', lineHeight: 1.2 }}>{a.titre}</h4>
                <p className="text-gris flex-1" style={{ fontSize: '.86rem' }}>{a.extrait}</p>
                <div className="flex items-center gap-2 mt-3 font-label uppercase tracking-wider text-gris" style={{ fontSize: '.66rem' }}>
                    {formatDate(a.date_publication)}
                </div>
            </div>
        </Link>
    );
}

function formatDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
