#FROM docker.atixlabs.com/node:12.16.0-alpine
FROM node:12.16.0

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
# RUN apk add git
RUN npm install

# Copying source files
COPY . .

# Building app
RUN ls -la
RUN npm run build
# RUN npm run start
EXPOSE 3000
