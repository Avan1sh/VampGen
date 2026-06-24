# VAMPGEN API

REST backend for VAMPGEN — **Express · TypeScript · Prisma · PostgreSQL**.

## Quick start

```bash
# 1. Install deps
npm install

# 2. Start PostgreSQL (Docker)
npm run db:up

# 3. Run migrations + seed the catalog
npm run prisma:migrate
npm run seed

# 4. Start the API (http://localhost:4000)
npm run dev
```

## Scripts
| Command | Description |
|---|---|
| `npm run dev` | Start API with hot reload (tsx) |
| `npm run db:up` / `db:down` | Start / stop the Postgres container |
| `npm run prisma:migrate` | Create & apply a migration |
| `npm run seed` | Seed the database from the front-end catalog |
| `npm run prisma:studio` | Open Prisma Studio (DB GUI) |
| `npm run typecheck` | Type-check without emitting |

See [`../docs/BACKEND.md`](../docs/BACKEND.md) for architecture & API design.
