<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Article extends Model implements AuditableContract
{
    use Auditable;

    protected $fillable = [
        'slug', 'type', 'categorie', 'titre', 'extrait', 'contenu',
        'date_publication', 'est_a_la_une', 'commune_id', 'statut',
        'user_id', 'media_principal',
    ];

    protected $casts = [
        'date_publication' => 'datetime',
        'est_a_la_une' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function commune(): BelongsTo
    {
        return $this->belongsTo(Commune::class);
    }

    public function medias(): HasMany
    {
        return $this->hasMany(Media::class);
    }
}
