const express = require('express');
const cors = require('cors');

const bcrypt = require('bcrypt');

const { initDb, get } = require('./db');
const { db } = require('./db');

const app = express();

// If you serve frontend as static files, you can allow all origins.
app.use(cors({ origin: '*' }));
app.use(express.json());

function badRequest(res, message) {
  return res.status(400).json({ message });
}

async function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) return badRequest(res, 'Email and password are required.');

    const normalizedEmail = String(email).trim().toLowerCase();
    if (normalizedEmail.length < 5) return badRequest(res, 'Invalid email.');
    if (String(password).length < 6) return badRequest(res, 'Password must be at least 6 characters.');

    const existing = await get('SELECT id FROM users WHERE email = ?', [normalizedEmail]);
    if (existing) return res.status(409).json({ message: 'Email already registered.' });

    const passwordHash = await bcrypt.hash(String(password), 10);
    await run(
      'INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, datetime("now"))',
      [normalizedEmail, passwordHash]
    );

    return res.status(201).json({ message: 'Registration successful.' });
  } catch (err) {
    // sqlite unique constraint etc.
    if (String(err && err.message).toLowerCase().includes('unique')) {
      return res.status(409).json({ message: 'Email already registered.' });
    }
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) return badRequest(res, 'Email and password are required.');

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await get('SELECT id, password_hash FROM users WHERE email = ?', [normalizedEmail]);

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(String(password), user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    // Plain success only (no JWT/session per your request)
    return res.status(200).json({ message: 'Login successful.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
});

const PORT = process.env.PORT || 3001;

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.error('Failed to init DB', e);
    process.exit(1);
  });

