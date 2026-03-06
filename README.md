# pgui

A lightweight web GUI for browsing PostgreSQL databases. Point it at your servers, and it discovers everything - databases, schemas, tables, views - so you can explore structure and data without writing a single query.

## Features

- **Multi-server** - connect to as many PostgreSQL servers as you need
- **Auto-discovery** - databases, schemas, tables, and views appear automatically
- **Data browser** - paginated grid with sorting, filtering, and type-aware rendering
- **Structure at a glance** - columns, indexes, and constraints for every table
- **Create databases** - spin up new databases directly from the UI
- **Dark / light theme** - toggle or follow system preference
- **Read-only by default** - connections enforce read-only mode
- **Copy connection URLs** - one-click `postgresql://` strings

## Quick Start

### Docker

```bash
docker run -p 3000:3000 \
  -e DB_1_NAME=production \
  -e DB_1_HOST=host.docker.internal \
  -e DB_1_USER=readonly \
  -e DB_1_PASSWORD=secret \
  your-image:latest
```

### Docker Compose

```yaml
services:
  pgui:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_1_NAME=production
      - DB_1_HOST=host.docker.internal
      - DB_1_USER=readonly
      - DB_1_PASSWORD=secret
    restart: unless-stopped
```

### Local

```bash
npm install
cp .env.example .env   # then edit with your server details
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Servers are configured via numbered environment variables (`DB_1_*`, `DB_2_*`, etc.):

| Variable          | Required | Default      | Description              |
| ----------------- | -------- | ------------ | ------------------------ |
| `DB_{N}_NAME`     | No       | `Server {N}` | Display name in the UI   |
| `DB_{N}_HOST`     | Yes      |              | PostgreSQL host          |
| `DB_{N}_PORT`     | No       | `5432`       | PostgreSQL port          |
| `DB_{N}_USER`     | Yes      |              | PostgreSQL user          |
| `DB_{N}_PASSWORD` | No       | `""`         | PostgreSQL password      |
| `DB_{N}_SSL`      | No       | `false`      | Set `true` to enable SSL |

Example with two servers:

```bash
DB_1_NAME=production
DB_1_HOST=localhost
DB_1_USER=readonly
DB_1_PASSWORD=secret

DB_2_NAME=staging
DB_2_HOST=staging-db.internal
DB_2_USER=readonly
DB_2_PASSWORD=secret2
DB_2_SSL=true
```
