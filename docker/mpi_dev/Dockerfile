FROM ubuntu:trusty
MAINTAINER Tyler Jones
EXPOSE 5000

ENV DEBIAN_FRONTEND noninteractive

RUN echo "deb http://us.archive.ubuntu.com/ubuntu trusty universe" | sudo tee -a /etc/apt/sources.list
RUN echo "91.189.88.46\tarchive.ubuntu.com\n91.189.88.46\tsecurity.ubuntu.com" >> /etc/hosts

RUN apt-get upgrade
RUN apt-get update
RUN apt-get install -f -y build-essential python-pip python-dev libncurses5-dev

RUN mkdir -p /var/montypython
WORKDIR /var/montypython

ADD app/requirements.txt /var/montypython/

RUN pip install -r requirements.txt
