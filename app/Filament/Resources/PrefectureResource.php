<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PrefectureResource\Pages;
use App\Models\Prefecture;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class PrefectureResource extends Resource
{
    protected static ?string $model = Prefecture::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-map';

    protected static \UnitEnum|string|null $navigationGroup = 'Territoire';

    protected static ?int $navigationSort = 1;

    protected static ?string $label = 'Préfecture';

    protected static ?string $pluralLabel = 'Préfectures';

    public static function canAccess(): bool
    {
        return auth()->user()?->hasAnyRole(['super-administrateur', 'administrateur', 'gestionnaire-territorial']);
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make()->schema([
                Forms\Components\TextInput::make('nom')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(100),

                Forms\Components\TextInput::make('chef_lieu')
                    ->required()
                    ->maxLength(255),

                Forms\Components\ColorPicker::make('couleur')
                    ->required(),

                Forms\Components\Toggle::make('est_capitale')
                    ->label('Capitale'),

                Forms\Components\TextInput::make('label_x')
                    ->label('Position X (carte)')
                    ->numeric(),

                Forms\Components\TextInput::make('label_y')
                    ->label('Position Y (carte)')
                    ->numeric(),

                Forms\Components\TextInput::make('ordre')
                    ->numeric()
                    ->default(0),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nom')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('chef_lieu')
                    ->searchable(),

                Tables\Columns\ColorColumn::make('couleur'),

                Tables\Columns\IconColumn::make('est_capitale')
                    ->boolean()
                    ->label('Capitale'),

                Tables\Columns\TextColumn::make('communes_count')
                    ->counts('communes')
                    ->label('Communes'),

                Tables\Columns\TextColumn::make('ordre')
                    ->sortable(),
            ])
            ->defaultSort('ordre')
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            PrefectureResource\RelationManagers\CommunesRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPrefectures::route('/'),
            'create' => Pages\CreatePrefecture::route('/create'),
            'edit' => Pages\EditPrefecture::route('/{record}/edit'),
        ];
    }
}
