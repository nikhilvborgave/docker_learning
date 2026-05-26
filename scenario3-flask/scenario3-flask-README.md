# Scenario 3 — Python Flask API

A Flask REST API that reads secrets from environment variables, running inside a Docker container.

## What This Covers
- Using `python:3.10-slim` as a lightweight base image
- `pip install -r requirements.txt` for dependencies
- Keeping secrets OUT of the image using `.dockerignore`
- Passing environment variables at runtime with `--env-file`
- `env_file` in Docker Compose for secret management
- `.dockerignore` to exclude `.env`, `__pycache__`, `.pyc` files

## Project Structure
```
scenario3-flask/
├── Dockerfile        ← see Dockerfile
├── compose.yaml      ← see compose.yaml
├── requirements.txt
├── app.py
├── .dockerignore
└── .env              ← never committed to Git
```

## Key Dockerfile Concepts

**Why not put secrets in the Dockerfile?**
Dockerfiles go to Git. If you hardcode secrets — everyone with repo access can see them.
```dockerfile
ENV API_KEY=secret123    # ❌ never do this
```
Instead pass at runtime:
```bash
docker run --env-file .env scenario3-flask    # ✅ secret stays on your machine
```

**Why `requirements.txt` before `app.py`?**
```dockerfile
COPY requirements.txt /app
RUN pip install -r requirements.txt    # cached unless requirements.txt changes
COPY app.py /app                       # only this rebuilds on code change
```

## How to Run

```bash
# Using Compose
docker compose up -d

# Manual
docker build -t scenario3-flask .
docker run -d -p 5000:5000 --env-file .env scenario3-flask
```

## API Routes

| Route | Description |
|---|---|
| `GET /` | Returns app info |
| `GET /health` | Returns health status |
| `GET /secret` | Confirms if API_KEY was loaded |

```bash
curl http://localhost:8080
curl http://localhost:8080/health
curl http://localhost:8080/secret
```
