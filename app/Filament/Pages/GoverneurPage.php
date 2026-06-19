<?php

namespace App\Filament\Pages;

use App\Settings\GoverneurSettings;
use Filament\Forms;
use Filament\Pages\SettingsPage;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class GoverneurPage extends SettingsPage
{
    protected static string $settings = GoverneurSettings::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-user';

    protected static \UnitEnum|string|null $navigationGroup = 'Contenus';

    protected static ?int $navigationSort = 4;

    protected static ?string $navigationLabel = 'Contenus du Gouverneur';

    protected static ?string $title = 'Contenus du Gouverneur';

    public static function canAccess(): bool
    {
        return auth()->user()?->hasAnyRole([
            'super-administrateur', 'administrateur', 'editeur',
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Identité')->schema([
                Forms\Components\TextInput::make('nom')
                    ->label('Nom complet du Gouverneur')
                    ->placeholder('Ibrahim Mze Mohamed')
                    ->required(),

                Forms\Components\TextInput::make('titre_fonction')
                    ->label('Titre / Fonction')
                    ->placeholder("Gouverneur de l'île de Ngazidja"),
            ])->columns(2),

            Section::make('Photos')->schema([
                Forms\Components\FileUpload::make('portrait')
                    ->label('Portrait officiel — affiché dans le héros de la page d\'accueil')
                    ->helperText('Photo formelle, cadrage portrait (recommandé : 800 × 900 px minimum).')
                    ->image()
                    ->disk('public')
                    ->directory('gouverneur')
                    ->nullable(),

                Forms\Components\FileUpload::make('photo')
                    ->label('Photo du Gouverneur — affichée dans la section « Mot du Gouverneur »')
                    ->helperText('Photo en situation, cadrage paysage ou portrait libre.')
                    ->image()
                    ->disk('public')
                    ->directory('gouverneur')
                    ->nullable(),
            ])->columns(2),

            Forms\Components\RichEditor::make('biographie')
                ->label('Biographie')
                ->columnSpanFull()
                ->toolbarButtons(['bold', 'italic', 'underline', 'link', 'orderedList', 'bulletList', 'blockquote', 'h2', 'h3']),

            Forms\Components\RichEditor::make('vision')
                ->label('Vision')
                ->columnSpanFull()
                ->toolbarButtons(['bold', 'italic', 'underline', 'link', 'orderedList', 'bulletList', 'blockquote', 'h2', 'h3']),

            Forms\Components\Textarea::make('citation')
                ->label('Citation (mot du Gouverneur)')
                ->rows(4)
                ->columnSpanFull(),
        ]);
    }
}
