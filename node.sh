#!/bin/bash

set -e

./dc.sh run --rm --no-deps web "$@"