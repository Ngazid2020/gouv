<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GoverneurSettings extends Settings
{
    public ?string $photo = null;

    public ?string $biographie = null;

    public ?string $vision = null;

    public ?string $citation = null;

    public static function group(): string
    {
        return 'gouverneur';
    }
}
