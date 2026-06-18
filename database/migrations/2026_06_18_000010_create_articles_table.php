<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->enum('type', ['video', 'photo', 'info']);
            $table->string('categorie')->default('');
            $table->string('titre');
            $table->text('extrait')->nullable();
            $table->longText('contenu')->nullable();
            $table->dateTime('date_publication')->nullable();
            $table->boolean('est_a_la_une')->default(false);
            $table->foreignId('commune_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('statut', ['brouillon', 'publie'])->default('brouillon');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('media_principal')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
