# BRIEF PROJET — airbnb2

## QC1 — Nom du projet
airbnb2

## QC2 — Description
"airbnb2" est un projet copie de Airbnb pour permettre aux utilisateurs de trouver un logement pour vacances ou week-ends.

## QC3 — Type de projet
web

## QC4 — Utilisateurs cibles
grand public

## QC5 — Environnement d'exécution
navigateurs

## QC6 — Contraintes techniques
aucune

## QC7 — Fonctionnalités prioritaires MVP (périmètre réduit)
1. Page d'accueil avec moteur de recherche (barre + filtres basiques)
2. Page de résultats avec liste des logements (cartes avec image, titre, prix, note)
3. Page détaillée d'un logement (photos, description, équipements, avis en lecture)

## QC8 — Niveau de qualité
MVP

## QC9 — Deadline
maintenant

## QC10 — Configuration Git & Vercel
- Client admin déjà configuré (role="admin")
- git_username: cryptoradio7
- deploy_preview: true

## QC11 — Répertoire de travail
/tmp/airbnb2

## QC12 — Niveau d'implication
autonome

## QC13 — Références visuelles
le site officiel Airbnb

## Questions dynamiques — Web
- Auth : à déterminer par l'équipe
- SEO : important pour un site public
- RGPD : à respecter (formulaires, cookies)
- Notifications : potentiellement pour réservations
- Paiement : à prévoir pour MVP avancé
- Base de données : nécessaire pour logements et utilisateurs
- Multi-utilisateurs : oui (hôtes et voyageurs)

## Stories prévues (MVP réduit)
1. Page d'accueil avec moteur de recherche et filtres
2. Page de résultats avec cartes de logements (image, titre, prix, note)
3. Page détaillée d'un logement (galerie photos, description, équipements)
4. Système de données mockées (SQLite + seed)
5. Design responsive et fidèle à Airbnb

## Décisions techniques
- Stack : à déterminer par l'Architecte
- Base de données : relationnelle (PostgreSQL) ou NoSQL selon besoins
- Auth : JWT ou session-based
- Paiement : Stripe ou PayPal
- Déploiement : Vercel (preview automatique)
- Images : stockage cloud (Cloudinary ou S3)
- Maps : Google Maps ou OpenStreetMap

## Prochaine étape
Architecte choisit la stack et crée la structure du projet.