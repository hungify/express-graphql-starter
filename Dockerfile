FROM node:16.0.0-alpine as common-build-state

WORKDIR /app

COPY package*.json ./

COPY . .

RUN yarn

EXPOSE 4000

FROM common-build-state as development-build-state

ENV NODE_ENV development

CMD ["yarn", "run", "dev"]

FROM common-build-state as production-build-state

ENV NODE_ENV production

CMD ["yarn", "run", "build"]
