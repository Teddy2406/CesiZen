FROM maven:3.9-eclipse-temurin-21 as build
LABEL authors="t.fontep"
WORKDIR /app
COPY ../Back-end-zen /app
RUN mvn clean install

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=container"]