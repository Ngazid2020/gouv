<?php

namespace Database\Seeders;

use App\Models\CabinetMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CabinetSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'nom'       => 'Ibrahim Mze Mohamed',
                'role'      => 'Gouverneur',
                'niveau'    => 'gouverneur',
                'email'     => 'gouverneur@gouvernorat-ngazidja.km',
                'photo'     => 'gouverneur/01KVE5YJ33RYM1YGMF9XRE1E7Y.png',
                'ordre'     => 1,
            ],
            [
                'nom'    => 'Moussa Said Djabir',
                'role'   => 'Directeur de Cabinet',
                'niveau' => 'direction',
                'email'  => 'cabinet@gouvernorat-ngazidja.km',
                'ordre'  => 2,
            ],
            [
                'nom'    => 'Ali Abdou Mlanao',
                'role'   => 'Secrétaire Général',
                'niveau' => 'direction',
                'email'  => 'sg@gouvernorat-ngazidja.km',
                'ordre'  => 3,
            ],
            [
                'nom'    => 'Soulaimane Amir Chanfi',
                'role'   => 'Conseiller juridique',
                'niveau' => 'conseiller',
                'ordre'  => 4,
            ],
            [
                'nom'    => 'Nourdine Youssouf Mze',
                'role'   => 'Conseiller économique',
                'niveau' => 'conseiller',
                'ordre'  => 5,
            ],
            [
                'nom'    => 'Kamal Housseine Said',
                'role'   => 'Conseiller en communication',
                'niveau' => 'conseiller',
                'ordre'  => 6,
            ],
            [
                'nom'    => 'Ahmed Salim Djoumbé',
                'role'   => 'Conseiller aux relations extérieures',
                'niveau' => 'conseiller',
                'ordre'  => 7,
            ],
            [
                'nom'    => 'Hassan Mchinda Toihir',
                'role'   => 'Conseiller aux infrastructures',
                'niveau' => 'conseiller',
                'ordre'  => 8,
            ],
            [
                'nom'    => 'Farouk Issouf Attoumane',
                'role'   => 'Conseiller social & santé',
                'niveau' => 'conseiller',
                'ordre'  => 9,
            ],
            [
                'nom'    => 'Omar Djae Msa',
                'role'   => 'Chef du Protocole',
                'niveau' => 'support',
                'ordre'  => 10,
            ],
            [
                'nom'    => 'Said Mzimba Abdou',
                'role'   => 'Chargé de mission',
                'niveau' => 'support',
                'ordre'  => 11,
            ],
            [
                'nom'    => 'Mansour Chanfi Ali',
                'role'   => 'Attaché de presse',
                'niveau' => 'support',
                'ordre'  => 12,
            ],
            [
                'nom'    => 'Hadja Salim Mohamed',
                'role'   => 'Secrétariat particulier',
                'niveau' => 'support',
                'ordre'  => 13,
            ],
        ];

        foreach ($members as $data) {
            $slug = Str::slug($data['role']);
            CabinetMember::updateOrCreate(
                ['slug' => $slug],
                array_merge($data, ['slug' => $slug])
            );
        }
    }
}
