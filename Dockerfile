FROM docker.atixlabs.com/node:12.16.0-alpine


# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN apk add git
RUN npm install

# Copying source files
COPY . .

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD [ "npm", "start" ]

