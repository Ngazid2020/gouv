<?php

namespace App\Filament\Resources\AgendaEventResource\Pages;

use App\Filament\Resources\AgendaEventResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAgendaEvents extends ListRecords
{
    protected static string $resource = AgendaEventResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\CreateAction::make()];
    }
}
