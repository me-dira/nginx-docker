FROM node:10

RUN mkdir /app
WORKDIR /app

COPY src/package.json ./
COPY src/yarn.lock ./

RUN yarn install
COPY . ./

CMD ["yarn", "start"]
