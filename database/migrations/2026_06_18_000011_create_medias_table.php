<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medias', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['photo', 'video', 'infographie']);
            $table->string('titre');
            $table->string('chemin')->nullable();
            $table->string('url')->nullable();
            $table->foreignId('article_id')->nullable()->constrained()->nullOnDelete();
            $table->boolean('dans_mediatheque')->default(false);
            $table->smallInteger('ordre')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medias');
    }
};
