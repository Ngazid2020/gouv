<?php

namespace App\Filament\Widgets;

use App\Models\AgendaEvent;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class UpcomingEventsWidget extends BaseWidget
{
    protected static ?int $sort = 3;

    protected int|string|array $columnSpan = 'full';

    protected static ?string $heading = 'Prochains événements';

    public function table(Table $table): Table
    {
        return $table
            ->query(AgendaEvent::query()->where('date', '>=', now())->orderBy('date')->limit(5))
            ->columns([
                Tables\Columns\TextColumn::make('titre'),
                Tables\Columns\TextColumn::make('date')->dateTime('d/m/Y H:i'),
                Tables\Columns\TextColumn::make('lieu'),
                Tables\Columns\TextColumn::make('statut')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'public' => 'success',
                        'prive' => 'gray',
                    }),
            ]);
    }
}
