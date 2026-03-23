# SPECS FONCTIONNELLES — airbnb2

## Contexte
Application web de type Airbnb (marketplace de locations) avec périmètre réduit : recherche, liste, détail.

## Référence visuelle
Site officiel Airbnb (airbnb.fr) — design à reproduire fidèlement.

## Palette de couleurs Airbnb (extrait du site)
- Principal : #FF5A5F (rose/rouge Airbnb)
- Texte principal : #222222 (noir)
- Texte secondaire : #717171 (gris)
- Arrière-plan : #FFFFFF (blanc)
- Bordures : #DDDDDD (gris clair)
- Survol : #F7F7F7 (gris très clair)

## User Stories

### Story #1 — Page d'accueil avec moteur de recherche

**En tant que** voyageur cherchant un logement
**Je veux** voir une page d'accueil avec une barre de recherche principale et des filtres basiques
**Pour** trouver rapidement un logement pour mes dates et destination

**Critères d'acceptation :**
- [ ] Page d'accueil avec header Airbnb (logo + navigation)
- [ ] Grande barre de recherche centrale avec champs : "Où allez-vous ?", "Arrivée", "Départ", "Voyageurs"
- [ ] Bouton de recherche "Rechercher" (style Airbnb)
- [ ] Section "Inspirations" avec destinations populaires (cartes horizontales)
- [ ] Design responsive (mobile/desktop)
- [ ] Couleurs Airbnb fidèles (#FF5A5F pour les boutons)

**Edge cases :**
- Si aucun critère saisi → bouton désactivé ou recherche par défaut (tous les logements)
- Si dates invalides (départ avant arrivée) → message d'erreur
- Si destination vide → recherche sur tous les logements

**Complexité :** M
**Dépendances :** Aucune

### Story #2 — Page de résultats avec liste des logements

**En tant que** voyageur ayant lancé une recherche
**Je veux** voir une liste de logements correspondant à mes critères
**Pour** comparer et choisir un logement

**Critères d'acceptation :**
- [ ] Header avec barre de recherche persistante (pré-remplie)
- [ ] Sidebar gauche avec filtres avancés : prix, type de logement, équipements, annulation gratuite
- [ ] Liste de cartes de logements (grid responsive)
- [ ] Chaque carte montre : photo, titre, prix/nuit, note moyenne, nombre d'avis
- [ ] Pagination ou infinite scroll
- [ ] Nombre total de résultats affiché
- [ ] Bouton "Carte" pour basculer vue carte/map (placeholder)

**Edge cases :**
- Si 0 résultat → message "Aucun logement trouvé" avec suggestions
- Si >100 résultats → pagination fonctionnelle
- Si filtre prix hors plage → résultats filtrés correctement

**Complexité :** L
**Dépendances :** Story #1

### Story #3 — Page détaillée d'un logement

**En tant que** voyageur intéressé par un logement
**Je veux** voir tous les détails d'un logement spécifique
**Pour** décider si je veux réserver

**Critères d'acceptation :**
- [ ] Galerie photos avec navigation (flèches, dots)
- [ ] Section "Informations" : titre, hôte, note, nombre d'avis
- [ ] Section "À propos de ce logement" : description complète
- [ ] Section "Équipements" : liste avec icônes (WiFi, cuisine, etc.)
- [ ] Section "Avis" : liste des avis avec notes, commentaires, dates
- [ ] Carte de localisation (Google Maps ou OpenStreetMap embed)
- [ ] Widget de réservation (dates, voyageurs, prix total) — en lecture seule pour MVP
- [ ] Bouton "Contacter l'hôte" (placeholder)

**Edge cases :**
- Si pas d'avis → afficher "Soyez le premier à laisser un avis"
- Si pas de photo → placeholder avec icône
- Si coordonnées GPS manquantes → masquer la carte

**Complexité :** L
**Dépendances :** Story #2

### Story #4 — Système de données mockées

**En tant que** développeur
**Je veux** une base de données avec des logements réalistes
**Pour** tester et démontrer l'application

**Critères d'acceptation :**
- [ ] Schéma Prisma avec modèles : Listing, Host, Review, Amenity
- [ ] Seed script avec 20+ logements réalistes (photos, descriptions, prix)
- [ ] Données cohérentes (adresses Paris, Lyon, Marseille, etc.)
- [ ] Notes et avis réalistes
- [ ] Équipements variés par logement
- [ ] SQLite pour développement local

**Edge cases :**
- Si DB vide → seed automatique au premier lancement
- Si migration échoue → rollback propre

**Complexité :** M
**Dépendances :** Aucune (pré-requis pour les autres stories)

### Story #5 — Design responsive et fidèle à Airbnb

**En tant que** utilisateur sur mobile ou desktop
**Je veux** une interface qui s'adapte à mon écran et ressemble à Airbnb
**Pour** une expérience utilisateur optimale et familière

**Critères d'acceptation :**
- [ ] Breakpoints : mobile (<768px), tablette (768-1024px), desktop (>1024px)
- [ ] Header responsive (menu burger sur mobile)
- [ ] Cartes de logements qui s'adaptent (1 colonne mobile, 2-3 desktop)
- [ ] Filtres sidebar → drawer sur mobile
- [ ] Galerie photos adaptée aux écrans
- [ ] Polices Airbnb-like (Circular, Airbnb Cereal)
- [ ] Espacements et bordures cohérents
- [ ] États de survol/focus accessibles

**Edge cases :**
- Si écran très large (>1920px) → contenu limité en largeur max
- Si orientation portrait/landscape mobile → adaptation
- Si préférences réduit mouvement → respecter les préférences utilisateur

**Complexité :** M
**Dépendances :** Toutes les stories UI

## Suggestions du BA (features non demandées mais standard)

1. **Recherche par géolocalisation** — "Rechercher près de moi" (utilise l'API Geolocation)
2. **Favoris** — ♡ sur les cartes pour sauvegarder des logements (localStorage)
3. **Partage** — bouton partager sur réseaux sociaux
4. **Comparaison** — sélectionner 2-3 logements pour comparer côte à côte
5. **Historique de recherche** — suggestions basées sur les recherches précédentes

**Justification** : Ces features sont standards sur les marketplaces immobilières et améliorent significativement l'UX. L'implémentation est légère (localStorage, APIs natives).

## Priorisation
1. Story #4 (données) → Story #1 (accueil) → Story #2 (résultats) → Story #3 (détail) → Story #5 (responsive)

## Estimation totale
- Stories : 5 × (M/L) = ~8-10 points
- Durée estimée : 1h30-2h avec équipe complète
- Livrable : MVP fonctionnel avec design Airbnb fidèle