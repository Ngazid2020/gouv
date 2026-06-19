<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ArticleResource\Pages;
use App\Models\Article;
use App\Models\Commune;
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

class ArticleResource extends Resource
{
    protected static ?string $model = Article::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-newspaper';

    protected static \UnitEnum|string|null $navigationGroup = 'Contenus';

    protected static ?int $navigationSort = 1;

    protected static ?string $label = 'Article';

    protected static ?string $pluralLabel = 'Articles';

    public static function canAccess(): bool
    {
        return auth()->user()?->hasAnyRole([
            'super-administrateur', 'administrateur', 'editeur',
        ]);
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Identification')->schema([
                Forms\Components\TextInput::make('titre')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),

                Forms\Components\Select::make('type')
                    ->options(['video' => 'Vidéo', 'photo' => 'Photo', 'info' => 'Infographie'])
                    ->required(),

                Forms\Components\TextInput::make('categorie')
                    ->required()
                    ->maxLength(100),

                Forms\Components\Select::make('commune_id')
                    ->label('Commune (optionnel)')
                    ->options(Commune::pluck('nom', 'id'))
                    ->searchable()
                    ->nullable(),

                Forms\Components\Toggle::make('est_a_la_une')
                    ->label('À la une'),
            ])->columns(2),

            Section::make('Publication')->schema([
                Forms\Components\Select::make('statut')
                    ->options(['brouillon' => 'Brouillon', 'publie' => 'Publié'])
                    ->required()
                    ->default('brouillon'),

                Forms\Components\DateTimePicker::make('date_publication')
                    ->label('Date de publication')
                    ->nullable(),

                Forms\Components\Hidden::make('user_id')
                    ->default(fn () => auth()->id()),
            ])->columns(2),

            Section::make('Contenu')->schema([
                Forms\Components\Textarea::make('extrait')
                    ->rows(3)
                    ->columnSpanFull(),

                Forms\Components\RichEditor::make('contenu')
                    ->columnSpanFull()
                    ->toolbarButtons([
                        'bold', 'italic', 'underline', 'strike',
                        'link', 'orderedList', 'bulletList',
                        'blockquote', 'h2', 'h3',
                    ]),
            ]),

            Section::make('Image principale')->schema([
                Forms\Components\FileUpload::make('media_principal')
                    ->label('Image principale')
                    ->image()
                    ->disk('public')
                    ->directory('articles')
                    ->nullable()
                    ->columnSpanFull(),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('titre')
                    ->searchable()
                    ->sortable()
                    ->limit(50),

                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'video' => 'danger',
                        'photo' => 'info',
                        'info' => 'success',
                    }),

                Tables\Columns\TextColumn::make('categorie')
                    ->searchable(),

                Tables\Columns\TextColumn::make('statut')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'publie' => 'success',
                        default => 'gray',
                    }),

                Tables\Columns\IconColumn::make('est_a_la_une')
                    ->boolean()
                    ->label('Une'),

                Tables\Columns\TextColumn::make('date_publication')
                    ->dateTime('d/m/Y')
                    ->sortable(),
            ])
            ->defaultSort('date_publication', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options(['video' => 'Vidéo', 'photo' => 'Photo', 'info' => 'Infographie']),

                Tables\Filters\SelectFilter::make('statut')
                    ->options(['brouillon' => 'Brouillon', 'publie' => 'Publié']),

                Tables\Filters\SelectFilter::make('categorie')
                    ->options(fn () => Article::distinct()->pluck('categorie', 'categorie')->toArray()),
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
            'index' => Pages\ListArticles::route('/'),
            'create' => Pages\CreateArticle::route('/create'),
            'edit' => Pages\EditArticle::route('/{record}/edit'),
        ];
    }
}
