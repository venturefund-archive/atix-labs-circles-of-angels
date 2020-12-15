FROM docker.atixlabs.com/node:12.16.0-alpine


# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN apk add git
RUN npm install

# Copying source files
COPY . .

ENV URL_PROTOCOL https
ENV URL_HOST 45.79.113.200
ENV URL_PORT 3001
ENV RECAPTCHA_SITE_KEY '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD [ "npm", "start" ]

