const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mysql = require('mysql2/promise');
const { config } = require('../src/config/db');
(async () => {
  const { database, ...connectionConfig } = config;
  const admin = await mysql.createConnection({ ...connectionConfig, multipleStatements: true });
  try {
    // El nombre de BD es un identificador, no un valor SQL: validarlo primero.
    if (!/^[a-zA-Z0-9_]+$/.test(database)) throw new Error('DB_NAME debe tener letras, números o guion bajo');
    await admin.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await admin.query(`USE \`${database}\``);
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    // CREATE INDEX no incluye IF NOT EXISTS, por lo que se omite al reinicializar.
    const statements = schema.split(';').map(s => s.trim()).filter(Boolean);
    for (const statement of statements) {
      const sql = statement.replace(/^--[^\n]*\n/gm, '').trim();
      if (!sql) continue;
      if (/^CREATE INDEX/i.test(sql)) {
        try { await admin.query(sql); } catch (e) { if (e.code !== 'ER_DUP_KEYNAME') throw e; }
      } else await admin.query(sql);
    }
    console.log('Base de datos y tablas creadas o verificadas.');
  } finally { await admin.end(); }
  await require('./seed').seed();
})().catch(error => { console.error('Error de inicialización:', error.message); process.exitCode = 1; });
