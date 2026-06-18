<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CommuneResource\Pages;
use App\Models\Commune;
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

class CommuneResource extends Resource
{
    protected static ?string $model = Commune::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-building-office-2';

    protected static \UnitEnum|string|null $navigationGroup = 'Territoire';

    protected static ?int $navigationSort = 2;

    protected static ?string $label = 'Commune';

    protected static ?string $pluralLabel = 'Communes';

    public static function canAccess(): bool
    {
        return auth()->user()?->hasAnyRole(['super-administrateur', 'administrateur', 'gestionnaire-territorial']);
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Identification')->schema([
                Forms\Components\TextInput::make('nom')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(100),

                Forms\Components\Select::make('prefecture_id')
                    ->label('Préfecture')
                    ->options(Prefecture::pluck('nom', 'id'))
                    ->required()
                    ->searchable(),

                Forms\Components\Toggle::make('est_chef_lieu')
                    ->label('Chef-lieu de préfecture'),

                Forms\Components\ColorPicker::make('couleur'),
            ])->columns(2),

            Section::make('Carte SVG')->schema([
                Forms\Components\Textarea::make('svg_path')
                    ->label('Tracé SVG (attribut d=)')
                    ->rows(4)
                    ->required(),

                Forms\Components\TextInput::make('centroid_x')
                    ->label('Centroïde X')
                    ->numeric(),

                Forms\Components\TextInput::make('centroid_y')
                    ->label('Centroïde Y')
                    ->numeric(),
            ])->columns(2),

            Section::make('Statistiques')->schema([
                Forms\Components\TextInput::make('population')->numeric(),
                Forms\Components\TextInput::make('foyers')->numeric(),
                Forms\Components\TextInput::make('nb_conseillers')->label('Nb conseillers')->numeric(),
                Forms\Components\TextInput::make('nb_villages')->label('Nb villages')->numeric(),
                Forms\Components\Textarea::make('gouvernance')->rows(3)->columnSpanFull(),
            ])->columns(2),

            Section::make('Atouts & Défis')->schema([
                Forms\Components\Repeater::make('atouts')
                    ->label('Atouts')
                    ->schema([
                        Forms\Components\TextInput::make('valeur')->label('')->required(),
                    ])
                    ->addActionLabel('Ajouter un atout')
                    ->columnSpan(1),

                Forms\Components\Repeater::make('defis')
                    ->label('Défis')
                    ->schema([
                        Forms\Components\TextInput::make('valeur')->label('')->required(),
                    ])
                    ->addActionLabel('Ajouter un défi')
                    ->columnSpan(1),
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

                Tables\Columns\TextColumn::make('prefecture.nom')
                    ->label('Préfecture')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\IconColumn::make('est_chef_lieu')
                    ->boolean()
                    ->label('Chef-lieu'),

                Tables\Columns\IconColumn::make('has_svg')
                    ->label('Carte SVG')
                    ->boolean()
                    ->getStateUsing(fn ($record) => ! empty($record->svg_path)),

                Tables\Columns\TextColumn::make('population')
                    ->numeric()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('prefecture_id')
                    ->label('Préfecture')
                    ->options(Prefecture::pluck('nom', 'id'))
                    ->searchable(),
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

    public static function getRelations(): array
    {
        return [
            CommuneResource\RelationManagers\ElusRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCommunes::route('/'),
            'create' => Pages\CreateCommune::route('/create'),
            'edit' => Pages\EditCommune::route('/{record}/edit'),
        ];
    }
}
