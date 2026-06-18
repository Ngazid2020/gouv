<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Models\Commune;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';

    protected $description = 'Générer le sitemap.xml du portail public';

    public function handle(): int
    {
        $sitemap = Sitemap::create();

        $statics = [
            '/' => ['priority' => '1.0', 'freq' => 'weekly'],
            '/gouverneur' => ['priority' => '0.8', 'freq' => 'monthly'],
            '/cabinet' => ['priority' => '0.7', 'freq' => 'monthly'],
            '/communes' => ['priority' => '0.8', 'freq' => 'monthly'],
            '/actualites' => ['priority' => '0.9', 'freq' => 'daily'],
            '/mediatheque' => ['priority' => '0.6', 'freq' => 'weekly'],
            '/agenda' => ['priority' => '0.7', 'freq' => 'weekly'],
            '/contact' => ['priority' => '0.5', 'freq' => 'yearly'],
        ];

        foreach ($statics as $path => $meta) {
            $sitemap->add(
                Url::create(config('app.url').$path)
                    ->setPriority((float) $meta['priority'])
                    ->setChangeFrequency($meta['freq'])
            );
        }

        Commune::select('slug', 'updated_at')->each(function (Commune $commune) use ($sitemap): void {
            $sitemap->add(
                Url::create(config('app.url')."/communes/{$commune->slug}")
                    ->setLastModificationDate($commune->updated_at)
                    ->setPriority(0.7)
                    ->setChangeFrequency('monthly')
            );
        });

        Article::where('statut', 'publie')
            ->select('slug', 'date_publication', 'updated_at')
            ->each(function (Article $article) use ($sitemap): void {
                $sitemap->add(
                    Url::create(config('app.url')."/actualites/{$article->slug}")
                        ->setLastModificationDate($article->updated_at)
                        ->setPriority(0.8)
                        ->setChangeFrequency('never')
                );
            });

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('sitemap.xml généré avec succès.');

        return self::SUCCESS;
    }
}
