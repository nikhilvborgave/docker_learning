# Docker Learning Journey 🐳

A hands-on collection of Docker scenarios built while learning containerization from scratch.
Each scenario covers a different technology and introduces new Docker concepts step by step.

## Scenarios

| Scenario | Technology | Concepts Covered |
|---|---|---|
| [Scenario 0 - Apache](./scenario0-apache/) | Ubuntu + Apache | Base images, ADD, VOLUME, tar extraction |
| [Scenario 1 - Nginx](./scenario1-nginx/) | Nginx | Static file serving, COPY, EXPOSE, Compose |
| [Scenario 2 - Node.js](./scenario2-node/) | Node.js + Express | Layer caching, CMD, package.json, Compose |
| [Scenario 3 - Flask](./scenario3-flask/) | Python + Flask | ENV variables, .dockerignore, env_file, Compose |
| [Scenario 4 - Java](./scenario4-java/) | Java + Maven | Multi-stage builds, JDK vs JRE, Compose |
| [Production App](./prod-app/) | Nginx + Node + PostgreSQL + Redis | 3-tier architecture, reverse proxy, networking |

## Concepts Covered

**Dockerfile**
- Writing Dockerfiles from scratch
- `COPY` vs `ADD` — when to use which
- `CMD` vs `ENTRYPOINT` — replaceable vs locked
- Layer caching — copy dependencies before source code
- `.dockerignore` — keeping secrets and junk out of images
- Environment variables — never bake secrets into images
- Multi-stage builds — build heavy, run light
- `EXPOSE` vs `-p` — documenting vs actually publishing ports
- Debugging containers with `docker logs`
- Docker networking basics
- `.dockerignore`


**Docker Compose**
- `build` vs `image`
- `ports` vs `expose`
- `env_file` vs `environment`
- `depends_on`
- Named volumes
- Custom networks

## How to Run Any Scenario

```bash
git clone https://github.com/nikhilvborgave/docker_learning.git
cd docker_learning/<scenario-folder>

# Using Compose
docker compose up -d

# Manual
docker build -t myimage .
docker run -d -p <port>:<port> myimage
```

## Author
**Nikhil** — learning Docker from scratch, one scenario at a time.
