<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GoverneurSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            'biographie' => '<p>Biographie du Gouverneur à renseigner.</p>',
            'vision' => '<p>Vision du Gouverneur à renseigner.</p>',
            'citation' => 'Citation du Gouverneur à renseigner.',
        ];

        foreach ($defaults as $name => $value) {
            $exists = DB::table('settings')
                ->where('group', 'gouverneur')
                ->where('name', $name)
                ->exists();

            if (! $exists) {
                DB::table('settings')->insert([
                    'group' => 'gouverneur',
                    'name' => $name,
                    'locked' => false,
                    'payload' => json_encode($value),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
