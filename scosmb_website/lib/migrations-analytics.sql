-- Migration: Fix schema issues for analytics
-- Run this if you encounter foreign key constraint errors

-- Fix download_logs foreign key reference (if needed)
-- Drop the old constraint and recreate with correct UUID type
DO $$ 
BEGIN
    -- Check if license_key_id is INTEGER and needs conversion
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'download_logs' 
        AND column_name = 'license_key_id' 
        AND data_type = 'integer'
    ) THEN
        -- Drop the foreign key constraint if it exists
        ALTER TABLE download_logs DROP CONSTRAINT IF EXISTS download_logs_license_key_id_fkey;
        
        -- Change the column type to UUID
        ALTER TABLE download_logs ALTER COLUMN license_key_id TYPE UUID USING license_key_id::text::uuid;
        
        -- Recreate the foreign key constraint
        ALTER TABLE download_logs ADD CONSTRAINT download_logs_license_key_id_fkey 
            FOREIGN KEY (license_key_id) REFERENCES license_keys(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Ensure all necessary indexes exist for analytics queries
CREATE INDEX IF NOT EXISTS idx_license_keys_created_at ON license_keys(created_at);
CREATE INDEX IF NOT EXISTS idx_license_keys_customer_name ON license_keys(customer_name) WHERE customer_name IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_download_logs_platform ON download_logs(platform) WHERE platform IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_download_logs_success ON download_logs(success);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

-- Add updated_at column to license_keys if it doesn't exist (for better tracking)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'license_keys' 
        AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE license_keys ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();
        
        -- Create a trigger to automatically update updated_at
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $trigger$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $trigger$ LANGUAGE plpgsql;
        
        CREATE TRIGGER update_license_keys_updated_at 
            BEFORE UPDATE ON license_keys 
            FOR EACH ROW 
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Ensure asset_name column exists in download_logs (for better tracking)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'download_logs' 
        AND column_name = 'asset_name'
    ) THEN
        ALTER TABLE download_logs ADD COLUMN asset_name VARCHAR(255);
        CREATE INDEX IF NOT EXISTS idx_download_logs_asset ON download_logs(asset_name);
    END IF;
END $$;

-- Add last_used column to license_keys if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'license_keys' 
        AND column_name = 'last_used'
    ) THEN
        ALTER TABLE license_keys ADD COLUMN last_used TIMESTAMP;
        CREATE INDEX IF NOT EXISTS idx_license_keys_last_used ON license_keys(last_used);
    END IF;
END $$;

-- Create a view for easy analytics queries
CREATE OR REPLACE VIEW analytics_summary AS
SELECT 
    (SELECT COUNT(*) FROM license_keys) as total_keys,
    (SELECT COUNT(*) FROM license_keys WHERE status = 'active') as active_keys,
    (SELECT COUNT(*) FROM license_keys WHERE status = 'revoked') as revoked_keys,
    (SELECT COUNT(*) FROM license_keys WHERE status = 'unused') as unused_keys,
    (SELECT COUNT(*) FROM download_logs) as total_downloads,
    (SELECT COUNT(*) FROM download_logs WHERE download_date > NOW() - INTERVAL '24 hours') as downloads_today,
    (SELECT COUNT(*) FROM download_logs WHERE download_date > NOW() - INTERVAL '7 days') as downloads_week,
    (SELECT COUNT(*) FROM download_logs WHERE download_date > NOW() - INTERVAL '30 days') as downloads_month,
    (SELECT COUNT(*) FROM customers) as total_customers,
    (SELECT COUNT(*) FROM customers WHERE status = 'active') as active_customers,
    (SELECT COALESCE(SUM(download_count), 0) FROM license_keys) as total_license_downloads;

-- Grant permissions (adjust as needed for your setup)
GRANT SELECT ON analytics_summary TO PUBLIC;

COMMENT ON VIEW analytics_summary IS 'Quick analytics summary for dashboard';
