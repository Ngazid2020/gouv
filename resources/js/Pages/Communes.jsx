import SeoHead from '@/Components/SeoHead';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import CarteNgazidja from '@/Components/CarteNgazidja';
import FicheCommune from '@/Components/FicheCommune';

export default function Communes({ communes, prefectures }) {
    const [selected, setSelected] = useState(null);

    return (
        <PublicLayout>
            <SeoHead
                title="Les Communes de Ngazidja"
                description="Carte interactive des 28 communes de l'île autonome de Ngazidja, organisées par préfecture."
            />

            {/* Hero */}
            <section className="bg-gradient-to-br from-bleu-nuit to-bleu-ng text-white py-16">
                <div className="wrap">
                    <p className="eyebrow">Territoire</p>
                    <h1 className="font-serif text-4xl sm:text-5xl font-semibold mt-1">Les Communes<br/>de Ngazidja</h1>
                    <p className="text-[#d4e3f4] mt-4 max-w-xl">
                        {communes.length} communes réparties dans {prefectures.length} préfectures. Cliquez sur une commune pour consulter sa fiche.
                    </p>
                </div>
            </section>

            {/* Carte + légende */}
            <section className="py-16">
                <div className="wrap">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Carte */}
                        <div className="lg:col-span-2">
                            <CarteNgazidja communes={communes} prefectures={prefectures} onSelect={setSelected}/>
                        </div>

                        {/* Légende + liste */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="eyebrow">Préfectures</h2>
                                <ul className="space-y-2">
                                    {(prefectures || []).map(p => (
                                        <li key={p.id || p.nom} className="flex items-center gap-3 text-sm">
                                            <span className="w-3.5 h-3.5 rounded-sm flex-shrink-0" style={{ background: p.couleur }}/>
                                            <span className="text-bleu-nuit">{p.nom}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border-t border-ligne pt-5">
                                <h2 className="eyebrow mb-3">Toutes les communes</h2>
                                <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                                    {(communes || []).sort((a, b) => a.nom.localeCompare(b.nom)).map(c => (
                                        <button
                                            key={c.slug}
                                            onClick={() => setSelected(c)}
                                            className="w-full text-left text-sm py-1.5 px-2 rounded-[8px] hover:bg-azur-pale hover:text-bleu transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: c.couleur }}/>
                                            <span className="text-bleu-nuit group-hover:text-bleu">{c.nom}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {selected && <FicheCommune commune={selected} onClose={() => setSelected(null)}/>}
        </PublicLayout>
    );
}
