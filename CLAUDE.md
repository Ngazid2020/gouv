# CLAUDE.md — Portail du Gouvernorat de Ngazidja

Instructions de travail pour Claude Code sur ce dépôt.

## Référence principale

Le plan de conception fait foi : `docs/plan-de-conception.md`. Avant toute tâche, le consulter
(modèle de données en section 4, ressources Filament en section 5, charte en section 7, phasage en section 11).

La maquette HTML d'origine est dans `docs/maquette.html`. Elle contient les **données réelles à reprendre**
(tracés SVG des communes dans `ISLAND.communes`, liste des préfectures dans `PREF`, couleurs, polices).
Ne pas inventer ces données : les extraire de la maquette.

## Décisions arrêtées (modifiables)

- Base de données : **PostgreSQL**.
- Frontend public : **Inertia.js + React + SSR**.
- Back-office : **Filament 3**, un seul panneau `/admin`, accès filtré par rôle.
- Stockage médias : disque **local** en développement, **S3** en production.
- Langue : **français** uniquement pour l'instant, mais coder en restant compatible i18n
  (chaînes traduisibles, pas de texte en dur dans les composants quand c'est évitable).
- Rôles : `spatie/laravel-permission`.

## Méthode de travail

- Avancer **phase par phase** (voir section 11 du plan), pas tout d'un coup. Attendre la validation
  d'une phase avant la suivante.
- Toujours vérifier la **dernière version stable** des paquets avant `composer require` / `npm install` ;
  les versions citées dans les tâches sont indicatives.
- Migrations explicites et nommées clairement ; un seeder par jeu de données de référence.
- Respecter la charte graphique de la section 7 (couleurs, Fraunces / Instrument Sans / Archivo, rayons,
  boutons en pilule) en tokens Tailwind, pas en valeurs codées en dur dispersées.

## Conventions de code

- PHP 8.3, typage strict, suivre les conventions Laravel (Pint pour le formatage).
- Models au singulier, tables au pluriel ; relations Eloquent explicites.
- Composants React fonctionnels, un composant par fichier, nommage en PascalCase.
- Pas de logique métier dans les contrôleurs : passer par des Actions / Services si elle dépasse quelques lignes.
- Écrire des tests (Pest) pour les règles métier et les Policies.

## Commandes utiles

```bash
composer install && npm install
php artisan migrate:fresh --seed
npm run dev            # développement (Vite)
php artisan test       # tests
./vendor/bin/pint      # formatage PHP
```

## À ne pas faire

- Ne pas committer de secrets ni le `.env`.
- Ne pas générer de fausses photos ni de faux tracés de carte : utiliser les données de la maquette
  et des emplacements (placeholders) explicites là où les visuels réels manquent.
- Ne pas transformer le formulaire de contact en `mailto` : envoi côté serveur (cf. section 6 du plan).
