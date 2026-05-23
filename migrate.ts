import { config } from 'dotenv';
config({ path: '.env.local' });
import pool from './src/lib/db';
import { query } from './src/lib/db-helpers';

async function main() {
  try {
    await query('ALTER TABLE homepage_products ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;');
    await query('ALTER TABLE homepage_expertise ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;');
    console.log("Migration successful!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    process.exit(0);
  }
}

main();
