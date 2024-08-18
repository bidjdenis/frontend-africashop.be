# Étape 1 : Construire l'application Angular
FROM node:lts-alpine as build-stage

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer npm à la dernière version et les dépendances du projet
RUN npm install -g npm@latest
RUN npm install --force

# Copier tous les fichiers du projet dans le conteneur
COPY . .

# Construire l'application Angular pour la production
RUN npm run build --prod

# Étape 2 : Servir l'application avec Nginx
FROM nginx:latest

# Créer le répertoire pour l'application (optionnel si le dossier n'existe pas déjà)
RUN mkdir -p /app

# Copier les fichiers construits de l'étape précédente dans le répertoire de l'application Nginx
COPY --from=build-stage /app/dist/frontend-africashop/browser/ /usr/share/nginx/html

# Copier le fichier de configuration Nginx personnalisé
#COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80 pour le serveur Nginx
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]

# Utilisateur root (par défaut, donc cette ligne n'est pas nécessaire)
USER root
