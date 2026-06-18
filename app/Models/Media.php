<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Media extends Model
{
    protected $table = 'medias';

    protected $fillable = [
        'type', 'titre', 'chemin', 'url', 'article_id', 'dans_mediatheque', 'ordre',
    ];

    protected $casts = [
        'dans_mediatheque' => 'boolean',
    ];

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }
}
