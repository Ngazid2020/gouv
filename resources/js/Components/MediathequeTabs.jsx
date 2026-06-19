import { useState } from 'react';

/* ── Icônes ─────────────────────────────────────────────────── */

const ICO_PLAY = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="11" opacity=".25"/>
        <path d="M10 8l6 4-6 4Z"/>
    </svg>
);

const ICO_CAM = (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(255,255,255,.75)' }}>
        <rect x="3" y="7" width="18" height="13" rx="2"/>
        <path d="M8 7l2-3h4l2 3"/>
        <circle cx="12" cy="13" r="3.5"/>
    </svg>
);

const ICO_PLAY_BIG = (
    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7Z"/></svg>
    </div>
);

const ICO_DOC = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
    </svg>
);

/* ── Configuration des onglets (ordre maquette) ─────────────── */

const TABS = [
    { key: 'discours', label: 'Discours' },
    { key: 'citation', label: 'Citations' },
    { key: 'galerie',  label: 'Galerie'   },
    { key: 'document', label: 'Documents' },
];

const GRAD_VARIANTS = [
    'linear-gradient(135deg,#0c4a86,#0a2f59)',
    'linear-gradient(135deg,#1d6e8c,#0a3a5a)',
    'linear-gradient(135deg,#1f7a5c,#0c4a40)',
];

/* ── Composant principal ────────────────────────────────────── */

