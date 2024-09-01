#!/usr/bin/env bash

# EXIT SCRIPT IF ANY OF THE COMMANDS FAIL
set -e
set -o pipefail

# GET APP_HOME AND ENV (-e option) variables
. $(dirname "$0")/common.sh -e true

# Clean up disk space
# docker system prune -a -f
# rm -rf /var/log/*.log
# rm -rf /tmp/*

# Sync the content of the app with the current repository state
# Note: /tmp/${APP} directory is created by code deploy by files instruction in appspec.yaml
rsync -au --delete /tmp/${APP}/ ${APP_HOME}

cd $APP_HOME

docker build -t story-api --build-arg ENV=$ENV .