#!/bin/bash

set -e

./dc.sh down web pma
./dc.sh up -d web pma

if [ "$#" -gt 0 ]; then
    ./dc.sh logs -f "$@"
fi