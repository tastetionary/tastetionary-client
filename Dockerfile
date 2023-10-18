FROM node:18.17.0-alpine


WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN --mount=type=secret,id=npmrc,target=$HOME/.npmrc yarn install

COPY . /app

EXPOSE 3000

RUN yarn next telemetry disable
RUN yarn build

CMD ["yarn", "start"]