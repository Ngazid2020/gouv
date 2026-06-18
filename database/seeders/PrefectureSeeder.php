<?php

namespace Database\Seeders;

use App\Models\Prefecture;
use Illuminate\Database\Seeder;

class PrefectureSeeder extends Seeder
{
    public function run(): void
    {
        $prefectures = [
            [
                'slug' => 'mitsamiouli',
                'nom' => 'Mitsamiouli–Mboudé',
                'chef_lieu' => 'Mitsamiouli',
                'couleur' => '#0B4A86',
                'est_capitale' => false,
                'label_x' => 133.7,
                'label_y' => 134.7,
                'ordre' => 1,
            ],
            [
                'slug' => 'itsandra',
                'nom' => 'Itsandra–Hamanvou',
                'chef_lieu' => "N'Tsoudjini",
                'couleur' => '#15679B',
                'est_capitale' => false,
                'label_x' => 99.9,
                'label_y' => 378.3,
                'ordre' => 2,
            ],
            [
                'slug' => 'hamahamet',
                'nom' => 'Hamahamet–Mboinkou',
                'chef_lieu' => 'Mbéni',
                'couleur' => '#1E7FA0',
                'est_capitale' => false,
                'label_x' => 225.2,
                'label_y' => 187.3,
                'ordre' => 3,
            ],
            [
                'slug' => 'moroni',
                'nom' => 'Moroni–Bambao',
                'chef_lieu' => 'Moroni',
                'couleur' => '#2A6FA8',
                'est_capitale' => true,
                'label_x' => 109.2,
                'label_y' => 572.6,
                'ordre' => 4,
            ],
            [
                'slug' => 'oichili',
                'nom' => 'Oichili–Dimani',
                'chef_lieu' => 'Oichili Yadjou',
                'couleur' => '#2898A2',
                'est_capitale' => false,
                'label_x' => 217.4,
                'label_y' => 447.3,
                'ordre' => 5,
            ],
            [
                'slug' => 'hambou',
                'nom' => 'Hambou',
                'chef_lieu' => 'Tsinimoipangua',
                'couleur' => '#2E8C8A',
                'est_capitale' => false,
                'label_x' => 139.2,
                'label_y' => 681.0,
                'ordre' => 6,
            ],
            [
                'slug' => 'mbadjini-est',
                'nom' => 'Mbadjini–Est',
                'chef_lieu' => 'Itsahidi',
                'couleur' => '#1F8C7E',
                'est_capitale' => false,
                'label_x' => 343.2,
                'label_y' => 715.0,
                'ordre' => 7,
            ],
            [
                'slug' => 'mbadjini-ouest',
                'nom' => 'Mbadjini–Ouest',
                'chef_lieu' => 'Nioumagama',
                'couleur' => '#34998C',
                'est_capitale' => false,
                'label_x' => 260.5,
                'label_y' => 728.4,
                'ordre' => 8,
            ],
        ];

        foreach ($prefectures as $data) {
            Prefecture::firstOrCreate(['slug' => $data['slug']], $data);
        }
    }
}
