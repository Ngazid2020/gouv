import { useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function FicheCommune({ commune, onClose }) {
    useEffect(() => {
        if (!commune) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = e => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [commune, onClose]);

    if (!commune) return null;

    const couleur = commune.couleur || '#08457E';
    const maire = (commune.elus || []).find(e => e.role === 'maire');
    const adjoints = (commune.elus || []).filter(e => e.role === '1er_adjoint' || e.role === '2e_adjoint');

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`Fiche de la commune de ${commune.nom}`}
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(7,26,51,.55)',
                backdropFilter: 'blur(4px)',
                zIndex: 200,
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                padding: '5vh 18px', overflowY: 'auto',
            }}
        >
            {/* .modal */}
            <div style={{
                background: '#fff', borderRadius: '24px',
                maxWidth: '760px', width: '100%', overflow: 'hidden',
                boxShadow: '0 40px 90px -30px rgba(0,0,0,.5)',
            }}>

                {/* .modal-hd */}
                <div style={{
                    background: 'linear-gradient(135deg,#08457E,#0a3360)',
                    color: '#fff', padding: '26px 28px', position: 'relative',
                }}>
                    <button
                        onClick={onClose}
                        aria-label="Fermer"
                        style={{
                            position: 'absolute', top: '18px', right: '20px',
                            fontSize: '1.4rem', color: '#cfe0f2', lineHeight: 1,
                            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                        }}
                    >✕</button>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                        {commune.prefecture && <Pill>{commune.prefecture}</Pill>}
                        {commune.est_chef_lieu && <Pill>Chef-lieu</Pill>}
                        <Pill>Ngazidja</Pill>
                    </div>

                    <h3 style={{
                        fontFamily: 'Fraunces, serif', fontSize: '1.9rem', fontWeight: 600, margin: 0,
                    }}>{commune.nom}</h3>
                </div>

                {/* .modal-bd */}
                <div style={{ padding: '26px 28px' }}>

                    {/* .maire-row */}
                    {maire && (
                        <div style={{
                            display: 'flex', gap: '16px', alignItems: 'center',
                            paddingBottom: '20px', borderBottom: '1px solid #E2E9F1', marginBottom: '20px',
                        }}>
                            <Avatar couleur={couleur} size={64} radius={14} fontSize="1.3rem">
                                {initials(maire.nom)}
                            </Avatar>
                            <div>
                                <div style={{
                                    fontFamily: 'Archivo, sans-serif', fontSize: '.66rem',
                                    letterSpacing: '.1em', textTransform: 'uppercase', color: '#C8A24A',
                                }}>Maire de la commune</div>
                                <div style={{
                                    fontFamily: 'Fraunces, serif', fontWeight: 600,
                                    fontSize: '1.2rem', color: '#08457E',
                                }}>{maire.nom}</div>
                            </div>
                        </div>
                    )}

                    {/* .stat-grid */}
                    {(commune.population || commune.foyers || commune.nb_conseillers || commune.nb_villages) && (
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
                            gap: '12px', marginBottom: '22px',
                        }}>
                            {commune.population != null && (
                                <StatBox label="Habitants">{fmt(commune.population)}</StatBox>
                            )}
                            {commune.foyers != null && (
                                <StatBox label="Foyers">{fmt(commune.foyers)}</StatBox>
                            )}
                            {commune.nb_conseillers != null && (
                                <StatBox label="Conseillers">{commune.nb_conseillers}</StatBox>
                            )}
                            {commune.nb_villages != null && (
                                <StatBox label="Localités">{commune.nb_villages}</StatBox>
                            )}
                        </div>
                    )}

                    {/* .adj-list */}
                    {(adjoints.length > 0 || commune.nb_conseillers) && (
                        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '22px' }}>
                            {adjoints.map(a => (
                                <AdjointCard key={a.id} couleur={couleur} nom={a.nom} role={roleLabel(a.role)} />
                            ))}
                            {commune.nb_conseillers && (
                                <AdjointCard
                                    couleur="#E8F1FA"
                                    textColor="#14609E"
                                    initiale="CA"
                                    role="Conseil d'administration"
                                    nom={`${commune.nb_conseillers} membres`}
                                />
                            )}
                        </div>
                    )}

                    {/* .two-col atouts + défis */}
                    {(commune.atouts?.length || commune.defis?.length) ? (
                        <div style={{
                            display: 'grid', gridTemplateColumns: '1fr 1fr',
                            gap: '18px', marginBottom: '22px',
                        }}>
                            {commune.atouts?.length > 0 && (
                                <MiniList title="Atouts de la région" bullet="▲" bulletColor="#1F7A5C" items={commune.atouts} />
                            )}
                            {commune.defis?.length > 0 && (
                                <MiniList title="Défis" bullet="●" bulletColor="#C8A24A" items={commune.defis} />
                            )}
                        </div>
                    ) : null}

                    {/* Gouvernance */}
                    {commune.gouvernance && (
                        <div>
                            <MiniTitle>Gouvernance &amp; gestion</MiniTitle>
                            <p style={{ fontSize: '.9rem', color: '#5B6B7E', margin: 0 }}>{commune.gouvernance}</p>
                        </div>
                    )}
                </div>

                {/* .modal-ft */}
                <div style={{
                    display: 'flex', gap: '12px', flexWrap: 'wrap',
                    padding: '20px 28px', borderTop: '1px solid #E2E9F1', background: '#fafcfe',
                }}>
                    <Link
                        href={`/communes/${commune.slug}`}
                        onClick={onClose}
                        style={btnOr}
                    >
                        Consulter les articles de la commune →
                    </Link>
                    <button onClick={onClose} style={btnGhost}>Fermer</button>
                </div>
            </div>
        </div>
    );
}

