## Build from source
FROM gradle:jdk17-alpine as builder
ENV GRADLE_USER_HOME /cache
WORKDIR /app
COPY ./ ./
RUN gradle :backend:clean :backend:build --no-daemon

## Export image
FROM eclipse-temurin:17-jdk-alpine as ratatoimage
COPY --from=builder /app/backend/build/libs/*.jar /
ENTRYPOINT ["java","-jar","/backend.jar", "--spring.profiles.active=prod"]
