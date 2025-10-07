# docker developpement
ARG MIN_UID=1000
ARG MAX_UID=1500
FROM node:21 AS dev
ARG MIN_UID
ARG MAX_UID
SHELL ["/bin/bash", "-c"]
RUN mkdir /etc/skel/.config /etc/skel/.npm && userdel -rf node
RUN for (( uid=${MIN_UID}; uid<=${MAX_UID}; uid++ )); do useradd --uid $uid --user-group --create-home --shell /bin/bash user${uid}; done
VOLUME ["/app"]
WORKDIR /app

# building stage
ARG MIN_UID=1000
ARG MAX_UID=1500
FROM node:21 AS build
ARG MIN_UID
ARG MAX_UID
SHELL ["/bin/bash", "-c"]
RUN mkdir /etc/skel/.config /etc/skel/.npm && userdel -rf node
RUN for (( uid=${MIN_UID}; uid<=${MAX_UID}; uid++ )); do useradd --uid $uid --user-group --create-home --shell /bin/bash user${uid}; done
VOLUME ["/app"]
WORKDIR /app
COPY ./app/package*.json ./
RUN npm install
COPY ./app .
RUN npx nuxi build

# mise en production
FROM node:21 AS prod
USER node
WORKDIR /app
# Copier uniquement le dossier de build généré
COPY --from=build /app/.output ./.output
# Exposer le port pour Nuxt
EXPOSE 3000
# Lancer l'application
CMD ["node", ".output/server/index.mjs"]