<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Copie la valeur de 'photo' dans 'portrait' si portrait est encore null
        $photo = DB::table('settings')
            ->where('group', 'gouverneur')
            ->where('name', 'photo')
            ->value('payload');

        DB::table('settings')
            ->where('group', 'gouverneur')
            ->where('name', 'portrait')
            ->where('payload', json_encode(null))
            ->update(['payload' => $photo, 'updated_at' => now()]);
    }

    public function down(): void
    {
        DB::table('settings')
            ->where('group', 'gouverneur')
            ->where('name', 'portrait')
            ->update(['payload' => json_encode(null), 'updated_at' => now()]);
    }
};
