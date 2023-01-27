FROM node:16.18.1

WORKDIR /var/www/app
COPY . /var/www/app

COPY package*.json ./

RUN npm install


RUN npm run start

EXPOSE 3000

CMD [ "node", "server.js" ]