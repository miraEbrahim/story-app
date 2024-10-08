#!/usr/bin/env bash

# EXIT SCRIPT OF ANY OF THE COMMANDS FAIL
set -e
set -o pipefail

# GET APP_HOME AND ENV (-e option) variables
. $(dirname "$0")/common.sh -e true

# Start docker image

docker run --name story-api -d --restart=always -p 80:8081 -v /home/story/logs/story-api:/usr/src/app/logs -e JWT_SECRET=$JWT_SECRET -e ENV=$ENV -e DB_CONNECTION=$DB_CONNECTION -e DEPLOYMENT_ID=$DEPLOYMENT_ID story-api