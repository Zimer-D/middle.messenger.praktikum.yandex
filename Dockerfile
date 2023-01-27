FROM node:16.18.1

WORKDIR /var/www

COPY ./package*.json ./

RUN npm i

COPY ./ .

EXPOSE 3000

CMD [ "npm", "start" ]
