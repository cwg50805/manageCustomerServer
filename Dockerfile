# build stage
FROM node:17.3
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update
RUN apt-get -qq -y install python
RUN npm install -g npm@latest
RUN npm i sqlite3 --build-from-source
RUN npm install
COPY . .
EXPOSE 4000
CMD node index.js
