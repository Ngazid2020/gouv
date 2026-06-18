<?php

namespace App\Filament\Resources\CabinetMemberResource\Pages;

use App\Filament\Resources\CabinetMemberResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCabinetMembers extends ListRecords
{
    protected static string $resource = CabinetMemberResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\CreateAction::make()];
    }
}
