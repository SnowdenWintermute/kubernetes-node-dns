FROM node:alpine as build
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
WORKDIR /usr/src/app
COPY packages/proxy-node ./packages/proxy-node

RUN yarn install --pure-lockfile --non-interactive
WORKDIR /usr/src/app/packages/proxy-node
CMD ["yarn", "serve"]