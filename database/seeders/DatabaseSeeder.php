<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Créer l'admin principal s'il n'existe pas
        User::firstOrCreate(
            ['email' => 'admin@gouv.km'],
            [
                'name' => 'Administrateur',
                'password' => Hash::make('Admin@Gouv2026!'),
            ]
        );

        $this->call([
            RoleSeeder::class,
            PrefectureSeeder::class,
            CommuneSeeder::class,
        ]);
    }
}
