import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function CarteNgazidja({ communes, prefectures, onSelect, onHoverPref }) {
    const [hovered, setHovered] = useState(null);

    const prefMap = {};
    (prefectures || []).forEach(p => { prefMap[p.nom] = p; });

    function handleClick(commune) {
        if (onSelect) {
            onSelect(commune);
        } else {
            router.visit(`/communes/${commune.slug}`);
        }
    }

    const karthalaPath = "M214.6,592.2 L214.1,595.7 L215.7,598.4 L216.9,598.9 L221.9,596.2 L227.7,597.8 L230.3,601.0 L231.7,605.4 L228.2,614.2 L223.4,617.6 L222.7,624.0 L220.9,626.7 L213.9,628.9 L209.8,627.9 L208.3,625.3 L202.2,622.4 L200.0,619.1 L199.8,616.7 L201.5,614.7 L199.7,610.2 L200.1,606.9 L202.4,606.3 L203.6,604.1 L201.5,601.5 L201.8,599.8 L197.6,595.6 L196.7,591.7 L201.2,584.1 L205.6,582.6 L211.9,585.6 L214.6,592.2Z";

    return (
        <div className="relative w-full">
            <svg
                viewBox="0 0 448 880.3"
                role="img"
                aria-label="Carte des communes de Ngazidja"
                className="w-full h-auto"
                style={{ maxHeight: '620px' }}
            >
                <defs>
                    <radialGradient id="sea" cx="50%" cy="30%" r="80%">
                        <stop offset="0" stopColor="#0d447e"/>
                        <stop offset="1" stopColor="#06203f"/>
                    </radialGradient>
                    <filter id="commune-glow">
                        <feGaussianBlur stdDeviation="3" result="blur"/>
                        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                    </filter>
                </defs>

                <rect width="448" height="880.3" fill="url(#sea)" rx="20"/>

                {/* Commune paths */}
                {(communes || []).map((c) => {
                    const isHovered = hovered === c.slug;
                    const color = c.couleur || '#888';
                    return (
                        <path
                            key={c.slug}
                            d={c.svg_path}
                            fill={isHovered ? lighten(color, 30) : color}
                            stroke={isHovered ? '#E3C878' : 'rgba(255,255,255,0.25)'}
                            strokeWidth={isHovered ? 1.5 : 0.8}
                            style={{ cursor: 'pointer', transition: 'fill .15s, stroke .15s' }}
                            tabIndex={0}
                            role="button"
                            aria-label={`Commune de ${c.nom}`}
                            onMouseEnter={() => { setHovered(c.slug); onHoverPref && onHoverPref(c.prefecture_id); }}
                            onMouseLeave={() => { setHovered(null); }}
                            onClick={() => handleClick(c)}
                            onKeyDown={e => e.key === 'Enter' && handleClick(c)}
                        />
                    );
                })}

                {/* Karthala volcano */}
                <path
                    d={karthalaPath}
                    fill="#5a2d22"
                    stroke="#e25b3a"
                    strokeWidth="1.2"
                    style={{ pointerEvents: 'none' }}
                />
                <text
                    x="217" y="624"
                    fontFamily="var(--label, Archivo, sans-serif)"
                    fontSize="8"
                    fill="#ffd98a"
                    textAnchor="middle"
                    letterSpacing="1"
                    style={{ pointerEvents: 'none' }}
                >
                    KARTHALA
                </text>

                {/* Prefecture labels */}
                {(prefectures || []).map(p => (
                    <g key={p.id || p.nom} style={{ pointerEvents: 'none' }}>
                        <text
                            x={p.label_x}
                            y={p.label_y - 4}
                            textAnchor="middle"
                            fontSize="9.5"
                            fontWeight="600"
                            fontFamily="Arial, sans-serif"
                            fill="#fff"
                            opacity="0.9"
                        >
                            {shortPref(p.nom, 0)}
                        </text>
                        <text
                            x={p.label_x}
                            y={p.label_y + 9}
                            textAnchor="middle"
                            fontSize="8.5"
                            fontFamily="Arial, sans-serif"
                            fill="#fff"
                            opacity="0.7"
                        >
                            {shortPref(p.nom, 1)}
                        </text>
                    </g>
                ))}

                {/* Hover tooltip */}
                {hovered && (() => {
                    const c = communes.find(x => x.slug === hovered);
                    if (!c) return null;
                    return (
                        <g style={{ pointerEvents: 'none' }}>
                            <rect
                                x={c.centroid_x - 42}
                                y={c.centroid_y - 22}
                                width="84"
                                height="18"
                                rx="6"
                                fill="rgba(7,26,51,.88)"
                            />
                            <text
                                x={c.centroid_x}
                                y={c.centroid_y - 9}
                                textAnchor="middle"
                                fontSize="9"
                                fontWeight="600"
                                fontFamily="Arial, sans-serif"
                                fill="#E3C878"
                            >
                                {c.nom}
                            </text>
                        </g>
                    );
                })()}
            </svg>
        </div>
    );
}

function shortPref(nom, part) {
    if (!nom) return '';
    const parts = nom.split(/[–-]/);
    return (parts[part] || '').trim();
}

function lighten(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, (num >> 16) + amount);
    const g = Math.min(255, ((num >> 8) & 0xff) + amount);
    const b = Math.min(255, (num & 0xff) + amount);
    return `rgb(${r},${g},${b})`;
}
