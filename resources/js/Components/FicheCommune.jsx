import { Link } from '@inertiajs/react';

export default function FicheCommune({ commune, onClose }) {
    if (!commune) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`Fiche de la commune de ${commune.nom}`}
        >
            <div
                className="absolute inset-0 bg-bleu-nuit/70 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-[18px] shadow-md max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-start justify-between p-6 pb-4 border-b border-ligne">
                    <div>
                        <p className="eyebrow">Commune</p>
                        <h2 className="font-serif text-2xl text-bleu-nuit">{commune.nom}</h2>
                        {commune.prefecture && (
                            <p className="text-sm text-gris mt-1">Préfecture de {commune.prefecture}</p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 w-8 h-8 rounded-full flex items-center justify-center text-gris hover:bg-azur-pale hover:text-bleu transition-colors"
                        aria-label="Fermer"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    {commune.description && (
                        <p className="text-sm text-gris leading-relaxed">{commune.description}</p>
                    )}

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        {commune.superficie && (
                            <div className="bg-azur-pale rounded-[12px] p-3">
                                <p className="eyebrow text-[0.65rem]">Superficie</p>
                                <p className="font-semibold text-bleu-nuit">{commune.superficie} km²</p>
                            </div>
                        )}
                        {commune.population && (
                            <div className="bg-azur-pale rounded-[12px] p-3">
                                <p className="eyebrow text-[0.65rem]">Population</p>
                                <p className="font-semibold text-bleu-nuit">{commune.population?.toLocaleString('fr-FR')}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0">
                    <Link
                        href={`/communes/${commune.slug}`}
                        className="btn-bleu w-full justify-center"
                        onClick={onClose}
                    >
                        Voir la fiche complète →
                    </Link>
                </div>
            </div>
        </div>
    );
}
