<?php

namespace App\Filament\Resources\CommuneResource\RelationManagers;

use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class ElusRelationManager extends RelationManager
{
    protected static string $relationship = 'elus';

    protected static ?string $title = 'Élus';

    public function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\TextInput::make('nom')
                ->required()
                ->maxLength(255),

            Forms\Components\Select::make('role')
                ->options([
                    'maire' => 'Maire',
                    '1er_adjoint' => '1er Adjoint',
                    '2e_adjoint' => '2e Adjoint',
                    'conseiller' => 'Conseiller',
                ])
                ->required(),

            Forms\Components\TextInput::make('ordre')
                ->numeric()
                ->default(0),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nom'),
                Tables\Columns\TextColumn::make('role')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'maire' => 'success',
                        '1er_adjoint' => 'info',
                        '2e_adjoint' => 'warning',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('ordre')->sortable(),
            ])
            ->defaultSort('ordre')
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->headerActions([
                CreateAction::make()
                ->label('Nouvel élu'),
            ]);
    }
}
