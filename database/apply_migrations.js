// database/apply_migrations.js
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Manual .env.local parser to avoid installing additional dependencies
function loadEnv() {
  const envPath = path.join(__dirname, '../.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local not found at:', envPath);
    process.exit(1);
  }

  const content = fs.readFileSync(envPath, 'utf8');
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index === -1) continue;
    const key = trimmed.substring(0, index).trim();
    const val = trimmed.substring(index + 1).trim();
    process.env[key] = val;
  }
}

async function run() {
  loadEnv();

  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  
  if (!DB_HOST || !DB_USER || !DB_NAME) {
    console.error('❌ Missing database credentials in process.env');
    process.exit(1);
  }

  console.log(`Connecting to MySQL database ${DB_NAME} at ${DB_HOST}:${DB_PORT || 3306}...`);

  // First connect to mysql without database to ensure database exists or we can create/use it
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: parseInt(DB_PORT || '3306'),
    user: DB_USER,
    password: DB_PASSWORD
  });

  // Create database if not exists
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  await connection.query(`USE \`${DB_NAME}\``);

  console.log('✅ Connected to database successfully.');

  const migrations = [
    '001_homepage_content.sql',
    '002_global_cta.sql'
  ];

  for (const file of migrations) {
    const filePath = path.join(__dirname, 'schema', file);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Migration file not found: ${filePath}`);
      continue;
    }

    console.log(`\nApplying migration: ${file}...`);
    const sqlContent = fs.readFileSync(filePath, 'utf8');
    
    // Split SQL by semicolon, but clean up comments and empty statements
    const statements = sqlContent
      .split(';')
      .map(stmt => {
        // Remove single line comments starting with --
        return stmt
          .split('\n')
          .filter(line => !line.trim().startsWith('--'))
          .join('\n')
          .trim();
      })
      .filter(stmt => stmt.length > 0);

    for (let stmt of statements) {
      try {
        await connection.query(stmt);
      } catch (err) {
        console.error(`❌ Error executing statement:\n${stmt}\n`);
        console.error('Error details:', err.message);
        throw err;
      }
    }
    console.log(`✅ Applied migration ${file} successfully.`);
  }

  await connection.end();
  console.log('\n🎉 All migrations completed successfully!');
}

run().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
