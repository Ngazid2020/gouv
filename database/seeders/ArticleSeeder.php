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
                'slug' => 'gouverneur-lance-programme-eau',
                'type' => 'video',
                'categorie' => 'Gouvernance',
                'titre' => "Le Gouverneur lance le programme insulaire pour l'accès à l'eau",
                'extrait' => "Un plan pluriannuel mobilisant l'État, les communes et les partenaires pour sécuriser l'approvisionnement en eau sur l'ensemble de Ngazidja.",
                'date_publication' => '2026-06-08 09:00:00',
                'est_a_la_une' => true,
                'statut' => 'publie',
            ],
            [
                'slug' => 'tournee-prefectures-maires-notables',
                'type' => 'photo',
                'categorie' => 'Communes',
                'titre' => "Tournée des préfectures : à l'écoute des maires et des notables",
                'extrait' => "Étape par étape, le Gouvernorat rencontre les exécutifs communaux pour co-construire la feuille de route de l'île.",
                'date_publication' => '2026-06-04 09:00:00',
                'est_a_la_une' => false,
                'statut' => 'publie',
            ],
            [
                'slug' => 'filiere-ylang-ylang-infographie',
                'type' => 'info',
                'categorie' => 'Économie',
                'titre' => 'Filière ylang-ylang : une infographie pour comprendre les enjeux',
                'extrait' => "Production, emplois et exportations — les chiffres clés de la principale richesse agricole de l'île.",
                'date_publication' => '2026-05-29 09:00:00',
                'est_a_la_une' => false,
                'statut' => 'publie',
            ],
            [
                'slug' => 'inauguration-salles-classe-itsandra',
                'type' => 'photo',
                'categorie' => 'Éducation',
                'titre' => "Inauguration de salles de classe dans la préfecture d'Itsandra",
                'extrait' => "De nouvelles infrastructures scolaires livrées pour améliorer les conditions d'apprentissage.",
                'date_publication' => '2026-05-21 09:00:00',
                'est_a_la_une' => false,
                'statut' => 'publie',
            ],
            [
                'slug' => 'discours-ouverture-conference-chefferies',
                'type' => 'video',
                'categorie' => 'Cérémonie',
                'titre' => "Discours d'ouverture de la conférence des chefferies",
                'extrait' => 'Le Gouverneur réaffirme la place du droit coutumier et des notables dans la cohésion sociale.',
                'date_publication' => '2026-05-14 09:00:00',
                'est_a_la_une' => false,
                'statut' => 'publie',
            ],
            [
                'slug' => 'campagne-sante-publique-bilan',
                'type' => 'info',
                'categorie' => 'Santé',
                'titre' => 'Campagne de santé publique : bilan en chiffres',
                'extrait' => "Retour sur les actions de prévention menées dans les huit préfectures de l'île.",
                'date_publication' => '2026-05-06 09:00:00',
                'est_a_la_une' => false,
                'statut' => 'publie',
            ],
        ];

        foreach ($articles as $data) {
            Article::firstOrCreate(
                ['slug' => $data['slug']],
                array_merge($data, ['user_id' => $adminId, 'contenu' => $data['extrait']])
            );
        }
    }
}
