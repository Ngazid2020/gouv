<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MediaResource\Pages;
use App\Models\Article;
use App\Models\Media;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class MediaResource extends Resource
{
    protected static ?string $model = Media::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-photo';

    protected static \UnitEnum|string|null $navigationGroup = 'Contenus';

    protected static ?int $navigationSort = 2;

    protected static ?string $label = 'Média';

    protected static ?string $pluralLabel = 'Médiathèque';

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
                Forms\Components\Select::make('type')
                    ->options([
                        'discours' => 'Discours',
                        'citation' => 'Citation',
                        'galerie' => 'Galerie (photo / vidéo)',
                        'document' => 'Document',
                    ])
                    ->required(),

                Forms\Components\TextInput::make('titre')
                    ->required()
                    ->maxLength(255),

                Forms\Components\Select::make('article_id')
                    ->label('Article lié (optionnel)')
                    ->options(Article::pluck('titre', 'id'))
                    ->searchable()
                    ->nullable(),

                Forms\Components\Toggle::make('dans_mediatheque')
                    ->label('Dans la médiathèque'),

                Forms\Components\TextInput::make('ordre')
                    ->numeric()
                    ->default(0),
            ])->columns(2),

            Section::make('Fichier ou URL')->schema([
                Forms\Components\FileUpload::make('chemin')
                    ->label('Fichier (photo / infographie)')
                    ->disk('public')
                    ->directory('medias')
                    ->image()
                    ->nullable(),

                Forms\Components\TextInput::make('url')
                    ->label('URL (vidéo hébergée)')
                    ->url()
                    ->nullable(),
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

                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'discours' => 'danger',
                        'citation' => 'warning',
                        'galerie' => 'info',
                        'document' => 'success',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'discours' => 'Discours',
                        'citation' => 'Citation',
                        'galerie' => 'Galerie',
                        'document' => 'Document',
                        default => $state,
                    }),

                Tables\Columns\IconColumn::make('dans_mediatheque')
                    ->boolean()
                    ->label('Médiathèque'),

                Tables\Columns\TextColumn::make('article.titre')
                    ->label('Article')
                    ->limit(30)
                    ->placeholder('—'),

                Tables\Columns\TextColumn::make('ordre')
                    ->sortable(),
            ])
            ->defaultSort('ordre')
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'discours' => 'Discours',
                        'citation' => 'Citation',
                        'galerie' => 'Galerie',
                        'document' => 'Document',
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
            'index' => Pages\ListMedias::route('/'),
            'create' => Pages\CreateMedia::route('/create'),
            'edit' => Pages\EditMedia::route('/{record}/edit'),
        ];
    }
}
