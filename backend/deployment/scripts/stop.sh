#!/usr/bin/env bash

if [ $(docker ps | grep story-api | wc -l) -gt 0 ]; then
    docker stop story-api
    docker rm story-api
    docker rmi story-api
fi