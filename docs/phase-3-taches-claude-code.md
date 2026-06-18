# Phase 3 — Site public (Inertia + React) · Tâches pour Claude Code

À coller dans Claude Code une fois la phase 2 validée. Objectif : construire le site public consultable,
fidèle à la maquette, en Inertia + React (SSR), alimenté par les contenus gérés dans Filament.
Le formulaire de contact côté serveur et le sitemap relèvent de la phase 4 : ici on construit l'UI
du formulaire, pas son envoi.

Référence : `docs/plan-de-conception.md` (pages & routes = section 6, charte = section 7).
La maquette `docs/maquette.html` est la référence visuelle exacte (mise en page, carte SVG, composants).
Vérifie la dernière version stable de chaque paquet avant installation.

---

## 1. Charte graphique et fondations UI

- Configurer les tokens Tailwind d'après la section 7 du plan : couleurs (bleu nuit `#071A33`,
  bleu Ngazidja `#08457E`, bleu actif `#14609E`, azur `#2E8FD6`, azur pâle `#E8F1FA`, or `#C8A24A`,
  or clair `#E3C878`, vert `#1F7A5C`), polices (Fraunces titres, Instrument Sans corps, Archivo labels),
  rayons (`18px` / `12px`), boutons en pilule, ombres douces.
- Charger les polices (Fontsource ou Google Fonts) et les déclarer dans Tailwind.
- Créer un `Layout` partagé : en-tête avec navigation, pied de page. Reprendre la structure de la maquette.
- Partager via le middleware Inertia (`HandleInertiaRequests`) les données globales utiles
  (éléments de navigation, citation du Gouverneur si affichée dans l'en-tête/pied de page).

## 2. Routes et contrôleurs

Créer les routes web et contrôleurs renvoyant des réponses Inertia (section 6) :

| Route | Données à passer en props |
|-------|---------------------------|
| `/` | Citation du Gouverneur, communes (pour la carte), 3 dernières actualités publiées, prochains événements. |
| `/gouverneur` | Réglages Gouverneur (bio, vision, citation). |
| `/cabinet` | Membres du cabinet triés par `niveau` puis `ordre`. |
| `/communes` | Toutes les communes (avec `svg_path`, `centroid`, couleur de préfecture) + préfectures. |
| `/commune/{slug}` | Commune + élus + articles rattachés. |
| `/actualites` | Articles publiés paginés, filtrables par catégorie. |
| `/article/{slug}` | Article + médias associés. |
| `/mediatheque` | Médias `dans_mediatheque` groupés par type. |
| `/agenda` | Événements publics, triés par date. |
| `/contact` | Liste des membres du cabinet (destinataires). |

Important : ne servir que les contenus **publiés** côté public (filtrer `statut = publie`,
événements `statut = public`).

## 3. Pages et composants React

Créer une page Inertia par route et les composants réutilisables (section 6) :
`CarteNgazidja`, `FicheCommune`, `OrganigrammeCabinet`, `FiltreActualites`, `MediathequeTabs`,
`FormulaireContact` (UI seulement à ce stade).

Respecter fidèlement la mise en page de la maquette (héro d'accueil, cartes d'actualités,
organigramme, onglets médiathèque, agenda).

## 4. Carte interactive (point clé)

- Reprendre le conteneur SVG et le `viewBox` de la maquette.
- Pour chaque commune, dessiner son `svg_path` (champ `svg_path` en base), coloré selon la préfecture.
- Afficher les libellés de préfecture aux positions `label_x` / `label_y`.
- Au survol : mise en évidence ; au clic : naviguer vers `/commune/{slug}` (ou ouvrir une fiche modale
  `FicheCommune`, comme dans la maquette).
- La carte est entièrement pilotée par les données : aucun tracé codé en dur dans le composant.

## 5. SEO et SSR

- Vérifier que le rendu côté serveur (Inertia SSR) fonctionne sur toutes les pages.
- Balises `<title>`, meta description et Open Graph par page (via `@inertiajs/react` Head),
  avec des valeurs tirées du contenu (titre d'article, nom de commune, etc.).
- URLs propres basées sur les slugs.

> Le sitemap XML, le formulaire de contact côté serveur et les notifications relèvent de la phase 4.

## 6. Vérification de fin de phase

- Toutes les routes répondent et affichent les données de démonstration de la phase 2.
- La carte affiche les 28 communes correctement colorées par préfecture ; le clic mène à la bonne fiche.
- Les filtres d'actualités et les onglets médiathèque fonctionnent.
- Le code source rendu (SSR) contient bien le contenu (test : désactiver JS ou inspecter la réponse HTML).
- Le rendu correspond à la charte de la maquette (couleurs, polices, formes).
- `./vendor/bin/pint`, `npm run build` et `php artisan test` passent.

Une fois validé, demander confirmation avant de passer à la **phase 4 (transverse : contact serveur,
notifications, médiathèque avancée, sitemap, SEO final)**.
