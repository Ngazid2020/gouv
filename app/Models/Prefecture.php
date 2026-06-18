<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Prefecture extends Model
{
    protected $fillable = [
        'slug',
        'nom',
        'chef_lieu',
        'couleur',
        'est_capitale',
        'label_x',
        'label_y',
        'ordre',
    ];

    protected $casts = [
        'est_capitale' => 'boolean',
        'label_x' => 'float',
        'label_y' => 'float',
    ];

    public function communes(): HasMany
    {
        return $this->hasMany(Commune::class);
    }
}
