<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactMessageResource\Pages;
use App\Models\CabinetMember;
use App\Models\ContactMessage;
use Filament\Actions\Action;
use Filament\Actions\ViewAction;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class ContactMessageResource extends Resource
{
    protected static ?string $model = ContactMessage::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-inbox';

    protected static \UnitEnum|string|null $navigationGroup = 'Cabinet';

    protected static ?int $navigationSort = 2;

    protected static ?string $label = 'Message';

    protected static ?string $pluralLabel = 'Messages de contact';

    public static function canAccess(): bool
    {
        return auth()->user()?->hasAnyRole([
            'super-administrateur', 'administrateur', 'referent-cabinet',
        ]);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function infolist(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make()->schema([
                TextEntry::make('nom')->label('Expéditeur'),
                TextEntry::make('email'),
                TextEntry::make('objet'),
                TextEntry::make('cabinetMember.nom')->label('Destinataire'),
                TextEntry::make('statut')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'nouveau' => 'warning',
                        'traite' => 'success',
                    }),
                TextEntry::make('created_at')->label('Reçu le')->dateTime('d/m/Y H:i'),
                TextEntry::make('message')->columnSpanFull(),
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

                Tables\Columns\TextColumn::make('email')
                    ->searchable(),

                Tables\Columns\TextColumn::make('objet')
                    ->searchable()
                    ->limit(40),

                Tables\Columns\TextColumn::make('cabinetMember.nom')
                    ->label('Destinataire')
                    ->searchable(),

                Tables\Columns\TextColumn::make('statut')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'nouveau' => 'warning',
                        'traite' => 'success',
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Reçu le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('statut')
                    ->options(['nouveau' => 'Nouveau', 'traite' => 'Traité']),

                Tables\Filters\SelectFilter::make('cabinet_member_id')
                    ->label('Destinataire')
                    ->options(CabinetMember::pluck('nom', 'id')),
            ])
            ->actions([
                ViewAction::make(),
                Action::make('marquer_traite')
                    ->label('Marquer traité')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->action(fn (ContactMessage $record) => $record->update(['statut' => 'traite']))
                    ->visible(fn (ContactMessage $record) => $record->statut === 'nouveau'),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactMessages::route('/'),
        ];
    }
}
