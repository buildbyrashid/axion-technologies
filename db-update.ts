import pool from './src/lib/db';

async function migrateDatabase() {
  try {
    console.log('Migrating Inquiries to Opportunities Pipeline...');
    
    // Check if table exists before renaming
    await pool.query('RENAME TABLE inquiries TO opportunities;');
    console.log('Renamed table to opportunities.');
    
    await pool.query(`ALTER TABLE opportunities CHANGE source opportunity_type VARCHAR(50) DEFAULT 'b2b_deal';`);
    console.log('Updated source column to opportunity_type.');
    
    await pool.query(`ALTER TABLE opportunities CHANGE status pipeline_stage VARCHAR(50) DEFAULT 'new';`);
    console.log('Updated status column to pipeline_stage.');
    
    await pool.query(`ALTER TABLE opportunities ADD COLUMN budget_estimate DECIMAL(15,2) DEFAULT NULL;`);
    console.log('Added budget_estimate column.');
    
    await pool.query(`ALTER TABLE opportunities ADD COLUMN priority VARCHAR(20) DEFAULT 'medium';`);
    console.log('Added priority column.');
    
    console.log('Migration complete!');
  } catch (err: any) {
    if (err.message.includes("Table 'axion_technology.inquiries' doesn't exist") || err.message.includes("doesn't exist")) {
        console.log("Inquiries table doesn't exist (already renamed?). Adding new columns if needed...");
        try {
            await pool.query(`ALTER TABLE opportunities ADD COLUMN budget_estimate DECIMAL(15,2) DEFAULT NULL;`);
            await pool.query(`ALTER TABLE opportunities ADD COLUMN priority VARCHAR(20) DEFAULT 'medium';`);
        } catch(e) {}
    } else {
        console.error('Migration failed:', err.message);
    }
  }
  process.exit(0);
}

migrateDatabase();
