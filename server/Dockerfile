# Adapted from
# https://github.com/marcusandre/docker-nodejs/blob/master/Dockerfile

FROM        ubuntu

ENV         VERSION 0.12.0

RUN         apt-get update -qq
RUN         apt-get install -y make gcc g++ python curl libssl-dev
RUN         apt-get install -y git

RUN         curl -L# http://nodejs.org/dist/v$VERSION/node-v$VERSION-linux-x64.tar.gz | tar -zx --strip 1 -C /usr/local

RUN         rm -fr /usr/src/node

# install Node global packages
RUN         npm install -g nodemon

EXPOSE  8080
