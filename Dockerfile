FROM node:8

ENV SRC_PATH /api

RUN apt-get update && apt-get install curl -y

RUN mkdir -p $SRC_PATH
WORKDIR $SRC_PATH

COPY package.json $SRC_PATH


RUN npm i -g pm2 nodemon
RUN npm install

COPY . $SRC_PATH

RUN mkdir -p ${SRC_PATH}/log

EXPOSE 4000
