#!/bin/bash

set -e

source dotenv.sh

cp -n .env.example .env

./env_filter.sh

./build.sh

.env --file .env export

./run.sh "$@"
