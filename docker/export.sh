#!/bin/bash

RATATO_IP=localhost docker compose build --no-cache backend frontend
rm -f backend.tar.gz frontend.tar.gz
docker save -o backend.tar.gz backend:latest
docker save -o frontend.tar.gz frontend:latest
scp frontend.tar.gz backend.tar.gz \
	ratatouille-google:/home/ratatoratato2023/ratatouille
