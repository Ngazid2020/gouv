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

        // Affecter super-administrateur au premier admin
        $admin = User::first();
        if ($admin) {
            $admin->assignRole('super-administrateur');
        }
    }
}
