<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            'super-administrateur',
            'administrateur',
            'editeur',
            'gestionnaire-territorial',
            'referent-cabinet',
        ];

        foreach ($roles as $name) {
            Role::firstOrCreate(['name' => $name, 'guard_name' => 'web']);
        }

        // Affecter les rôles aux comptes de test
        User::where('email', 'admin@gouv.km')->first()?->assignRole('super-administrateur');
        User::where('email', 'editeur@gouv.km')->first()?->assignRole('editeur');
        User::where('email', 'referent@gouv.km')->first()?->assignRole('referent-cabinet');
    }
}
