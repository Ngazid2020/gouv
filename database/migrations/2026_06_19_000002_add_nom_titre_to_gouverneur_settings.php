<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $rows = [
            ['name' => 'nom',            'payload' => json_encode('Ibrahim Mze Mohamed')],
            ['name' => 'titre_fonction', 'payload' => json_encode("Gouverneur de l'île de Ngazidja")],
        ];

        foreach ($rows as $row) {
            DB::table('settings')->insertOrIgnore(array_merge($row, [
                'group'      => 'gouverneur',
                'locked'     => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }

    public function down(): void
    {
        DB::table('settings')
            ->where('group', 'gouverneur')
            ->whereIn('name', ['nom', 'titre_fonction'])
            ->delete();
    }
};
