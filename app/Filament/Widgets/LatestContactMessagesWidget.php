<?php

namespace App\Filament\Widgets;

use App\Models\ContactMessage;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestContactMessagesWidget extends BaseWidget
{
    protected static ?int $sort = 2;

    protected int|string|array $columnSpan = 'full';

    protected static ?string $heading = 'Derniers messages de contact';

    public function table(Table $table): Table
    {
        return $table
            ->query(ContactMessage::query()->latest()->limit(5))
            ->columns([
                Tables\Columns\TextColumn::make('nom'),
                Tables\Columns\TextColumn::make('objet')->limit(40),
                Tables\Columns\TextColumn::make('cabinetMember.nom')->label('Destinataire'),
                Tables\Columns\TextColumn::make('statut')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'nouveau' => 'warning',
                        'traite' => 'success',
                    }),
                Tables\Columns\TextColumn::make('created_at')->label('Reçu')->dateTime('d/m/Y'),
            ]);
    }
}
