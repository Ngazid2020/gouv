# Phase 4 — Transverse (contact serveur, notifications, SEO) · Tâches pour Claude Code

À coller dans Claude Code une fois la phase 3 validée. Objectif : rendre le formulaire de contact
fonctionnel côté serveur, brancher les notifications, finaliser la médiathèque et le SEO.
Le durcissement (2FA, conformité, perf, déploiement) relève de la phase 5.

Référence : `docs/plan-de-conception.md` (contact = section 6, médias = section 8, SEO = section 10).
Vérifie la dernière version stable de chaque paquet avant installation.

---

## 1. Formulaire de contact côté serveur

- Créer une route `POST /contact` et un contrôleur dédié.
- Validation via un `FormRequest` : `cabinet_member_id` (doit exister), `nom`, `email` (valide),
  `objet`, `message`.
- Anti-spam : champ honeypot caché (rejet silencieux si rempli) + `throttle` (limitation de débit)
  sur la route.
- À la réception : enregistrer en `contact_messages` (statut `nouveau`) et notifier le membre du cabinet.
- Brancher le composant `FormulaireContact` (phase 3) avec `useForm` d'Inertia : soumission,
  affichage des erreurs de validation, message de confirmation (flash).

## 2. Notifications

- Créer une `Notification` (ou `Mailable`) envoyée par e-mail au membre du cabinet concerné
  à chaque nouveau message.
- La mettre en file d'attente (Redis) : implémenter `ShouldQueue`.
- En développement, configurer `QUEUE_CONNECTION` (`database` ou `sync`) et documenter le lancement
  du worker (`php artisan queue:work`). Configurer un mailer de test (Mailpit/log) en local.
- Optionnel : notification Filament (cloche) à l'arrivée d'un message, en complément de la boîte de réception.

## 3. Médiathèque avancée

- Définir les conversions d'images sur le model `Media` via `spatie/laravel-medialibrary`
  (vignette, version web), et servir des images responsives sur le site public.
- Chargement différé (lazy loading) des images de la galerie.
- Vidéos : afficher l'embarquement (iframe) à partir de l'URL stockée, sans héberger les fichiers.

## 4. Sitemap et robots

- Installer `spatie/laravel-sitemap`. Générer un `sitemap.xml` couvrant les pages statiques,
  les articles publiés, les communes et l'agenda public.
- Ajouter un `robots.txt` cohérent (autoriser l'indexation, pointer vers le sitemap).
- Prévoir une commande Artisan (planifiable) pour régénérer le sitemap.

## 5. SEO final

- Vérifier les balises Open Graph sur toutes les pages (titre, description, image) ;
  prévoir une image OG par défaut et, quand c'est pertinent, l'image principale de l'article/commune.
- URLs canoniques.
- Vérifier que les pages publiques ne fuient aucun contenu non publié.

## 6. Cohérence i18n (préparation)

- S'assurer que les chaînes d'interface passent par les fichiers de langue (pas de texte en dur),
  même si seul le français est livré, pour faciliter l'ajout ultérieur du comorien/arabe.

## 7. Vérification de fin de phase

- Envoi d'un message de contact : validation, anti-spam, enregistrement en base, e-mail reçu
  (visible dans Mailpit/log), message de confirmation affiché.
- Le message apparaît dans la boîte de réception Filament (phase 2) et peut être marqué « traité ».
- La galerie affiche des images responsives ; les vidéos s'embarquent correctement.
- `sitemap.xml` et `robots.txt` sont accessibles et corrects.
- `./vendor/bin/pint`, `npm run build` et `php artisan test` passent.

Une fois validé, demander confirmation avant de passer à la **phase 5 (durcissement : 2FA, conformité
RGPD, performance, tests, déploiement)**.
