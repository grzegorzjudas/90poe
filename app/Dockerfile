FROM node:18-alpine

WORKDIR /application
EXPOSE 80

ADD artifact.tar.gz .
ADD package.json .
RUN npm install --omit=dev

CMD [ "node", "server/index.js" ]
