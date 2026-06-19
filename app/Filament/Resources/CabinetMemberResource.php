<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CabinetMemberResource\Pages;
use App\Models\CabinetMember;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class CabinetMemberResource extends Resource
{
    protected static ?string $model = CabinetMember::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-user-group';

    protected static \UnitEnum|string|null $navigationGroup = 'Cabinet';

    protected static ?int $navigationSort = 1;

    protected static ?string $label = 'Membre du cabinet';

    protected static ?string $pluralLabel = 'Cabinet';

    public static function canAccess(): bool
    {
        return auth()->user()?->hasAnyRole([
            'super-administrateur', 'administrateur', 'referent-cabinet',
        ]);
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Identité')->schema([
                Forms\Components\TextInput::make('nom')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(100),

                Forms\Components\TextInput::make('role')
                    ->required()
                    ->maxLength(255),

                Forms\Components\Select::make('niveau')
                    ->options([
                        'gouverneur' => 'Gouverneur',
                        'direction' => 'Direction',
                        'conseiller' => 'Conseiller',
                        'support' => 'Support',
                    ])
                    ->required(),

                Forms\Components\TextInput::make('ordre')
                    ->numeric()
                    ->default(0),
            ])->columns(2),

            Section::make('Contact & Photo')->schema([
                Forms\Components\TextInput::make('email')
                    ->email()
                    ->nullable(),

                Forms\Components\TextInput::make('telephone')
                    ->tel()
                    ->nullable(),

                Forms\Components\FileUpload::make('photo')
                    ->image()
                    ->disk('public')
                    ->directory('cabinet')
                    ->nullable()
                    ->columnSpanFull(),
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

                Tables\Columns\TextColumn::make('role')
                    ->searchable(),

                Tables\Columns\TextColumn::make('niveau')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'gouverneur' => 'danger',
                        'direction' => 'warning',
                        'conseiller' => 'info',
                        default => 'gray',
                    }),

                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->placeholder('—'),

                Tables\Columns\TextColumn::make('ordre')
                    ->sortable(),
            ])
            ->defaultSort('ordre')
            ->filters([
                Tables\Filters\SelectFilter::make('niveau')
                    ->options([
                        'gouverneur' => 'Gouverneur',
                        'direction' => 'Direction',
                        'conseiller' => 'Conseiller',
                        'support' => 'Support',
                    ]),
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
            'index' => Pages\ListCabinetMembers::route('/'),
            'create' => Pages\CreateCabinetMember::route('/create'),
            'edit' => Pages\EditCabinetMember::route('/{record}/edit'),
        ];
    }
}
