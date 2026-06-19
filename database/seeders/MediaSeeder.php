<?php

namespace Database\Seeders;

use App\Models\Media;
use Illuminate\Database\Seeder;

class MediaSeeder extends Seeder
{
    public function run(): void
    {
        $medias = [
            // ── Discours ───────────────────────────────────────────────────
            [
                'type'             => 'discours',
                'titre'            => "Discours d'ouverture — Conférence des chefferies de Ngazidja",
                'dans_mediatheque' => true,
                'ordre'            => 1,
            ],
            [
                'type'             => 'discours',
                'titre'            => "Allocution à l'occasion de la Journée mondiale de l'eau",
                'dans_mediatheque' => true,
                'ordre'            => 2,
            ],
            [
                'type'             => 'discours',
                'titre'            => "Vœux du Gouverneur à la population de Ngazidja pour l'année 2026",
                'dans_mediatheque' => true,
                'ordre'            => 3,
            ],
            [
                'type'             => 'discours',
                'titre'            => "Mot d'accueil aux partenaires de la coopération décentralisée",
                'dans_mediatheque' => true,
                'ordre'            => 4,
            ],

            // ── Citations ──────────────────────────────────────────────────
            [
                'type'             => 'citation',
                'titre'            => '"Ngazidja avance lorsque ses communes avancent. Ce portail est notre engagement de transparence, de proximité et de modernité."',
                'dans_mediatheque' => true,
                'ordre'            => 1,
            ],
            [
                'type'             => 'citation',
                'titre'            => '"L\'eau, l\'éducation et la santé sont les trois piliers sur lesquels nous bâtissons l\'avenir de notre île."',
                'dans_mediatheque' => true,
                'ordre'            => 2,
            ],
            [
                'type'             => 'citation',
                'titre'            => '"Nous bâtissons aujourd\'hui les fondations d\'une île plus juste, plus solidaire et mieux gouvernée."',
                'dans_mediatheque' => true,
                'ordre'            => 3,
            ],
            [
                'type'             => 'citation',
                'titre'            => '"Chaque investissement dans nos communes est un investissement dans la dignité et l\'avenir de notre population."',
                'dans_mediatheque' => true,
                'ordre'            => 4,
            ],
            [
                'type'             => 'citation',
                'titre'            => '"La coopération décentralisée n\'est pas une option pour Ngazidja, c\'est une nécessité de développement."',
                'dans_mediatheque' => true,
                'ordre'            => 5,
            ],
            [
                'type'             => 'citation',
                'titre'            => '"Notre diversité culturelle et nos traditions ancestrales sont un patrimoine à valoriser, pas un frein au progrès."',
                'dans_mediatheque' => true,
                'ordre'            => 6,
            ],

            // ── Galerie ────────────────────────────────────────────────────
            [
                'type'             => 'galerie',
                'titre'            => "Visite du chantier d'adduction d'eau — Mbéni",
                'chemin'           => 'medias/01KVEKK4M7J3T59J75GETW3XMW.png',
                'dans_mediatheque' => true,
                'ordre'            => 1,
            ],
            [
                'type'             => 'galerie',
                'titre'            => "Inauguration des salles de classe à Itsandra",
                'dans_mediatheque' => true,
                'ordre'            => 2,
            ],
            [
                'type'             => 'galerie',
                'titre'            => "Tournée des préfectures — Mbadjini Est",
                'dans_mediatheque' => true,
                'ordre'            => 3,
            ],
            [
                'type'             => 'galerie',
                'titre'            => "Rencontre avec les maires de la préfecture de Mitsamiouli",
                'dans_mediatheque' => true,
                'ordre'            => 4,
            ],
            [
                'type'             => 'galerie',
                'titre'            => "Cérémonie des vœux à la population de Ngazidja",
                'dans_mediatheque' => true,
                'ordre'            => 5,
            ],
            [
                'type'             => 'galerie',
                'titre'            => "Signature du protocole de coopération décentralisée",
                'dans_mediatheque' => true,
                'ordre'            => 6,
            ],

            // ── Documents ──────────────────────────────────────────────────
            [
                'type'             => 'document',
                'titre'            => "Rapport d'activité du Gouvernorat 2025",
                'dans_mediatheque' => true,
                'ordre'            => 1,
            ],
            [
                'type'             => 'document',
                'titre'            => "Plan insulaire de développement 2026–2030",
                'dans_mediatheque' => true,
                'ordre'            => 2,
            ],
            [
                'type'             => 'document',
                'titre'            => "Arrêté portant organisation des services du Gouvernorat",
                'dans_mediatheque' => true,
                'ordre'            => 3,
            ],
            [
                'type'             => 'document',
                'titre'            => "Recueil des discours officiels du Gouverneur",
                'dans_mediatheque' => true,
                'ordre'            => 4,
            ],
            [
                'type'             => 'document',
                'titre'            => "Charte de la coopération décentralisée de Ngazidja",
                'dans_mediatheque' => true,
                'ordre'            => 5,
            ],
        ];

        foreach ($medias as $data) {
            Media::firstOrCreate(
                ['type' => $data['type'], 'titre' => $data['titre']],
                $data
            );
        }
    }
}
