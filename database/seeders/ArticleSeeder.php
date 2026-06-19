<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $adminId = User::first()?->id ?? 1;

        $articles = [
            [
                'slug'              => 'gouverneur-lance-programme-eau',
                'type'              => 'video',
                'categorie'         => 'Gouvernance',
                'titre'             => "Le Gouverneur lance le programme insulaire pour l'accès à l'eau",
                'extrait'           => "Un plan pluriannuel mobilisant l'État, les communes et les partenaires pour sécuriser l'approvisionnement en eau sur l'ensemble de Ngazidja.",
                'contenu'           => <<<HTML
<p>Le Gouverneur de Ngazidja, Ibrahim Mze Mohamed, a officiellement lancé le Programme insulaire pour l'accès à l'eau, un plan pluriannuel visant à garantir un approvisionnement en eau potable fiable et équitable sur l'ensemble de l'île d'ici 2030.</p>
<h2>Un plan structuré en trois phases</h2>
<p>Le programme, élaboré en concertation avec les 28 communes, s'articule en trois phases :</p>
<ul>
<li><strong>Phase 1 (2026–2027) :</strong> réhabilitation et extension des réseaux dans les zones urbaines de Moroni et des chefs-lieux de préfecture ;</li>
<li><strong>Phase 2 (2027–2028) :</strong> construction de nouvelles infrastructures dans les communes rurales prioritaires ;</li>
<li><strong>Phase 3 (2028–2030) :</strong> interconnexion des réseaux et mise en place d'une régie insulaire de l'eau.</li>
</ul>
<h2>Un financement mobilisé</h2>
<p>Le budget global est estimé à 12 milliards de francs comoriens, dont 60 % apportés par l'État et les partenaires de développement.</p>
<blockquote><p>« L'eau n'est pas un luxe, c'est un droit fondamental. Avec ce programme, nous affirmons notre volonté de ne laisser aucune commune de Ngazidja en dehors des réseaux. »</p></blockquote>
HTML,
                'media_principal'   => 'articles/01KVE6DT8EHD3FHK44Q2A0Y6GZ.png',
                'date_publication'  => '2026-06-08 09:00:00',
                'est_a_la_une'      => true,
                'statut'            => 'publie',
            ],
            [
                'slug'             => 'tournee-prefectures-maires-notables',
                'type'             => 'photo',
                'categorie'        => 'Communes',
                'titre'            => "Tournée des préfectures : à l'écoute des maires et des notables",
                'extrait'          => "Étape par étape, le Gouvernorat rencontre les exécutifs communaux pour co-construire la feuille de route de l'île.",
                'contenu'          => '<p>Étape par étape, le Gouvernorat rencontre les exécutifs communaux pour co-construire la feuille de route de l\'île. Cette tournée, menée sur l\'ensemble des huit préfectures, vise à recueillir les priorités locales et à les intégrer dans la planification insulaire 2026–2030.</p><p>Les thématiques abordées couvrent l\'eau, les routes, l\'éducation, la santé et le développement économique local. Les résultats de ces concertations alimenteront le Plan insulaire de développement présenté en fin d\'année.</p>',
                'date_publication' => '2026-06-04 09:00:00',
                'est_a_la_une'     => false,
                'statut'           => 'publie',
            ],
            [
                'slug'             => 'filiere-ylang-ylang-infographie',
                'type'             => 'info',
                'categorie'        => 'Économie',
                'titre'            => 'Filière ylang-ylang : une infographie pour comprendre les enjeux',
                'extrait'          => "Production, emplois et exportations — les chiffres clés de la principale richesse agricole de l'île.",
                'contenu'          => '<p>La filière ylang-ylang représente l\'une des principales sources de revenus agricoles de Ngazidja. Notre infographie présente les données essentielles : surfaces cultivées, volumes de production, nombre de producteurs et valeur des exportations.</p><p>Le Gouvernorat soutient la structuration de cette filière à travers un programme d\'accompagnement des coopératives locales et de modernisation des équipements de distillation.</p>',
                'date_publication' => '2026-05-29 09:00:00',
                'est_a_la_une'     => false,
                'statut'           => 'publie',
            ],
            [
                'slug'             => 'inauguration-salles-classe-itsandra',
                'type'             => 'photo',
                'categorie'        => 'Éducation',
                'titre'            => "Inauguration de salles de classe dans la préfecture d'Itsandra",
                'extrait'          => "De nouvelles infrastructures scolaires livrées pour améliorer les conditions d'apprentissage.",
                'contenu'          => '<p>Le Gouverneur a inauguré six nouvelles salles de classe réparties dans trois écoles de la préfecture d\'Itsandra. Ces constructions, financées par le Gouvernorat en partenariat avec les communes concernées, accueilleront près de 300 élèves supplémentaires à la rentrée prochaine.</p><p>Ces réalisations s\'inscrivent dans le volet éducation du Plan insulaire de développement et répondent à une demande forte des communautés locales.</p>',
                'date_publication' => '2026-05-21 09:00:00',
                'est_a_la_une'     => false,
                'statut'           => 'publie',
            ],
            [
                'slug'             => 'discours-ouverture-conference-chefferies',
                'type'             => 'video',
                'categorie'        => 'Cérémonie',
                'titre'            => "Discours d'ouverture de la conférence des chefferies",
                'extrait'          => 'Le Gouverneur réaffirme la place du droit coutumier et des notables dans la cohésion sociale.',
                'contenu'          => '<p>Lors de la conférence annuelle des chefferies de Ngazidja, le Gouverneur Ibrahim Mze Mohamed a prononcé un discours saluant le rôle irremplaçable des notables et des chefs coutumiers dans le maintien de la cohésion sociale et dans la résolution des conflits locaux.</p><p>Il a réaffirmé l\'engagement du Gouvernorat à associer les chefferies aux grandes décisions qui concernent la vie des communes et à préserver le droit coutumier comme pilier de l\'identité de Ngazidja.</p>',
                'date_publication' => '2026-05-14 09:00:00',
                'est_a_la_une'     => false,
                'statut'           => 'publie',
            ],
            [
                'slug'             => 'campagne-sante-publique-bilan',
                'type'             => 'info',
                'categorie'        => 'Santé',
                'titre'            => 'Campagne de santé publique : bilan en chiffres',
                'extrait'          => "Retour sur les actions de prévention menées dans les huit préfectures de l'île.",
                'contenu'          => '<p>La campagne de santé publique conduite au premier semestre 2026 a mobilisé plus de 80 agents de santé dans les huit préfectures de Ngazidja. Bilan : 12 000 consultations préventives réalisées, 6 500 enfants vaccinés et 3 200 dépistages nutritionnels effectués.</p><p>Ces résultats témoignent de l\'efficacité d\'une approche de proximité portée conjointement par le Gouvernorat et les communes. La prochaine campagne est prévue au second semestre, avec un focus particulier sur la santé maternelle.</p>',
                'date_publication' => '2026-05-06 09:00:00',
                'est_a_la_une'     => false,
                'statut'           => 'publie',
            ],
        ];

        foreach ($articles as $data) {
            Article::updateOrCreate(
                ['slug' => $data['slug']],
                array_merge($data, ['user_id' => $adminId])
            );
        }
    }
}
