# Install dependencies only when needed
FROM node:16.10.0-alpine as dependencies

RUN mkdir -p /home/app

WORKDIR /home/app

RUN chown -R node:node /home/app

USER node

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install --prod=false --silent --frozen-lockfile

# Rebuild the source code only when needed
FROM dependencies as builder

WORKDIR /home/app

ENV NODE_ENV development

COPY --chown=node:node . .

COPY --from=dependencies /home/app/node_modules ./node_modules

EXPOSE 8000

CMD [ "yarn", "dev"]
