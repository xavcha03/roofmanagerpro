# 🏢 RoofManager Pro

Application de gestion immobilière avec visualisation cartographique interactive.

## 🚀 Fonctionnalités

- **Carte Interactive** : Visualisation MapLibre avec sélection du QG
- **Interface Utilisateur Moderne** : UI responsive avec Tailwind CSS
- **Gestion d'État** : Utilisation de Zustand pour un état global efficace
- **Tests Complets** : Couverture de tests unitaires et d'intégration

## 🛠️ Technologies Utilisées

- **Frontend** :
  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS
  - MapLibre GL JS

- **Tests** :
  - Vitest
  - React Testing Library
  - Jest DOM

- **Outils de Développement** :
  - ESLint
  - Prettier
  - PostCSS

## 📋 Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- Clé API MapTiler (pour la cartographie)

## 🚀 Installation

1. **Cloner le dépôt**
   ```bash
   git clone git@github.com:xavcha03/roofmanagerpro.git
   cd roofmanagerpro
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   - Copier le fichier `.env.example` en `.env`
   - Ajouter votre clé API MapTiler :
     ```
     VITE_MAPTILER_API_KEY=votre_clé_api
     ```

4. **Lancer l'application en développement**
   ```bash
   npm run dev
   ```

## 🧪 Tests

- **Lancer tous les tests**
  ```bash
  npm test
  ```

- **Lancer les tests avec couverture**
  ```bash
  npm run test:coverage
  ```

- **Lancer les tests en mode watch**
  ```bash
  npm run test:watch
  ```

## 📝 Scripts Disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm run preview` : Prévisualise la version de production
- `npm run lint` : Vérifie le code avec ESLint
- `npm run format` : Formate le code avec Prettier
- `npm test` : Lance les tests
- `npm run type-check` : Vérifie les types TypeScript

## 🌳 Structure du Projet

```
roofmanagerpro/
├── public/
├── src/
│   ├── assets/
│   │   ├── components/
│   │   │   ├── Map.tsx
│   │   │   ├── UI.tsx
│   │   │   └── ConfirmHQDialog.tsx
│   │   ├── store/
│   │   │   └── gameStore.ts
│   │   └── test/
│   │       ├── App.test.tsx
│   │       ├── Map.test.tsx
│   │       ├── UI.test.tsx
│   │       └── ConfirmHQDialog.test.tsx
│   ├── .env
│   ├── .eslintrc.json
│   ├── .prettierrc
│   └── package.json
```

## 🤝 Contribution

1. Forker le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commiter vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pousser sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## ✨ Auteurs

- Xavier Charpentier - [GitHub](https://github.com/xavcha03)
