# StudySphere Backend (Register + Login)

## Tech
- Node.js + Express
- SQLite
- bcrypt

## Setup
```bash
cd backend
npm install
node server.js
```
Backend runs at: `http://localhost:3001`

## Endpoints
- `POST /api/register`
  - body: `{ "email": "...", "password": "..." }`
- `POST /api/login`
  - body: `{ "email": "...", "password": "..." }`

Responses:
- Invalid login returns `401` with `{ "message": "Invalid credentials" }`

