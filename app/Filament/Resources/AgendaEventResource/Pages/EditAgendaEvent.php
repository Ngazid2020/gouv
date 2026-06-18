<?php

namespace App\Filament\Resources\AgendaEventResource\Pages;

use App\Filament\Resources\AgendaEventResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAgendaEvent extends EditRecord
{
    protected static string $resource = AgendaEventResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\DeleteAction::make()];
    }
}
