<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Elu extends Model
{
    protected $fillable = [
        'commune_id',
        'nom',
        'role',
        'ordre',
        'photo',
    ];

    public function commune(): BelongsTo
    {
        return $this->belongsTo(Commune::class);
    }
}
