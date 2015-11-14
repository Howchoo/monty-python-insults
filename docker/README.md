##Build a new production image

From the repo root, run:

`docker build -t josephtyler/mpi_prod:latest -f docker/mpi_prod/Dockerfile .`

##Build a new dev image

`docker build -t josephtyler/mpi_dev:latest -f docker/mpi_dev/Dockerfile .`

##Start a dev container

`docker-compose up -d`

##Start a production container

`docker run -d -p 80:80 josephtyler/mpi_dev`
