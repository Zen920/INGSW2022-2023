FROM node:21-alpine3.17
WORKDIR /app
COPY package.json ./
RUN yarn install

RUN echo "$(getent hosts backend)" > /app/backend-ip

COPY . .
ENTRYPOINT [ "yarn", "start" ]