export default function MediathequeTabs({ medias }) {
    const [actif, setActif] = useState('discours');

    const items = medias?.[actif] || [];

    return (
        <div>
            {/* Animation CSS */}
            <style>{`
                @keyframes mediafade {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: none; }
                }
            `}</style>

            {/* ── Onglets underline (maquette exacte) ── */}
            <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid #E2E9F1', marginBottom: '30px', flexWrap: 'wrap' }}>
                {TABS.map(t => {
                    const count = (medias?.[t.key] || []).length;
                    const on = actif === t.key;
                    return (
                        <button
                            key={t.key}
                            onClick={() => setActif(t.key)}
                            style={{
                                fontFamily: 'Archivo, sans-serif',
                                fontSize: '.8rem',
                                letterSpacing: '.04em',
                                textTransform: 'uppercase',
                                padding: '.7rem 1rem',
                                color: on ? '#08457E' : '#5B6B7E',
                                borderBottom: on ? '2.5px solid #C8A24A' : '2.5px solid transparent',
                                marginBottom: '-1px',
                                fontWeight: 600,
                                background: 'none',
                                border: 'none',
                                borderBottomStyle: 'solid',
                                borderBottomWidth: '2.5px',
                                borderBottomColor: on ? '#C8A24A' : 'transparent',
                                cursor: 'pointer',
                                transition: 'color .2s, border-color .2s',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {t.label}
                            {count > 0 && (
                                <span style={{ marginLeft: '6px', fontSize: '.7rem', opacity: .6 }}>({count})</span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* ── Contenu de l'onglet actif (avec animation) ── */}
            <div key={actif} style={{ animation: 'mediafade .4s' }}>
                {actif === 'discours' && <DiscoursPane items={items} />}
                {actif === 'citation' && <CitationsPane items={items} />}
                {actif === 'galerie'  && <GaleriePane  items={items} />}
                {actif === 'document' && <DocumentsPane items={items} />}
            </div>
        </div>
    );
}

/* ── DISCOURS ────────────────────────────────────────────────── */

function DiscoursPane({ items }) {
    if (!items.length) return <Vide />;
    return (
        <div style={{ display: 'grid', gap: '14px' }}>
            {items.map(m => <DiscoursCard key={m.id} media={m} />)}
        </div>
    );
}

function DiscoursCard({ media: m }) {
    const date = m.created_at ? new Date(m.created_at) : null;
    const jour  = date ? String(date.getDate()).padStart(2, '0') : '—';
    const mois  = date ? date.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase() : '';

    const handleClick = () => {
        const url = m.url || (m.chemin ? `/storage/${m.chemin}` : null);
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            onClick={handleClick}
            style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '18px',
                alignItems: 'center',
                background: '#fff',
                border: '1px solid #E2E9F1',
                borderRadius: '12px',
                padding: '16px 18px',
                cursor: 'pointer',
                transition: 'border-color .2s, box-shadow .2s',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#2E8FD6';
                e.currentTarget.style.boxShadow = '0 8px 24px -12px rgba(7,26,51,.28)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E2E9F1';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Date */}
            <div style={{ textAlign: 'center', lineHeight: 1, minWidth: '48px' }}>
                <b style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', display: 'block', fontWeight: 600, color: '#08457E' }}>{jour}</b>
                <small style={{ fontFamily: 'Archivo, sans-serif', fontSize: '.6rem', textTransform: 'uppercase', letterSpacing: '.08em', color: '#5B6B7E' }}>{mois}</small>
            </div>

            {/* Titre + description */}
            <div>
                <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.08rem', color: '#08457E', marginBottom: '3px' }}>{m.titre}</h4>
                <p style={{ fontSize: '.82rem', color: '#5B6B7E', margin: 0 }}>
                    Discours officiel · {m.url ? 'format vidéo disponible' : 'transcription à intégrer'}
                </p>
            </div>

            {/* Durée / bouton */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'Archivo, sans-serif',
                fontSize: '.66rem',
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                color: '#2E8FD6',
                whiteSpace: 'nowrap',
            }}>
                {ICO_PLAY} Lire
            </div>
        </div>
    );
}

/* ── CITATIONS ───────────────────────────────────────────────── */

function CitationsPane({ items }) {
    if (!items.length) return <Vide />;
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
            {items.map(m => <QuoteCard key={m.id} media={m} />)}
        </div>
    );
}

function QuoteCard({ media: m }) {
    return (
        <div style={{
            background: 'linear-gradient(150deg,#0b3d74,#082a52)',
            color: '#fff',
            borderRadius: '18px',
            padding: '26px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <span style={{
                fontFamily: 'Fraunces, serif',
                fontSize: '3.4rem',
                color: 'rgba(227,200,120,.4)',
                position: 'absolute',
                top: '8px',
                right: '18px',
                lineHeight: 1,
            }}>"</span>
            <p style={{
                fontFamily: 'Fraunces, serif',
                fontStyle: 'italic',
                fontSize: '1.12rem',
                fontWeight: 500,
                position: 'relative',
                zIndex: 1,
                margin: 0,
            }}>
                {m.titre}
            </p>
            <small style={{
                display: 'block',
                marginTop: '14px',
                fontFamily: 'Archivo, sans-serif',
                fontSize: '.64rem',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: '#9fc0e0',
            }}>
                Médiathèque · Citation officielle
            </small>
        </div>
    );
}

/* ── GALERIE ─────────────────────────────────────────────────── */

function GaleriePane({ items }) {
    if (!items.length) return <Vide />;
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
            {items.map((m, i) => <GalerieCard key={m.id} media={m} index={i} />)}
        </div>
    );
}

function GalerieCard({ media: m, index }) {
    const [expanded, setExpanded] = useState(false);
    const embedUrl = getEmbedUrl(m.url);
    const isVideo  = !!m.url;
    const bg       = GRAD_VARIANTS[index % 3];

    if (expanded && embedUrl) {
        return (
            <div
                style={{
                    gridColumn: 'span 2',
                    gridRow: 'span 2',
                    aspectRatio: '4/3',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                }}
                onClick={() => setExpanded(false)}
            >
                <iframe
                    src={embedUrl}
                    title={m.titre}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                />
            </div>
        );
    }

    return (
        <div
            onClick={() => {
                if (embedUrl) setExpanded(true);
                else if (m.url) window.open(m.url, '_blank', 'noopener,noreferrer');
            }}
            style={{
                aspectRatio: '1/1',
                borderRadius: '12px',
                overflow: 'hidden',
                background: bg,
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
            {/* Image ou icône */}
            {m.chemin ? (
                <img
                    src={`/storage/${m.chemin}`}
                    alt={m.titre || ''}
                    loading="lazy"
                    decoding="async"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                    {isVideo ? ICO_PLAY_BIG : ICO_CAM}
                </div>
            )}

            {/* Label bas gauche */}
            <span style={{
                position: 'absolute',
                bottom: '10px',
                left: '12px',
                fontFamily: 'Archivo, sans-serif',
                fontSize: '.6rem',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,.8)',
                zIndex: 1,
            }}>
                {m.titre || (isVideo ? 'Vidéo' : 'Photo à intégrer')}
            </span>

            {/* Trame de points (maquette) */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(255,255,255,.08) 1px,transparent 1px)',
                backgroundSize: '14px 14px',
                opacity: .5,
                pointerEvents: 'none',
            }}/>
        </div>
    );
}

/* ── DOCUMENTS ───────────────────────────────────────────────── */

function DocumentsPane({ items }) {
    if (!items.length) return <Vide />;
    return (
        <div style={{ display: 'grid', gap: '10px' }}>
            {items.map(m => <DocCard key={m.id} media={m} />)}
        </div>
    );
}

function DocCard({ media: m }) {
    const href = m.chemin ? `/storage/${m.chemin}` : (m.url || '#');
    const ext  = m.chemin ? m.chemin.split('.').pop()?.toUpperCase() : 'LIEN';

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: '#fff',
                border: '1px solid #E2E9F1',
                borderRadius: '12px',
                padding: '14px 16px',
                textDecoration: 'none',
                transition: 'border-color .2s, box-shadow .2s',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#2E8FD6';
                e.currentTarget.style.boxShadow = '0 8px 24px -12px rgba(7,26,51,.28)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E2E9F1';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '9px',
                background: '#E8F1FA',
                display: 'grid',
                placeItems: 'center',
                color: '#14609E',
                flexShrink: 0,
            }}>
                {ICO_DOC}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <b style={{ color: '#08457E', fontSize: '.95rem', fontFamily: 'Fraunces, serif' }}>{m.titre}</b>
                <br/>
                <small style={{ color: '#5B6B7E', fontSize: '.74rem', fontFamily: 'Archivo, sans-serif' }}>
                    {ext} · document de démonstration
                </small>
            </div>
        </a>
    );
}

/* ── État vide ───────────────────────────────────────────────── */

function Vide() {
    return (
        <div style={{ padding: '56px 0', textAlign: 'center', color: '#5B6B7E' }}>
            <svg style={{ width: '40px', height: '40px', margin: '0 auto 12px', display: 'block', opacity: .35 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9l4-4 4 4 4-4 4 4"/>
            </svg>
            <p style={{ fontSize: '.9rem' }}>Aucun contenu publié pour le moment.</p>
        </div>
    );
}

/* ── Helper embed ────────────────────────────────────────────── */

function getEmbedUrl(url) {
    if (!url) return null;
    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`;
    const vi = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vi) return `https://player.vimeo.com/video/${vi[1]}?autoplay=1`;
    return null;
}
