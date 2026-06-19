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
        // Admin principal
        User::firstOrCreate(
            ['email' => 'admin@gouv.km'],
            ['name' => 'Administrateur', 'password' => Hash::make('Admin@Gouv2026!')]
        );

        // Comptes de test par rôle
        User::firstOrCreate(
            ['email' => 'editeur@gouv.km'],
            ['name' => 'Éditeur Test', 'password' => Hash::make('Editeur@Gouv2026!')]
        );

        User::firstOrCreate(
            ['email' => 'referent@gouv.km'],
            ['name' => 'Référent Cabinet', 'password' => Hash::make('Referent@Gouv2026!')]
        );

        $this->call([
            RoleSeeder::class,
            PrefectureSeeder::class,
            CommuneSeeder::class,
            EluSeeder::class,
            ArticleSeeder::class,
            CabinetSeeder::class,
            AgendaSeeder::class,
            GoverneurSettingsSeeder::class,
            MediaSeeder::class,
        ]);
    }
}
