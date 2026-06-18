<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class CabinetMember extends Model implements AuditableContract
{
    use Auditable;

    protected $fillable = [
        'slug', 'nom', 'role', 'niveau', 'email', 'telephone', 'photo', 'ordre',
    ];

    public function contactMessages(): HasMany
    {
        return $this->hasMany(ContactMessage::class);
    }
}
