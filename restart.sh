#!/bin/bash

set -e

if [ "$#" -gt 0 ]; then
    ./dc.sh down "$@"
    ./dc.sh up -d "$@"
    ./dc.sh logs -f "$@"
fi