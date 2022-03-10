FROM node:16-alpine

WORKDIR /usr/src/ddis-backend-data

COPY . /usr/src/ddis-backend-data

RUN npm install

EXPOSE 4010

CMD [ "npm", "start" ]