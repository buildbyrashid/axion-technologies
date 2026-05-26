import { config } from 'dotenv';
config({ path: '.env.local' });
import pool from './src/lib/db';
import { query } from './src/lib/db-helpers';

async function main() {
  try {
    const fs = require('fs');
    const path = require('path');
    
    await query('ALTER TABLE homepage_products ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;');
    await query('ALTER TABLE homepage_expertise ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;');
    
    const footerSql = fs.readFileSync(path.join(__dirname, 'database', 'schema', '009_footer_settings.sql'), 'utf8');
    await query(footerSql);
    
    console.log("Migration successful!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    process.exit(0);
  }
}

main();
