export default function OrganigrammeCabinet({ membres }) {
    const byNiveau = {};
    (membres || []).forEach(m => {
        const n = m.niveau || 3;
        if (!byNiveau[n]) byNiveau[n] = [];
        byNiveau[n].push(m);
    });

    const niveaux = Object.keys(byNiveau).sort((a, b) => a - b);

    return (
        <div className="space-y-10">
            {niveaux.map(n => (
                <div key={n}>
                    <div className={`grid gap-5 ${byNiveau[n].length === 1 ? 'grid-cols-1 max-w-xs mx-auto' : byNiveau[n].length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-xl mx-auto' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                        {byNiveau[n].map(m => (
                            <MemberCard key={m.id} membre={m} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

function MemberCard({ membre: m }) {
    return (
        <div className="bg-white border border-ligne rounded-[18px] p-5 flex gap-4 items-start shadow-soft hover:shadow-md transition-shadow">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-azur-pale flex items-center justify-center flex-shrink-0 overflow-hidden">
                {m.photo ? (
                    <img src={`/storage/${m.photo}`} alt={m.nom} className="w-full h-full object-cover"/>
                ) : (
                    <span className="font-serif text-xl text-bleu-ng font-semibold">
                        {initiales(m.nom)}
                    </span>
                )}
            </div>
            {/* Info */}
            <div className="min-w-0">
                <h3 className="font-serif text-[1rem] font-semibold text-bleu-nuit leading-tight">{m.nom}</h3>
                <p className="text-sm text-gris mt-0.5">{m.role}</p>
                {m.email && (
                    <a href={`mailto:${m.email}`} className="text-xs text-azur hover:underline mt-1 block truncate">{m.email}</a>
                )}
            </div>
        </div>
    );
}

function initiales(nom) {
    return (nom || '')
        .split(' ')
        .map(w => w[0] || '')
        .slice(0, 2)
        .join('')
        .toUpperCase();
}
