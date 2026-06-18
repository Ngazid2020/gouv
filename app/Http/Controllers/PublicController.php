<?php

namespace App\Http\Controllers;

use App\Models\AgendaEvent;
use App\Models\Article;
use App\Models\CabinetMember;
use App\Models\Commune;
use App\Models\Media;
use App\Models\Prefecture;
use App\Settings\GoverneurSettings;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    public function home(GoverneurSettings $settings): Response
    {
        $communes = Commune::with('prefecture')
            ->select('id', 'slug', 'nom', 'svg_path', 'centroid_x', 'centroid_y', 'prefecture_id')
            ->get()
            ->map(fn ($c) => [
                'id' => $c->id,
                'slug' => $c->slug,
                'nom' => $c->nom,
                'svg_path' => $c->svg_path,
                'centroid_x' => $c->centroid_x,
                'centroid_y' => $c->centroid_y,
                'couleur' => $c->prefecture?->couleur,
                'prefecture' => $c->prefecture?->nom,
                'prefecture_id' => $c->prefecture_id,
            ]);

        $prefectures = Prefecture::select('id', 'nom', 'couleur', 'label_x', 'label_y', 'chef_lieu')->get();

        $actualites = Article::where('statut', 'publie')
            ->orderByDesc('date_publication')
            ->limit(3)
            ->get(['id', 'slug', 'type', 'categorie', 'titre', 'extrait', 'date_publication', 'est_a_la_une', 'media_principal']);

        $evenements = AgendaEvent::where('statut', 'public')
            ->where('date', '>=', now())
            ->orderBy('date')
            ->limit(3)
            ->get(['id', 'titre', 'date', 'lieu']);

        return Inertia::render('Home', [
            'citation' => $settings->citation,
            'communes' => $communes,
            'prefectures' => $prefectures,
            'actualites' => $actualites,
            'evenements' => $evenements,
        ]);
    }

    public function gouverneur(GoverneurSettings $settings): Response
    {
        return Inertia::render('Gouverneur', [
            'biographie' => $settings->biographie,
            'vision' => $settings->vision,
            'citation' => $settings->citation,
        ]);
    }

    public function cabinet(): Response
    {
        $membres = CabinetMember::orderBy('niveau')->orderBy('ordre')
            ->get(['id', 'slug', 'nom', 'role', 'niveau', 'email', 'telephone', 'photo', 'ordre']);

        return Inertia::render('Cabinet', ['membres' => $membres]);
    }

    public function communes(): Response
    {
        $communes = Commune::with('prefecture')
            ->get()
            ->map(fn ($c) => [
                'id' => $c->id,
                'slug' => $c->slug,
                'nom' => $c->nom,
                'svg_path' => $c->svg_path,
                'centroid_x' => $c->centroid_x,
                'centroid_y' => $c->centroid_y,
                'couleur' => $c->prefecture?->couleur,
                'prefecture' => $c->prefecture?->nom,
            ]);

        $prefectures = Prefecture::select('id', 'nom', 'couleur', 'label_x', 'label_y')->get();

        return Inertia::render('Communes', [
            'communes' => $communes,
            'prefectures' => $prefectures,
        ]);
    }

    public function commune(string $slug): Response
    {
        $commune = Commune::with(['prefecture', 'elus'])
            ->where('slug', $slug)
            ->firstOrFail();

        $articles = Article::where('statut', 'publie')
            ->where('commune_id', $commune->id)
            ->orderByDesc('date_publication')
            ->limit(4)
            ->get(['id', 'slug', 'titre', 'extrait', 'date_publication', 'type', 'categorie']);

        return Inertia::render('Commune', [
            'commune' => $commune,
            'articles' => $articles,
        ]);
    }

    public function actualites(): Response
    {
        $articles = Article::where('statut', 'publie')
            ->orderByDesc('date_publication')
            ->paginate(9, ['id', 'slug', 'type', 'categorie', 'titre', 'extrait', 'date_publication', 'est_a_la_une', 'media_principal']);

        $categories = Article::where('statut', 'publie')
            ->distinct()
            ->pluck('categorie')
            ->filter()
            ->values();

        return Inertia::render('Actualites', [
            'articles' => $articles,
            'categories' => $categories,
        ]);
    }

    public function article(string $slug): Response
    {
        $article = Article::with('medias')
            ->where('statut', 'publie')
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Article', ['article' => $article]);
    }

    public function mediatheque(): Response
    {
        $medias = Media::where('dans_mediatheque', true)
            ->orderBy('ordre')
            ->get(['id', 'type', 'titre', 'chemin', 'url']);

        $grouped = $medias->groupBy('type');

        return Inertia::render('Mediatheque', ['medias' => $grouped]);
    }

    public function agenda(): Response
    {
        $evenements = AgendaEvent::where('statut', 'public')
            ->orderBy('date')
            ->get(['id', 'titre', 'date', 'lieu', 'description']);

        return Inertia::render('Agenda', ['evenements' => $evenements]);
    }

    public function contact(): Response
    {
        $membres = CabinetMember::select('id', 'slug', 'nom', 'role', 'email')
            ->orderBy('niveau')
            ->orderBy('ordre')
            ->get();

        return Inertia::render('Contact', ['membres' => $membres]);
    }
}
