import { Pool } from 'pg';

// Use DATABASE_URL or POSTGRES_URL (common in Vercel/Neon)
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  console.warn("WARNING: No database connection string found (DATABASE_URL or POSTGRES_URL). DB operations will fail.");
}

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined, // Often needed for cloud DBs
});

export default pool;

export async function ensureLeadsTableExists() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        name TEXT,
        email TEXT,
        whatsapp TEXT,
        company TEXT,
        business_data JSONB,
        score INTEGER,
        ai_analysis TEXT,
        classification TEXT,
        legal_risk TEXT
      );
    `);
    // Ensure columns exist if table was already created
    await client.query(`
      ALTER TABLE leads ADD COLUMN IF NOT EXISTS classification TEXT;
      ALTER TABLE leads ADD COLUMN IF NOT EXISTS legal_risk TEXT;
    `);
  } catch (error) {
    console.error("Error creating leads table:", error);
    throw error;
  } finally {
    client.release();
  }
}
