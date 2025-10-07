#!/usr/bin/env bash

#Ce script est un wrapper de la commande "docker compose". La config finale peut être visualisée grâce à la commande "./dc.sh config"

set -e

#Permettre aux containers d'utiliser le même UID/GID qu'à l'extérieur, notamment pour uniformiser le propriétaire des fichiers
export USER_ID=$(id -u) \
    GROUP_ID=$(id -g)

ARGS="--env-file ./.env $@"

if [[ $1 -eq "exec" ]] && [[ ! -t 0 ]]; then

    ARGS="-T $ARGS"

fi

DOCKER_BUILDKIT=1 docker compose -f docker-compose.dev.yml $ARGS