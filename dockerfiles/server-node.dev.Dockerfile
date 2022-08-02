FROM node:alpine as build
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
WORKDIR /usr/src/app
COPY packages/server-node ./packages/server-node

RUN yarn install --pure-lockfile --non-interactive
WORKDIR /usr/src/app/packages/server-node
CMD ["yarn", "serve"]