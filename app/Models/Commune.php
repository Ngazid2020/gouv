<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Commune extends Model
{
    protected $fillable = [
        'slug',
        'nom',
        'prefecture_id',
        'est_chef_lieu',
        'couleur',
        'svg_path',
        'centroid_x',
        'centroid_y',
        'population',
        'foyers',
        'nb_conseillers',
        'nb_villages',
        'gouvernance',
        'atouts',
        'defis',
    ];

    protected $casts = [
        'est_chef_lieu' => 'boolean',
        'centroid_x' => 'float',
        'centroid_y' => 'float',
        'atouts' => 'array',
        'defis' => 'array',
    ];

    public function prefecture(): BelongsTo
    {
        return $this->belongsTo(Prefecture::class);
    }

    public function elus(): HasMany
    {
        return $this->hasMany(Elu::class);
    }
}
