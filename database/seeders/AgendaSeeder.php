<?php

namespace Database\Seeders;

use App\Models\AgendaEvent;
use Illuminate\Database\Seeder;

class AgendaSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            ['titre' => "Conseil de l'île — session ordinaire", 'date' => '2026-07-12 09:00:00', 'lieu' => 'Palais de Mrodjuu, Moroni', 'statut' => 'public'],
            ['titre' => "Visite de chantier : adduction d'eau", 'date' => '2026-07-15 10:00:00', 'lieu' => 'Préfecture de Mbadjini-Est', 'statut' => 'public'],
            ['titre' => 'Audience des maires de Mitsamiouli–Mboudé', 'date' => '2026-07-18 14:00:00', 'lieu' => 'Cabinet du Gouverneur', 'statut' => 'prive'],
            ['titre' => "Cérémonie d'inauguration du marché régional", 'date' => '2026-07-22 10:00:00', 'lieu' => 'Foumbouni', 'statut' => 'public'],
            ['titre' => 'Réunion des partenaires de la coopération décentralisée', 'date' => '2026-07-27 09:00:00', 'lieu' => 'Moroni', 'statut' => 'prive'],
        ];

        foreach ($events as $event) {
            AgendaEvent::firstOrCreate(
                ['titre' => $event['titre'], 'date' => $event['date']],
                $event
            );
        }
    }
}
