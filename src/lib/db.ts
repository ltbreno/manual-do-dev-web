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

export async function ensureAdminUsersTableExists() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'viewer'
      );
    `);
  } catch (error) {
    console.error("Error creating admin_users table:", error);
    throw error;
  } finally {
    client.release();
  }
}

export async function ensureUsersTableExists() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        token_version INTEGER NOT NULL DEFAULT 0
      );
    `);
  } catch (error) {
    console.error("Error creating users table:", error);
    throw error;
  } finally {
    client.release();
  }
}

export async function ensureNewsletterSubscribersTableExists() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        email TEXT NOT NULL UNIQUE
      );
    `);
  } catch (error) {
    console.error("Error creating newsletter_subscribers table:", error);
    throw error;
  } finally {
    client.release();
  }
}

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
        legal_risk TEXT,
        uploaded_files JSONB
      );
    `);
    // Ensure columns exist if table was already created
    await client.query(`
      ALTER TABLE leads ADD COLUMN IF NOT EXISTS classification TEXT;
      ALTER TABLE leads ADD COLUMN IF NOT EXISTS legal_risk TEXT;
      ALTER TABLE leads ADD COLUMN IF NOT EXISTS uploaded_files JSONB;
      ALTER TABLE leads ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';
    `);
  } catch (error) {
    console.error("Error creating leads table:", error);
    throw error;
  } finally {
    client.release();
  }
}
