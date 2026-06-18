<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cabinet_members', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('nom');
            $table->string('role');
            $table->enum('niveau', ['gouverneur', 'direction', 'conseiller', 'support']);
            $table->string('email')->nullable();
            $table->string('telephone')->nullable();
            $table->string('photo')->nullable();
            $table->smallInteger('ordre')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cabinet_members');
    }
};
