FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY . .

RUN npm install -g npm@latest

RUN npm install

USER node

EXPOSE 3333

CMD npm run dev