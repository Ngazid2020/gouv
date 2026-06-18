<?php

namespace App\Filament\Resources\PrefectureResource\RelationManagers;

use Filament\Actions\EditAction;
use Filament\Forms;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class CommunesRelationManager extends RelationManager
{
    protected static string $relationship = 'communes';

    protected static ?string $title = 'Communes';

    public function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\TextInput::make('nom')->required(),
            Forms\Components\TextInput::make('slug')->required(),
            Forms\Components\Toggle::make('est_chef_lieu')->label('Chef-lieu'),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nom')->searchable(),
                Tables\Columns\IconColumn::make('est_chef_lieu')->boolean()->label('Chef-lieu'),
                Tables\Columns\TextColumn::make('population')->numeric(),
            ])
            ->actions([
                EditAction::make(),
            ]);
    }
}
