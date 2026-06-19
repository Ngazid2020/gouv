<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('settings')->insertOrIgnore([
            'group'      => 'gouverneur',
            'name'       => 'photo',
            'locked'     => false,
            'payload'    => json_encode(null),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        DB::table('settings')
            ->where('group', 'gouverneur')
            ->where('name', 'photo')
            ->delete();
    }
};
