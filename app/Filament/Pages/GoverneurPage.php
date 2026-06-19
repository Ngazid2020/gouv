<?php

namespace App\Filament\Pages;

use App\Settings\GoverneurSettings;
use Filament\Forms;
use Filament\Pages\SettingsPage;
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
            Forms\Components\FileUpload::make('photo')
                ->label('Photo officielle du Gouverneur')
                ->image()
                ->disk('public')
                ->directory('gouverneur')
                ->nullable()
                ->columnSpanFull(),

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
