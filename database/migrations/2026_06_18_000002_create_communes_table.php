<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('communes', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('nom');
            $table->foreignId('prefecture_id')->constrained()->cascadeOnDelete();
            $table->boolean('est_chef_lieu')->default(false);
            $table->string('couleur', 20)->nullable();
            $table->text('svg_path');
            $table->decimal('centroid_x', 8, 2)->nullable();
            $table->decimal('centroid_y', 8, 2)->nullable();
            $table->unsignedInteger('population')->nullable();
            $table->unsignedInteger('foyers')->nullable();
            $table->unsignedSmallInteger('nb_conseillers')->nullable();
            $table->unsignedSmallInteger('nb_villages')->nullable();
            $table->text('gouvernance')->nullable();
            $table->json('atouts')->nullable();
            $table->json('defis')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('communes');
    }
};
