import { useState } from 'react';

const TYPE_LABELS = {
    photo:     'Photos',
    video:     'Vidéos',
    document:  'Documents',
    infographie: 'Infographies',
};

export default function MediathequeTabs({ medias }) {
    const types = Object.keys(medias || {});
    const [actif, setActif] = useState(types[0] || null);

    const items = (medias && actif) ? (medias[actif] || []) : [];

    return (
        <div>
            {/* Tabs */}
            <div className="flex gap-2 flex-wrap mb-8 border-b border-ligne pb-3">
                {types.map(t => (
                    <button
                        key={t}
                        onClick={() => setActif(t)}
                        className={`font-label text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                            actif === t
                                ? 'bg-bleu-ng text-white'
                                : 'text-gris hover:text-bleu-nuit hover:bg-azur-pale'
                        }`}
                    >
                        {TYPE_LABELS[t] || t}
                        <span className="ml-1.5 text-xs opacity-70">({(medias[t] || []).length})</span>
                    </button>
                ))}
            </div>

            {/* Content */}
            {items.length === 0 ? (
                <p className="text-gris text-center py-12">Aucun média disponible pour le moment.</p>
            ) : actif === 'photo' ? (
                <PhotoGrid items={items} />
            ) : actif === 'video' ? (
                <VideoGrid items={items} />
            ) : (
                <DocumentList items={items} />
            )}
        </div>
    );
}

function PhotoGrid({ items }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(m => (
                <div key={m.id} className="rounded-[12px] overflow-hidden bg-azur-pale aspect-square flex items-center justify-center group cursor-pointer hover:ring-2 hover:ring-or transition-all">
                    {m.chemin ? (
                        <img src={`/storage/${m.chemin}`} alt={m.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    ) : (
                        <div className="text-center p-3">
                            <svg className="w-8 h-8 text-azur mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="3" width="18" height="18" rx="3"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <path d="M21 15l-5-5L5 21"/>
                            </svg>
                            <p className="text-xs text-gris">{m.titre}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

function VideoGrid({ items }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(m => (
                <div key={m.id} className="rounded-[18px] overflow-hidden bg-bleu-nuit/5 border border-ligne hover:shadow-md transition-shadow">
                    {m.url ? (
                        <a href={m.url} target="_blank" rel="noopener noreferrer" className="block aspect-video bg-bleu-nuit flex items-center justify-center group">
                            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-or/80 transition-colors">
                                <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                        </a>
                    ) : (
                        <div className="aspect-video bg-bleu-nuit/10 flex items-center justify-center">
                            <svg className="w-10 h-10 text-gris-clair" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                    )}
                    <div className="p-4">
                        <p className="font-serif text-sm font-semibold text-bleu-nuit">{m.titre}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function DocumentList({ items }) {
    return (
        <div className="space-y-3">
            {items.map(m => (
                <a
                    key={m.id}
                    href={m.chemin ? `/storage/${m.chemin}` : m.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-[18px] border border-ligne hover:border-azur hover:bg-azur-pale transition-all group"
                >
                    <div className="w-10 h-10 rounded-[10px] bg-azur-pale group-hover:bg-azur/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-azur" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                        </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm text-bleu-nuit">{m.titre}</p>
                    </div>
                    <svg className="w-4 h-4 text-gris group-hover:text-azur flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                </a>
            ))}
        </div>
    );
}
