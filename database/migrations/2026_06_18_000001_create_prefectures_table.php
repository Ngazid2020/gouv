<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('prefectures', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('nom');
            $table->string('chef_lieu');
            $table->string('couleur', 20);
            $table->boolean('est_capitale')->default(false);
            $table->decimal('label_x', 8, 2)->nullable();
            $table->decimal('label_y', 8, 2)->nullable();
            $table->unsignedSmallInteger('ordre')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('prefectures');
    }
};
