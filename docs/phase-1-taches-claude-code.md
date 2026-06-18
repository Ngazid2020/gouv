# Phase 1 — Fondations · Tâches pour Claude Code

À coller dans Claude Code. Objectif : poser le socle technique et importer les données de référence
(préfectures, communes, élus). Ne pas aborder les phases suivantes ici.

Référence : `docs/plan-de-conception.md` (modèle de données = section 4). Données réelles = `docs/maquette.html`.
Vérifie la dernière version stable de chaque paquet avant installation.

---

## 1. Initialisation du projet

- Créer une application Laravel 12 (PHP 8.3).
- Configurer `.env` pour PostgreSQL ; créer la base.
- Installer le starter kit Inertia + React avec SSR (ou Breeze React + Inertia), puis vérifier que
  `npm run dev` et le SSR fonctionnent.
- Installer et configurer Filament 3 (`php artisan filament:install --panels`), panneau `/admin`,
  créer un premier utilisateur admin.

## 2. Paquets de base

Installer puis publier/configurer :

- `spatie/laravel-permission` (rôles & permissions).
- `spatie/laravel-medialibrary` (médias — utilisé en phase 2/3, installer dès maintenant).
- `owen-it/laravel-auditing` (journal d'audit).
- `bezhanSalleh/filament-shield` (gestion des rôles dans Filament) — optionnel mais recommandé.

## 3. Rôles et permissions

Créer un seeder de rôles d'après la section 3 du plan :
`super-administrateur`, `administrateur`, `editeur`, `gestionnaire-territorial`, `referent-cabinet`.
Affecter le rôle `super-administrateur` à l'utilisateur admin créé. Mettre en place le filtrage
d'accès Filament selon le rôle.

## 4. Migrations (modèle de données, section 4)

Créer les migrations de la phase 1 :

- `prefectures` : `slug`, `nom`, `chef_lieu`, `couleur`, `est_capitale` (bool), `label_x`, `label_y`, `ordre`.
- `communes` : `slug`, `nom`, `prefecture_id` (FK), `est_chef_lieu` (bool), `couleur`, `svg_path` (text),
  `centroid_x`, `centroid_y`, `population`, `foyers`, `nb_conseillers`, `nb_villages`, `gouvernance` (text),
  `atouts` (json), `defis` (json).
- `elus` : `commune_id` (FK), `nom`, `role` (enum : `maire`, `1er_adjoint`, `2e_adjoint`, `conseiller`),
  `ordre`, `photo` (nullable).

Créer les models correspondants avec relations Eloquent (`Prefecture hasMany Communes`,
`Commune belongsTo Prefecture`, `Commune hasMany Elus`).

> Les autres tables (articles, medias, cabinet_members, agenda_events, contact_messages) seront créées
> en phase 2. Ne pas les faire ici.

## 5. Seeders des données de référence

Point le plus important : reprendre les vraies données depuis `docs/maquette.html`.

- `PrefectureSeeder` : importer les 8 préfectures depuis le tableau `PREF` de la maquette
  (id/slug, nom, chef-lieu, couleur, `est_capitale`, `label_x`/`label_y` = `labelX`/`labelY`).
- `CommuneSeeder` : importer les 28 communes depuis `ISLAND.communes` de la maquette :
  - `nom` = `name`, rattachement à la préfecture via le champ `pref`,
  - `svg_path` = `d` (le tracé exact, à conserver tel quel),
  - `centroid_x`/`centroid_y` = le couple `c`.
  - Les statistiques de la maquette étant générées aléatoirement, mettre `population`, `foyers`,
    `nb_conseillers`, `nb_villages` à `null` ou à 0 en attendant les chiffres réels (ne pas recopier
    les valeurs aléatoires). Marquer `est_chef_lieu` quand le nom correspond au chef-lieu de la préfecture.
- Élus : laisser vide pour l'instant (données réelles à fournir), ou créer un maire « À renseigner »
  par commune si un placeholder est utile.

Brancher ces seeders dans `DatabaseSeeder` et vérifier que `php artisan migrate:fresh --seed` passe.

## 6. Ressources Filament (squelette)

Créer les ressources de gestion territoriale (section 5) :

- `PrefectureResource` (formulaire + table, champs carte).
- `CommuneResource` avec un `RelationManager` pour les élus ; `atouts`/`defis` en `Repeater` ;
  `svg_path` en zone de texte (lecture/édition rare).

Restreindre leur accès aux rôles `administrateur` et `gestionnaire-territorial`.

## 7. Vérification de fin de phase

- `php artisan migrate:fresh --seed` fonctionne et remplit 8 préfectures + 28 communes.
- Connexion à `/admin`, navigation dans les communes, vérification qu'un `svg_path` est bien présent.
- `./vendor/bin/pint` et `php artisan test` passent.

Une fois validé, demander confirmation avant de passer à la **phase 2 (back-office contenu)**.
