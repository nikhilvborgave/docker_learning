# Scenario 1 — Nginx Static Website

A simple HTML/CSS website served using Nginx inside a Docker container.

## What This Covers
- Using `nginx:alpine` as a lightweight base image
- `COPY` for moving static files into the image
- Difference between `COPY` and `ADD`
- `EXPOSE` to document the port
- Nginx's default serving path `/usr/share/nginx/html`

## Project Structure
```
scenario1-nginx/
├── Dockerfile
├── index.html
└── style.css
```

## Key Dockerfile Concepts

**Why `nginx:alpine` instead of `nginx:latest`?**
Alpine is a minimal Linux distro. Much smaller image size — better for production.

**Where does Nginx serve files from?**
```
/usr/share/nginx/html/    ← Nginx default path
/var/www/html/            ← Apache's path (common mistake)
```

**Why COPY and not ADD?**
`COPY` is preferred for simple file copying. `ADD` is only needed for URL downloads or `.tar.gz` extraction.

## How to Run

```bash
docker build -t scenario1-nginx .
docker run -d -p 80:80 scenario1-nginx
```

Open `http://localhost` in your browser.
