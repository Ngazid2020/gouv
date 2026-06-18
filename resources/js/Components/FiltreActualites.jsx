export default function FiltreActualites({ categories, actif, onChange }) {
    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => onChange(null)}
                className={`btn-pill text-xs px-4 py-2 ${
                    !actif
                        ? 'bg-bleu-ng text-white'
                        : 'bg-azur-pale text-bleu-nuit hover:bg-gris-clair'
                }`}
            >
                Toutes
            </button>
            {(categories || []).map(cat => (
                <button
                    key={cat}
                    onClick={() => onChange(cat)}
                    className={`btn-pill text-xs px-4 py-2 ${
                        actif === cat
                            ? 'bg-bleu-ng text-white'
                            : 'bg-azur-pale text-bleu-nuit hover:bg-gris-clair'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
