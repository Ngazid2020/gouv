<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GoverneurSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $biographie = <<<HTML
<p>Ibrahim Mze Mohamed est le Gouverneur de l'île de Ngazidja (Grande Comore). Titulaire d'un diplôme en droit public, il a consacré sa carrière au service de l'État comorien, occupant successivement des fonctions au sein de l'administration centrale avant d'être nommé à la tête du Gouvernorat de Ngazidja.</p>
<p>Depuis sa prise de fonctions, il a engagé une réforme en profondeur de l'administration insulaire, avec pour priorités le rapprochement des services publics des citoyens, la modernisation de la gouvernance communale et le renforcement des partenariats régionaux et internationaux.</p>
<p>Homme de dialogue et de consensus, le Gouverneur Ibrahim Mze Mohamed attache une importance particulière à la concertation avec les maires, les chefferies coutumières et la société civile de Ngazidja pour bâtir ensemble les politiques publiques de l'île.</p>
HTML;

        $vision = <<<HTML
<p>Notre ambition est de faire de Ngazidja une île modèle en matière de bonne gouvernance insulaire : une administration transparente, des services publics accessibles à tous et un développement équitable entre toutes les communes.</p>
<p>Le Plan insulaire de développement 2026–2030 traduit cette vision en axes concrets :</p>
<ul>
<li>Garantir l'accès à l'eau potable pour chaque foyer d'ici 2028 ;</li>
<li>Améliorer les infrastructures scolaires et sanitaires dans les communes les plus reculées ;</li>
<li>Développer l'économie insulaire par la valorisation des filières agricoles et la promotion du tourisme durable ;</li>
<li>Mettre en place une gouvernance numérique transparente et participative ;</li>
<li>Renforcer les liens de coopération décentralisée avec les collectivités partenaires.</li>
</ul>
HTML;

        $defaults = [
            'nom'          => 'Ibrahim Mze Mohamed',
            'titre_fonction' => "Gouverneur de l'île de Ngazidja",
            'portrait'     => 'gouverneur/01KVE5YJ33RYM1YGMF9XRE1E7Y.png',
            'photo'        => 'gouverneur/01KVE5YJ33RYM1YGMF9XRE1E7Y.png',
            'biographie'   => $biographie,
            'vision'       => $vision,
            'citation'     => '"Ngazidja avance lorsque ses communes avancent. Ce portail est notre engagement de transparence, de proximité et de modernité."',
        ];

        foreach ($defaults as $name => $value) {
            DB::table('settings')->updateOrInsert(
                ['group' => 'gouverneur', 'name' => $name],
                [
                    'locked'     => false,
                    'payload'    => json_encode($value),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}
