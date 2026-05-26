# Scenario 2 — Node.js REST API

A simple Express REST API running inside a Docker container.

## What This Covers
- Using `node:lts-alpine` as a base image
- Layer caching — copy `package.json` before source code
- `RUN npm install` inside the container
- `CMD` in JSON array form
- Difference between `CMD` and `ENTRYPOINT`
- Docker Compose with custom host port mapping

## Project Structure
```
scenario2-node/
├── Dockerfile        ← see Dockerfile
├── compose.yaml      ← see compose.yaml
├── package.json
└── server.js
```

## Key Dockerfile Concepts

**Layer Caching trick:**
```dockerfile
COPY package.json ./
RUN npm install       # cached unless package.json changes
COPY server.js ./     # only this layer rebuilds on code change
```
If you copy `server.js` before `npm install` — every code change forces a full reinstall. Slow and wasteful.

**Why JSON form for CMD?**
```dockerfile
CMD node server.js            # shell form — node is child of /bin/sh
CMD ["node", "server.js"]     # JSON form — node runs directly, gets stop signals properly
```

## How to Run

```bash
# Using Compose
docker compose up -d

# Manual
docker build -t scenario2-node .
docker run -d -p 3000:3000 scenario2-node
```

## API Routes

| Route | Description |
|---|---|
| `GET /` | Returns app info |
| `GET /health` | Returns health status |

```bash
curl http://localhost:8080
curl http://localhost:8080/health
```
