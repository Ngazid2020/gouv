# Phase 2 — Back-office contenu · Tâches pour Claude Code

À coller dans Claude Code une fois la phase 1 validée. Objectif : gérer dans Filament tous les contenus
éditoriaux du portail (actualités, médiathèque, cabinet, agenda, contenus du Gouverneur).
Ne pas aborder le site public (phase 3) ni le formulaire de contact serveur (phase 4) ici.

Référence : `docs/plan-de-conception.md` (modèle de données = section 4, ressources = section 5,
rôles = section 3). Données de démonstration reprenables dans `docs/maquette.html` (`ARTICLES`, `CABINET`, `AGENDA`).
Vérifie la dernière version stable de chaque paquet avant installation.

---

## 1. Migrations et models

Créer les migrations restantes (section 4 du plan) :

- `articles` : `slug`, `type` (enum : `video`, `photo`, `info`), `categorie`, `titre`, `extrait`,
  `contenu` (text/rich), `date_publication` (datetime), `est_a_la_une` (bool), `commune_id` (FK nullable),
  `statut` (enum : `brouillon`, `publie`), `user_id` (FK auteur), `media_principal` (nullable).
- `medias` : `type` (enum : `photo`, `video`, `infographie`), `titre`, `chemin`/`url`,
  `article_id` (FK nullable), `dans_mediatheque` (bool), `ordre`.
- `cabinet_members` : `slug`, `nom`, `role`, `niveau` (enum : `gouverneur`, `direction`, `conseiller`,
  `support`), `email`, `telephone` (nullable), `photo` (nullable), `ordre`.
- `agenda_events` : `titre`, `date` (datetime), `lieu`, `statut` (enum : `public`, `prive`), `description` (text).
- `contact_messages` : `cabinet_member_id` (FK), `nom`, `email`, `objet`, `message`,
  `statut` (enum : `nouveau`, `traite`), timestamps.

Créer les models avec relations Eloquent :
`Article belongsTo User`, `Article belongsTo Commune` (nullable), `Article hasMany Media`,
`CabinetMember hasMany ContactMessage`. Activer l'audit (`owen-it/laravel-auditing`) sur `Article`,
`CabinetMember` et `AgendaEvent`.

## 2. Contenus du Gouverneur (réglages)

Installer `spatie/laravel-settings` (ou utiliser une page Filament dédiée avec un enregistrement unique).
Créer un groupe de réglages « Gouverneur » : `biographie` (rich), `vision` (rich), `citation` (text).
Exposer une page Filament d'édition de ces réglages.

## 3. Ressources Filament

Créer les ressources (section 5 du plan) :

- `ArticleResource` : éditeur riche pour `contenu`, sélecteurs `type` et `categorie`, bascule
  `est_a_la_une`, rattachement commune optionnel, `statut` + `date_publication` (planification),
  auteur renseigné automatiquement (utilisateur connecté). Table filtrable par type, catégorie et statut.
- `MediaResource` : upload via `spatie/laravel-medialibrary`, `type`, `ordre`, bascule `dans_mediatheque`,
  rattachement article optionnel.
- `CabinetMemberResource` : champs `niveau` + `ordre` (pour reconstituer l'organigramme),
  email, téléphone, photo.
- `AgendaEventResource` : date, lieu, statut public/privé, description.
- `ContactMessageResource` : **en lecture seule** (boîte de réception), action « marquer comme traité »,
  filtre par statut. Pas de création manuelle.

## 4. Permissions par rôle

Aligner la visibilité des ressources sur les rôles (section 3) :

- `editeur` : `ArticleResource`, `MediaResource`, `AgendaEventResource`, page Contenus du Gouverneur.
- `referent-cabinet` : `CabinetMemberResource`, `ContactMessageResource`.
- `administrateur` / `super-administrateur` : tout.

## 5. Seeders de démonstration (optionnel mais utile)

Pour pouvoir tester l'affichage en phase 3 :

- `ArticleSeeder` : reprendre les 6 articles de `ARTICLES` dans la maquette (type, catégorie, date,
  titre, extrait, `est_a_la_une`), en statut `publie`. Les marquer clairement comme contenu de démonstration.
- `CabinetSeeder` : reprendre la structure de `CABINET` (Gouverneur « Ibrahim Mze Mohamed » + rôles) ;
  laisser « À renseigner » là où la maquette ne fournit pas de nom.
- `AgendaSeeder` : reprendre les événements de `AGENDA` (titre, lieu, statut public/privé), avec des dates
  futures cohérentes.

Brancher dans `DatabaseSeeder` et vérifier que `migrate:fresh --seed` passe.

## 6. Tableau de bord Filament

Ajouter des widgets : nombre d'articles publiés, derniers messages de contact reçus,
prochains événements de l'agenda.

## 7. Vérification de fin de phase

- `php artisan migrate:fresh --seed` remplit articles, cabinet et agenda de démonstration.
- Dans `/admin` : créer/éditer un article (brouillon → publié), ajouter un membre du cabinet,
  un événement, vérifier la boîte de réception (vide pour l'instant) et la page Contenus du Gouverneur.
- Les filtres d'accès par rôle fonctionnent (tester avec un compte `editeur` et un compte `referent-cabinet`).
- `./vendor/bin/pint` et `php artisan test` passent.

Une fois validé, demander confirmation avant de passer à la **phase 3 (site public Inertia + React)**.
