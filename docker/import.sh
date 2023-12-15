#!/bin/bash

docker rmi -f frontend backend
docker load -i backend.tar.gz
docker load -i frontend.tar.gz
