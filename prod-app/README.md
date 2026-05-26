# Production App — 3-Tier Architecture 🏭

A production grade multi-container application using Nginx, Node.js, PostgreSQL and Redis — wired together with Docker Compose.

## Architecture

```
Browser
   │
   ▼
[Nginx :80]              ← Tier 1 - Reverse Proxy (only public facing container)
   │
   ▼
[Node.js :3000]          ← Tier 2 - Backend API (internal only)
   │
   ├──▶ [PostgreSQL :5432]   ← Tier 3 - Persistent Database
   │
   └──▶ [Redis :6379]        ← Tier 3 - Cache
```

## What This Covers
- 3-tier architecture — frontend, backend, database
- Reverse proxy with Nginx — only Nginx exposed to outside world
- `ports` vs `expose` — what's public vs internal
- `depends_on` — service startup order
- Named volumes — PostgreSQL data persists across restarts
- Custom bridge network — containers talk by service name
- `env_file` — secrets passed at runtime, never baked into image
- `environment` — connection details passed to backend

## Project Structure
```
prod-app/
├── compose.yaml      ← see compose.yaml
├── .env              ← never committed to Git
├── .dockerignore
├── nginx/
│   ├── Dockerfile    ← see Dockerfile
│   └── nginx.conf
└── backend/
    ├── Dockerfile    ← see Dockerfile
    ├── package.json
    └── server.js
```

## How to Run

```bash
# Create .env file first
echo "POSTGRES_PASSWORD=secret" > .env
echo "POSTGRES_DB=myapp" >> .env

# Start all 4 containers
docker compose up -d
```

## API Routes

| Route | Description |
|---|---|
| `GET /` | Returns app info |
| `GET /health` | Checks backend, PostgreSQL and Redis status |
| `GET /db-test` | Writes to PostgreSQL, returns visit count |
| `GET /redis-test` | Writes and reads from Redis |

```bash
curl http://localhost
curl http://localhost/health
curl http://localhost/db-test
curl http://localhost/redis-test
```
