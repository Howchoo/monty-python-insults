FROM ubuntu:14.04

MAINTAINER Tyler Jones

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get install -y -f nginx  sed uwsgi-plugin-python supervisor
RUN apt-get install -y -f build-essential python-pip python-dev libncurses5-dev

RUN mkdir -p /var/log/nginx/app
RUN mkdir -p /var/log/uwsgi/app/


RUN rm /etc/nginx/sites-enabled/default
COPY prod/flask.conf /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/flask.conf /etc/nginx/sites-enabled/flask.conf
COPY prod/uwsgi.ini /var/www/app/
RUN echo "daemon off;" >> /etc/nginx/nginx.conf


RUN mkdir -p /var/log/supervisor
COPY prod/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY app /var/www/app
RUN pip install -r /var/www/app/requirements.txt


CMD ["/usr/bin/supervisord"]
