#!/bin/bash

set -e

./dc.sh down --volumes --remove-orphans
./dc.sh up --detach