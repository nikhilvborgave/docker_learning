# Docker Learning Journey 🐳

A hands-on collection of Docker scenarios built while learning containerization from scratch.
Each scenario covers a different technology and introduces new Docker concepts step by step.

## Scenarios

| Scenario | Technology | Concepts Covered |
|---|---|---|
| [Scenario 0 - Apache](./scenario0-apache/) | Ubuntu + Apache | Base images, ADD, VOLUME, tar extraction |
| [Scenario 1 - Nginx](./scenario1-nginx/) | Nginx | Static file serving, COPY, EXPOSE |
| [Scenario 2 - Node.js](./scenario2-node/) | Node.js + Express | Layer caching, CMD, package.json |
| [Scenario 3 - Flask](./scenario3-flask/) | Python + Flask | ENV variables, .dockerignore, --env-file |
| [Scenario 4 - Java](./scenario4-java/) | Java + Maven | Multi-stage builds, JDK vs JRE |

## Concepts Learned

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

## How to Run Any Scenario

```bash
# Clone the repo
git clone https://github.com/nikhilvborgave/docker_learning.git
cd docker_learning

# Go to any scenario
cd scenario1-nginx

# Build the image
docker build -t scenario1 .

# Run the container
docker run -d -p 80:80 scenario1
```

## Author
**Nikhil** — learning Docker from scratch, one scenario at a time.
