***

⚠️ Ces instructions concernent le _boilerplate_ seulement et devraient être retirées une fois le nouveau projet démarré.

1. Cloner ce projet
2. Supprimer le repository Git (`rm -rf .git`)
3. Exécuter le script de renommage de projet (`./project-renamer.sh YourProjectName`)
4. Supprimer le script de renommage de projet
5. Créer un nouveau repository Git (`git init`)
6. Supprimer cette section du fichier `README.md`
7. Créer le premier commit du repository (`git commit -a -m "Initial commit"`)

***

# ember-boilerplate

| Section                                                  | Description                                                            |
|----------------------------------------------------------|------------------------------------------------------------------------|
| [🎯 Objectifs et contexte](#-objectifs-et-contexte)      | DoDs, KPIs, objectifs et contexte de développement initial             |
| [🚧 Dépendances](#-dépendances)                          | Les dépendances techniques du projet et comment les installer          |
| [🏎 Démarrage](#-démarrage)                              | Les détails de mise en route le projet                                 |
| [⌨️ Commandes](#️-commandes)                             | Les commandes utiles au développement et à la mise en production       |
| [🏗 Code et architecture](#-code-et-architecture)        | Les différents modules et particularités du _codebase_                 |
| [🔭 Améliorations possibles](#-améliorations-possibles)  | Les différents _refactors_ possibles ainsi que les pistes potentielles |
| [🚑 Résolution de problèmes](#-résolution-de-problèmes)  | Les problèmes récurrents et les solutions reliées                      |
| [🚀 Déploiement](#-déploiement)                          | Les détails du setup de déploiement dans les différents environnements |

## 🎯 Objectifs et contexte

…

### Browser support

| Browser       | OS          | Constraint             |
| ------------- | ----------- | ---------------------- |
| …             | …           | …                      |

## 🚧 Dépendances

- Node.js (`10.12.0`)
- NPM (`6.4.1`)

## 🏎 Démarrage

Toutes les variables d’environnement nécessaires au démarrage de l’application sont documentées dans le fichier `.env.dev.`

Lors d’exécutions de scripts ou de commandes npm, il est impératif que toutes ces variables soient présentes dans l’environnement. Pour ce faire, on peut utiliser `source`, `nv` ou un autre script personnalisé.

### Setup initial

1. Créer le fichier `.env` à partir du fichier `.env.dev`
2. Installer les dépendances Node.js avec `npm install`

## ⌨️ Commandes

### Servir l’app en développement avec FastBoot

```sh
$ nv .env npm run start
```

### Tests

Les tests peuvent être exécutés avec le script suivant et devraient toujours pouvoir rouler sans spécifier de variables d’environnement puisqu’ils ne devraient jamais faire de “side effects”, par exemple: pas de call network, pas de lecture des cookies, etc.

```sh
$ npm test
```

### Code coverage

Ce projet respecte des métriques de coverage définies dans le fichier `.nycrc`. Pour valider que les barèmes sont bien respectés, on peut rouler la commande suivante **après avoir rouler les tests**:

```sh
$ npm run check-coverage
```

Les résultats d’instrumentation du code sont aussi disponibles dans le dossier `coverage` du projet.

### Linting

Cinq outils de linting/formattage peuvent être exécutés pour s’assurer de la constance du code :

- Pour s’assurer que le code est bien formatté:

	```sh
	$ npm run prettier
	```

- Pour s’assurer que le code respecte nos bonnes pratiques TypeScript:

	```sh
	$ npm run lint-typescript
	```

- Pour s’assurer que le code respecte nos bonnes pratiques JavaScript:

	```sh
	$ npm run lint-scripts
	```

- Pour s’assurer que le code respecte nos bonnes pratiques SCSS:

	```sh
	$ npm run lint-styles
	```

- Pour s’assurer que le code respecte nos bonnes pratiques Handlebars:

	```sh
	$ npm run lint-templates
	```

### CI check

Pour rouler la suite de tests et de checks qui est exécutée sur Travis CI on peut utiliser la commande suivante:

```sh
$ nv .env scripts/ci-check.sh
```

### “Builder” l’app pour la production

```sh
$ nv .env npm run build -prod
```

### Servir l’app en production

Pour démarrer un “FastBoot-enabled production-ready server” avec support de canonical host, SSL and `Basic` authentication, on peut rouler la commande suivante _après_ avoir “buildé” l’app en mode “production”.

```sh
$ nv .env npm run server
```

## 🏗 Code et architecture

…

## 🔭 Améliorations possibles

| Description                                                      | Priorité | Complexité | Pistes                                                                                                                                   |
|------------------------------------------------------------------|----------|------------|------------------------------------------------------------------------------------------------------------------------------------------|
| …                                                                | …        | …          | …                                                                                                                                        |

## 🚑 Résolution de problèmes

### Page de « santé » de l’application

Le “health check“ de l’application se trouve à l'URL `/health`

### Sentry

Les erreurs sont rapportées dans [Sentry](https://sentry.io/mirego).


## 🚀 Déploiement

…

### Versions et branches

Chaque version pointe sur un tag Git effectué sur une branche de release (correspondant à l’environnement qu’on déploie).

La version du codebase est gérée avec [incr](https://github.com/jcouture/incr).
