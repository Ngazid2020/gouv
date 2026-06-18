<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AgendaEventResource\Pages;
use App\Models\AgendaEvent;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class AgendaEventResource extends Resource
{
    protected static ?string $model = AgendaEvent::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-calendar-days';

    protected static \UnitEnum|string|null $navigationGroup = 'Contenus';

    protected static ?int $navigationSort = 3;

    protected static ?string $label = 'Événement';

    protected static ?string $pluralLabel = 'Agenda';

    public static function canAccess(): bool
    {
        return auth()->user()?->hasAnyRole([
            'super-administrateur', 'administrateur', 'editeur',
        ]);
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make()->schema([
                Forms\Components\TextInput::make('titre')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),

                Forms\Components\DateTimePicker::make('date')
                    ->required(),

                Forms\Components\TextInput::make('lieu')
                    ->required()
                    ->maxLength(255),

                Forms\Components\Select::make('statut')
                    ->options(['public' => 'Public', 'prive' => 'Privé'])
                    ->required()
                    ->default('public'),

                Forms\Components\Textarea::make('description')
                    ->rows(4)
                    ->columnSpanFull(),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('titre')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('date')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),

                Tables\Columns\TextColumn::make('lieu')
                    ->searchable(),

                Tables\Columns\TextColumn::make('statut')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'public' => 'success',
                        'prive' => 'gray',
                    }),
            ])
            ->defaultSort('date')
            ->filters([
                Tables\Filters\SelectFilter::make('statut')
                    ->options(['public' => 'Public', 'prive' => 'Privé']),
            ])
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAgendaEvents::route('/'),
            'create' => Pages\CreateAgendaEvent::route('/create'),
            'edit' => Pages\EditAgendaEvent::route('/{record}/edit'),
        ];
    }
}
