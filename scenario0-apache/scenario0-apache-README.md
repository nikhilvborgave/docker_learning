# Scenario 0 — Apache + Fireworks

A static fireworks website served using Apache inside a Docker container built on Ubuntu.

## What This Covers
- Using `ubuntu` as a base image
- Installing packages with `apt` inside a container
- Using `ADD` to copy and auto-extract a `.tar.gz` file
- `VOLUME` for persisting Apache logs
- Running Apache in the foreground with `CMD`

## Project Structure
```
scenario0-apache/
├── Dockerfile
├── fireworks.tar.gz
```

## Key Dockerfile Concepts

**Why `ADD` instead of `COPY`?**
`ADD` automatically extracts `.tar.gz` files. `COPY` just copies the zip as-is without extracting.
```dockerfile
ADD fireworks.tar.gz /var/www/html    # extracts automatically ✅
```

**Why `-D FOREGROUND`?**
Docker requires the main process to run in the foreground. If Apache runs in the background, the container exits immediately.
```dockerfile
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
```

**Why `VOLUME`?**
Persists Apache logs even if the container is stopped or deleted.
```dockerfile
VOLUME /var/log/apache2
```

## How to Run

```bash
docker build -t scenario0-apache .
docker run -d -p 80:80 scenario0-apache
```

Open `http://localhost` in your browser.
