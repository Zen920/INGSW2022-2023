import java.io.*
import java.util.*

/*
 * This file was generated by the Gradle 'init' task.
 *
 * This generated file contains a sample Java application project to get you started.
 * For more details take a look at the 'Building Java & JVM projects' chapter in the Gradle
 * User Manual available at https://docs.gradle.org/7.5/userguide/building_java_projects.html
 */

plugins {
    // Apply the application plugin to add support for building a CLI application in Java.
    java
    id("org.springframework.boot") version "3.0.0"
    id("io.spring.dependency-management") version "1.1.0"
    id("org.hibernate.orm") version "6.1.6.Final"
    id("com.github.node-gradle.node") version "3.5.0"
}
repositories {
    // Use Maven Central for resolving dependencies.
    mavenCentral()
}


configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}
val prop = Properties().apply{
    load(FileInputStream(File(rootProject.rootDir, "backend/src/main/resources/application.properties")))
}

dependencies {
    implementation("org.projectlombok:lombok:1.18.22")

    // Use JUnit Jupiter for testing.
    testImplementation("org.junit.jupiter:junit-jupiter:5.9.2")

    // This dependency is used by the application.
    implementation("com.google.guava:guava:31.1-jre")
    implementation("pl.coderion:openfoodfacts-java-wrapper:0.9.3")

    // Spring boot 3.0.0. Dependencies
    implementation("io.jsonwebtoken:jjwt:0.9.1")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-data-rest")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("jakarta.platform:jakarta.jakartaee-api:9.1.0")
    implementation("javax.xml.bind:jaxb-api:2.4.0-b180830.0359")
    testImplementation("org.springframework.boot:spring-boot-starter-test")

    // Postgres DB
    runtimeOnly("org.postgresql:postgresql")

    // Logging
    implementation("org.slf4j:jcl-over-slf4j")
    implementation("ch.qos.logback:logback-classic")
    implementation("org.springframework:spring-tx:6.0.6")
    // Cache

    implementation("org.springframework:spring-context")
    implementation("org.springframework:spring-context-support")
    implementation("org.springframework.boot:spring-boot-starter-cache")

    // Websockets

    implementation("org.springframework.boot:spring-boot-starter-websocket:3.0.4")
    // Lombok
    // Help with code bloat by autogenerating classes with standard functions

    implementation("dk.brics:automaton:1.12-4")
    implementation("com.github.mifmif:generex:1.0.1")
    annotationProcessor("org.projectlombok:lombok")
    compileOnly("org.projectlombok:lombok")

    //
    compileOnly("io.socket:socket.io-server:4.0.1")

    // Mockito for tests

    implementation("org.mockito:mockito-core:5.2.0")

}
tasks.named<Test>("test") {
    // Use JUnit Platform for unit tests, alternatively use Junit 4.
    useJUnitPlatform()
}

java {
    toolchain.languageVersion.set(JavaLanguageVersion.of(17))
}

if (project.hasProperty("prod")) {
    tasks.withType<Jar> {
        dependsOn(":frontend:yarn_build")

        from("../frontend/build") {
            into("static")
        }
    }
}