/* ── sous-composants ─────────────────────────────────────── */

function Pill({ children }) {
    return (
        <span style={{
            fontFamily: 'Archivo, sans-serif', fontSize: '.64rem',
            letterSpacing: '.1em', textTransform: 'uppercase',
            background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.2)',
            padding: '3px 9px', borderRadius: '999px',
        }}>{children}</span>
    );
}

function Avatar({ couleur, size, radius, fontSize, textColor, children }) {
    return (
        <div style={{
            width: size, height: size, borderRadius: radius, flex: 'none',
            display: 'grid', placeItems: 'center',
            background: couleur, color: textColor || '#fff',
            fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize,
            boxShadow: '0 2px 12px rgba(7,26,51,.08)',
        }}>{children}</div>
    );
}

function AdjointCard({ couleur, textColor, initiale, nom, role }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <Avatar couleur={couleur} size={38} radius={10} fontSize=".85rem" textColor={textColor}>
                {initiale || initials(nom)}
            </Avatar>
            <div>
                <small style={{
                    fontFamily: 'Archivo, sans-serif', fontSize: '.58rem',
                    letterSpacing: '.06em', textTransform: 'uppercase',
                    color: '#5B6B7E', display: 'block',
                }}>{role}</small>
                <b style={{ fontSize: '.84rem', color: '#071A33' }}>{nom}</b>
            </div>
        </div>
    );
}

function MiniTitle({ children }) {
    return (
        <h5 style={{
            fontFamily: 'Archivo, sans-serif', fontSize: '.7rem',
            letterSpacing: '.1em', textTransform: 'uppercase',
            color: '#14609E', marginBottom: '8px', marginTop: 0,
        }}>{children}</h5>
    );
}

function MiniList({ title, bullet, bulletColor, items }) {
    return (
        <div>
            <MiniTitle>{title}</MiniTitle>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {items.map((item, i) => (
                    <li key={i} style={{
                        fontSize: '.9rem', padding: '4px 0 4px 18px',
                        position: 'relative', color: '#071A33',
                    }}>
                        <span style={{
                            position: 'absolute', left: 0, top: '7px',
                            color: bulletColor,
                            fontSize: bullet === '▲' ? '.6rem' : '.55rem',
                        }}>{bullet}</span>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function StatBox({ label, children }) {
    return (
        <div style={{
            background: '#E8F1FA', borderRadius: '12px',
            padding: '12px', textAlign: 'center',
        }}>
            <b style={{
                fontFamily: 'Fraunces, serif', fontSize: '1.35rem',
                color: '#08457E', display: 'block', fontWeight: 600,
            }}>{children}</b>
            <small style={{
                fontFamily: 'Archivo, sans-serif', fontSize: '.6rem',
                letterSpacing: '.06em', textTransform: 'uppercase', color: '#5B6B7E',
            }}>{label}</small>
        </div>
    );
}

/* ── helpers ─────────────────────────────────────────────── */

function initials(nom) {
    if (!nom) return '?';
    return nom.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

function fmt(n) {
    return Number(n).toLocaleString('fr-FR');
}

function roleLabel(role) {
    const map = {
        'maire': 'Maire',
        '1er_adjoint': '1er Adjoint au maire',
        '2e_adjoint': '2e Adjoint au maire',
        'conseiller': 'Conseiller municipal',
    };
    return map[role] || role;
}

/* ── styles boutons ──────────────────────────────────────── */

const btnBase = {
    fontFamily: 'Archivo, sans-serif', fontSize: '.82rem',
    letterSpacing: '.03em', padding: '.6rem 1.3rem',
    borderRadius: '999px', fontWeight: 600, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: '.5rem',
    textDecoration: 'none', transition: 'background .2s, transform .2s',
};

const btnOr = { ...btnBase, background: '#C8A24A', color: '#fff', border: 'none' };

const btnGhost = {
    ...btnBase, background: 'transparent',
    border: '1.5px solid #D6E0EA', color: '#071A33',
};
