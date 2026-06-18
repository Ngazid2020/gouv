<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactMessage extends Model
{
    protected $fillable = [
        'cabinet_member_id', 'nom', 'email', 'objet', 'message', 'statut',
    ];

    public function cabinetMember(): BelongsTo
    {
        return $this->belongsTo(CabinetMember::class);
    }
}
