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
            ['nom' => 'Ibrahim Mze Mohamed', 'role' => 'Gouverneur', 'niveau' => 'gouverneur', 'email' => 'gouverneur@gouvernorat-ngazidja.km', 'ordre' => 1],
            ['nom' => 'À renseigner', 'role' => 'Directeur de Cabinet', 'niveau' => 'direction', 'ordre' => 2],
            ['nom' => 'À renseigner', 'role' => 'Secrétaire Général', 'niveau' => 'direction', 'ordre' => 3],
            ['nom' => 'À renseigner', 'role' => 'Conseiller juridique', 'niveau' => 'conseiller', 'ordre' => 4],
            ['nom' => 'À renseigner', 'role' => 'Conseiller économique', 'niveau' => 'conseiller', 'ordre' => 5],
            ['nom' => 'À renseigner', 'role' => 'Conseiller en communication', 'niveau' => 'conseiller', 'ordre' => 6],
            ['nom' => 'À renseigner', 'role' => 'Conseiller aux relations extérieures', 'niveau' => 'conseiller', 'ordre' => 7],
            ['nom' => 'À renseigner', 'role' => 'Conseiller aux infrastructures', 'niveau' => 'conseiller', 'ordre' => 8],
            ['nom' => 'À renseigner', 'role' => 'Conseiller social & santé', 'niveau' => 'conseiller', 'ordre' => 9],
            ['nom' => 'À renseigner', 'role' => 'Chef du Protocole', 'niveau' => 'support', 'ordre' => 10],
            ['nom' => 'À renseigner', 'role' => 'Chargé de mission', 'niveau' => 'support', 'ordre' => 11],
            ['nom' => 'À renseigner', 'role' => 'Attaché de presse', 'niveau' => 'support', 'ordre' => 12],
            ['nom' => 'À renseigner', 'role' => 'Secrétariat particulier', 'niveau' => 'support', 'ordre' => 13],
        ];

        foreach ($members as $data) {
            $slug = Str::slug($data['role']);
            CabinetMember::firstOrCreate(
                ['slug' => $slug],
                array_merge($data, ['slug' => $slug])
            );
        }
    }
}
