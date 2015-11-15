#!/bin/bash

read -p "username:" username
read -p "docker username:" docker_username
read -p "docker email:" docker_email
read -s "docker password:" docker_password

ssh -l $username -T mpi_web.montypythoninsults.com << EOF >/dev/null
    docker login --email=$docker_email --username=$docker_username --password=$docker_password
    docker pull
EOF
