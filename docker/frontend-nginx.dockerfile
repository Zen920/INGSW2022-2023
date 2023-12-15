## Build cache stage
FROM node:lts as builder
WORKDIR /app
COPY ./ ./
RUN [ "yarn", "install" ]
RUN [ "yarn", "build" ]

# Export image
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /usr/share/nginx/html
COPY /nginx /etc/nginx/conf.d
ENTRYPOINT ["nginx", "-g", "daemon off;"]
