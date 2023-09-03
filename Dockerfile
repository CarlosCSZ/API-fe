# FROM node:18.17-slim
FROM ghcr.io/puppeteer/puppeteer:21.0.3 as base
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

ENV NODE_ENV="production"

COPY --link package*.json .

RUN npm install

COPY --link . .

CMD ["npm","run","start:prod"]
