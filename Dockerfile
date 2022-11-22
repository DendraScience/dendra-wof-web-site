FROM node:18.12 AS base
MAINTAINER J. Scott Smith <scott@newleafsolutionsinc.com>
# Following Best Practices and guidelines at:
#   https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
#   https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
RUN groupmod -g 2000 node \
  && usermod -u 2000 -g 2000 node
WORKDIR /home/node/app
# Install dependencies
COPY package.json /home/node/app
COPY package-lock.json /home/node/app
# Best practice: run with NODE_ENV set to production
ENV NODE_ENV production
RUN npm install

# Linting layer, won't make it into production
FROM base AS linter
ENV NODE_ENV development
RUN npm install
COPY . /home/node/app
RUN npm run lint

#
# Test stage skipped, since external testing is done
#

# Builder layer
FROM linter AS builder
RUN npm run build
RUN date > .buildtime

# Production layer
FROM base AS prod
# Best practice: run as user 'node'
USER node
EXPOSE 8080
# Copy source files; relies on .dockerignore
COPY --from=builder /home/node/app/.buildtime .buildtime
COPY --from=builder /home/node/app/dist /dist
COPY --from=builder /home/node/app/src/server /server

# Best practice: bypass the package.json's start
CMD [ "node", "./server" ]
