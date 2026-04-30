# Cahier des charges – Projet Annuel

## 1. Présentation générale du projet

### 1.1 Contexte

MyGES est la plateforme numérique centrale utilisée par l’établissement pour la gestion de la scolarité, des plannings, des notes et des démarches administratives.

Le projet **MyGES 2.0** consiste en une **refonte complète fonctionnelle, technique et ergonomique** de cette plateforme, afin d’en faire un véritable système d’orchestration scolaire moderne, fiable et sécurisé.

Ce projet s’inscrit dans le cadre du **Projet Annuel**, dont l’objectif est de démontrer l’ensemble des compétences acquises durant la scolarité, aussi bien sur les aspects métier, techniques, organisationnels que sécuritaires.

## 2. Fonctionnalités

### 2.1 Profils utilisateurs

Afin de garantir une architecture claire, maintenable et réaliste, seuls les **rôles strictement nécessaires au fonctionnement réel de l’établissement** sont conservés. Chaque rôle correspond à des responsabilités concrètes existantes dans une école.

### Étudiants

- **Étudiant en formation initiale**
- **Étudiant en alternance**

Différenciation automatique des droits et des flux selon le statut (planning, absences, documents contractuels).

### Intervenants

- **Intervenant** (qu’il soit salarié ou indépendant)

La distinction interne / externe est gérée contractuellement et administrativement, sans multiplier les rôles applicatifs.

### Administration

- **Administration Scolarité**
  - Gestion des dossiers étudiants
  - Absences, justificatifs, documents officiels
- **Administration Pédagogique**
  - Gestion des filières, classes, modules
  - Affectation des intervenants
  - Supervision des notes et jurys
- **Administration Relations Entreprises**
  - Suivi des étudiants alternants
  - Gestion des contrats et conventions
  - Interface avec les entreprises

### Super Administrateur

- Gestion des comptes
- Gestion des rôles
- Paramétrage global du système

---

## 3. Fonctionnalités détaillées par domaine

### 3.1 Planning et calendrier

- Emploi du temps dynamique, mis à jour en temps réel
- Distinction visuelle : présentiel / distanciel / entreprise
- Gestion des contraintes alternance (jours entreprise non planifiables)
- Notifications automatiques en cas de modification
- Gestion des situations exceptionnelles (jours fériés déplacés, fermetures, grèves)

---

### 3.2 Notes et évaluations

- Saisie des notes par les intervenants
- Calcul automatique des moyennes
- Distinction notes académiques / appréciations entreprise (alternants)
- Gel des notes avant jury
- Traçabilité complète des modifications

---

### 3.3 Absences et assiduité

- Déclaration d’absence par l’étudiant
- Dépôt de justificatifs
- Workflow de validation (administration)
- Gestion spécifique des absences alternants (motif entreprise)
- Historique et traçabilité des décisions

---

### 3.4 Documents et dossiers

- Dossier étudiant centralisé
- Gestion documentaire spécifique alternance (contrats, conventions, avenants)
- Génération et téléchargement de documents officiels
- Alertes sur documents manquants ou expirés

---

### 3.5 Communication et messagerie

- Espaces de discussion par classe
- Espaces de discussion par module avec intervenant
- Messagerie ciblée administration ↔ étudiant
- Notifications en temps réel

---

### 3.6 Supports de cours et rendus de TP

- Dépôt de supports par les intervenants
- Bibliothèque de documents par module
- Dépôt de rendus étudiants avec date limite
- Traçabilité des dépôts

---

### 3.7 Gestion administrative et pédagogique

- Création et gestion des filières, classes et modules
- Affectation des intervenants selon compétences et disponibilités
- Outil d’aide à la décision (non automatique)
- Gestion des promotions sous-effectif (fusion, maintien, annulation)

---

### 3.8 Audit et traçabilité

- Journalisation de toutes les actions sensibles
- Historique des validations, rejets et modifications
- Consultation réservée aux rôles autorisés

---

## 4. Cas particuliers et situations dégradées

Le système doit être capable de gérer des situations exceptionnelles :

- Intervenant indisponible ou disparu en cours de module
- Changement de statut étudiant (initial ↔ alternance)
- Contestation de note ou litige contractuel
- Réorganisation d’urgence des plannings

Dans ces cas, le système doit :

- Geler certaines données
- Autoriser des reprises encadrées
- Assurer une traçabilité renforcée

---

## 5. Sécurité

### 5.1 Authentification et gestion des accès

- Inscription et connexion sécurisées
- Mot de passe fort (12 caractères minimum, complexité renforcée)
- Réinitialisation obligatoire tous les 60 jours
- Blocage après tentatives infructueuses
- Authentification à deux facteurs (TOTP)
- Support OAuth2 / OIDC (optionnel)

---

### 5.2 Protection des données

- Hachage sécurisé des mots de passe (Argon2/Bcrypt)
- Gestion des secrets via variables d’environnement
- Séparation stricte des rôles
- Conformité RGPD et CNIL

---

## 6. Infrastructure et architecture technique

- Application conteneurisée (Docker)
- Déploiement sur serveur VPS
- Orchestration via Docker swarm (k3s)
- au moins 2 réplicas par service
- Ingress Controller (Nginx)
- Base de données PostgreSQL avec volumes persistants

---

## 7. Observabilité

- Supervision de l’état des services (Grafana )
- Remontée des erreurs applicatives (Sentry)
- Analytique respectueuse du RGPD (Matomo)

---

## 8. Politique de sauvegarde

- Stratégie 3-2-1
- Sauvegarde des bases de données
- Sauvegarde des fichiers utilisateurs
- Sauvegarde externe chez un fournisseur différent

---

## 9. Tests et qualité

- Tests unitaires
- Tests fonctionnels (API)
- Tests d’interface (E2E)
- Code propre et lisible (Clean Code)

---

## 10. Gestion de projet

- Méthodologie Agile
- Découpage en sprints
- Répartition équitable des tâches
- Utilisation d’un outil de suivi (GitHub Projects)
- Historique Git clair et documenté
