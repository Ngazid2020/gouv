<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;
use Spatie\Permission\Models\Role;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-users';

    protected static \UnitEnum|string|null $navigationGroup = 'Administration';

    protected static ?int $navigationSort = 1;

    protected static ?string $label = 'Utilisateur';

    protected static ?string $pluralLabel = 'Utilisateurs';

    public static function canAccess(): bool
    {
        return auth()->user()?->hasAnyRole(['super-administrateur', 'administrateur']);
    }

    public static function form(Schema $schema): Schema
    {
        $isSuperAdmin = auth()->user()?->hasRole('super-administrateur');

        return $schema->schema([
            Section::make('Identité')->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nom')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('email')
                    ->label('Adresse e-mail')
                    ->email()
                    ->required()
                    ->unique(User::class, 'email', ignoreRecord: true)
                    ->maxLength(255),
            ])->columns(2),

            Section::make('Mot de passe')->schema([
                Forms\Components\TextInput::make('password')
                    ->label('Mot de passe')
                    ->password()
                    ->revealable()
                    ->dehydrated(fn ($state) => filled($state))
                    ->required(fn (string $operation): bool => $operation === 'create')
                    ->minLength(8)
                    ->confirmed()
                    ->maxLength(255),

                Forms\Components\TextInput::make('password_confirmation')
                    ->label('Confirmer le mot de passe')
                    ->password()
                    ->revealable()
                    ->dehydrated(false)
                    ->required(fn (string $operation): bool => $operation === 'create'),
            ])->columns(2),

            Section::make('Rôles')->schema([
                Forms\Components\Select::make('roles')
                    ->label('Rôle(s) attribué(s)')
                    ->multiple()
                    ->options(function () use ($isSuperAdmin) {
                        $roles = Role::pluck('name', 'name')->map(fn ($n) => roleLabel($n));
                        if (! $isSuperAdmin) {
                            $roles->forget('super-administrateur');
                        }

                        return $roles;
                    })
                    ->preload()
                    ->afterStateHydrated(function (Forms\Components\Select $component, ?User $record): void {
                        if ($record) {
                            $component->state($record->roles->pluck('name')->toArray());
                        }
                    })
                    ->saveRelationshipsUsing(function (User $record, array $state) {
                        $record->syncRoles($state);
                    })
                    ->helperText('Un utilisateur sans rôle ne peut pas accéder au back-office.'),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nom')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('roles.name')
                    ->label('Rôles')
                    ->badge()
                    ->color(fn (string $state) => match ($state) {
                        'super-administrateur' => 'danger',
                        'administrateur' => 'warning',
                        'editeur' => 'info',
                        'gestionnaire-territorial' => 'success',
                        'referent-cabinet' => 'gray',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state) => roleLabel($state)),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('roles')
                    ->label('Rôle')
                    ->relationship('roles', 'name')
                    ->options(Role::pluck('name', 'name')->map(fn ($n) => roleLabel($n))),
            ])
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->using(function (array $ids): void {
                            $currentId = auth()->id();
                            User::whereIn('id', $ids)
                                ->where('id', '!=', $currentId)
                                ->each(fn (User $u) => $u->delete());
                        }),
                ]),
            ])
            ->defaultSort('name');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}

function roleLabel(string $role): string
{
    return match ($role) {
        'super-administrateur' => 'Super-administrateur',
        'administrateur' => 'Administrateur',
        'editeur' => 'Éditeur',
        'gestionnaire-territorial' => 'Gestionnaire territorial',
        'referent-cabinet' => 'Référent cabinet',
        default => $role,
    };
}
