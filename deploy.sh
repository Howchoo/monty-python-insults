#!/bin/bash

set -e

read -p "username: " username

docker build -t josephtyler/mpi_prod:latest -f docker/mpi_prod/Dockerfile .
docker push josephtyler/mpi_prod:latest

ssh -t -l $username mpi-web.montypythoninsults.com "sudo /root/deploy.sh"
