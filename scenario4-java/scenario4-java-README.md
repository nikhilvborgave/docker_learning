# Scenario 4 — Java Multi-stage Build

A Java HTTP API built using Maven and run using a lightweight JRE — demonstrating multi-stage builds.

## What This Covers
- Multi-stage builds — build heavy, run light
- Using Maven inside Docker to compile Java code
- `COPY --from=builder` to carry only the jar file
- Java versions must match between build and run stages
- Docker Compose for Java apps

## Project Structure
```
scenario4-java/
├── Dockerfile        ← see Dockerfile
├── compose.yaml      ← see compose.yaml
├── pom.xml
└── src/
    └── main/
        └── java/
            └── com/
                └── nikhil/
                    └── App.java
```

## Key Dockerfile Concepts

**Why Multi-stage?**
```
Without multi-stage:  JDK + Maven + source code + jar = ~500MB image
With multi-stage:     JRE + jar only = ~180MB image
```

**Stage 1 — Build:**
```dockerfile
FROM maven:3.9-eclipse-temurin-17 AS builder
# Has JDK + Maven — everything needed to compile
RUN mvn package -DskipTests
```

**Stage 2 — Run:**
```dockerfile
FROM eclipse-temurin:17-jre-jammy
# Has only JRE — just enough to run the jar
COPY --from=builder /app/target/*.jar app.jar
```

**Why versions must match:**
```
Stage 1 compiles with Java 17 → class file version 61.0
Stage 2 must also run Java 17 → if Java 11, crash! (recognizes only up to 55.0)
```

## How to Run

```bash
# Using Compose
docker compose up -d

# Manual
docker build -t scenario4-java .
docker run -d -p 8080:8080 scenario4-java
```

> Note: First build takes a few minutes — Maven downloads dependencies. Second build is fast due to layer caching.

## API Routes

| Route | Description |
|---|---|
| `GET /` | Returns app info |
| `GET /health` | Returns health status |

```bash
curl http://localhost:8080
curl http://localhost:8080/health
```
