<?php

namespace App\Filament\Widgets;

use App\Models\AgendaEvent;
use App\Models\Article;
use App\Models\ContactMessage;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Articles publiés', Article::where('statut', 'publie')->count())
                ->icon('heroicon-o-newspaper')
                ->color('success'),

            Stat::make('Messages nouveaux', ContactMessage::where('statut', 'nouveau')->count())
                ->icon('heroicon-o-inbox')
                ->color('warning'),

            Stat::make('Événements à venir', AgendaEvent::where('date', '>=', now())->count())
                ->icon('heroicon-o-calendar-days')
                ->color('info'),
        ];
    }
}
