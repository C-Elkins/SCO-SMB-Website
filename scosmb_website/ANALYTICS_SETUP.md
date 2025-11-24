# Analytics Setup Guide

## Overview
The admin dashboard includes a comprehensive analytics system that tracks:
- Download statistics and growth trends
- Platform usage distribution (Windows, Mac, Linux)
- License key metrics (active, revoked, unused)
- Monthly trends over 6 months
- Top customers by download count
- Recent activity feed

## Database Requirements

### Required Tables
All analytics queries rely on these tables:
- `license_keys` - License key tracking with download counts
- `download_logs` - Individual download events with platform info
- `customers` - Customer information (optional, for enhanced analytics)
- `admin_users` - Admin authentication

### Schema Verification

Run this migration to ensure your database has all required columns and indexes:

```bash
npm run db:migrate:analytics
```

This will:
- ✅ Fix foreign key constraints between `download_logs` and `license_keys`
- ✅ Add missing columns (`updated_at`, `last_used`, `asset_name`)
- ✅ Create performance indexes for analytics queries
- ✅ Create an `analytics_summary` view for quick stats

### Manual Migration (Alternative)

If you prefer to run the SQL directly (requires psql and DATABASE_URL):

```bash
psql $DATABASE_URL -f lib/migrations-analytics.sql
```

**Note**: The npm script automatically loads environment variables from `.env.local`.

## API Endpoint

**Route**: `/api/admin/analytics`  
**Method**: `GET`  
**Auth**: Requires admin session cookie

### Query Parameters
- `range` (optional): Time range for analytics
  - `7d` - Last 7 days
  - `30d` - Last 30 days (default)
  - `90d` - Last 90 days
  - `1y` - Last year

### Response Format

```json
{
  "downloadStats": {
    "total": 1250,
    "thisMonth": 145,
    "lastMonth": 132,
    "growth": 9.8
  },
  "platformStats": {
    "windows": 65,
    "mac": 30,
    "linux": 5
  },
  "keyStats": {
    "totalKeys": 50,
    "activeKeys": 42,
    "revokedKeys": 5,
    "unusedKeys": 3
  },
  "monthlyTrends": [
    {
      "month": "Jun",
      "downloads": 85,
      "keysGenerated": 8
    }
    // ... 5 more months
  ],
  "topCustomers": [
    {
      "name": "Company Name",
      "email": "contact@company.com",
      "downloads": 125,
      "keys": 5
    }
    // ... up to 5 customers
  ],
  "recentActivity": [
    {
      "type": "download",
      "description": "Software downloaded on Windows 11",
      "timestamp": "2 hours ago"
    }
    // ... up to 8 recent activities
  ]
}
```

## Performance Optimization

### Indexes
The migration creates these indexes for fast queries:
- `idx_license_keys_created_at` - For time-based queries
- `idx_license_keys_customer_name` - For top customers
- `idx_download_logs_platform` - For platform stats
- `idx_download_logs_date` - For monthly trends

### Caching
The endpoint has `revalidate: 0` to ensure fresh data, but you can add caching:

```typescript
export const revalidate = 300; // Cache for 5 minutes
```

## Testing

### Verify Tables Exist
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('license_keys', 'download_logs', 'customers', 'admin_users');
```

### Check Data
```sql
-- Should return counts
SELECT 
  (SELECT COUNT(*) FROM license_keys) as keys,
  (SELECT COUNT(*) FROM download_logs) as downloads,
  (SELECT COUNT(*) FROM customers) as customers;
```

### Test API Endpoint
```bash
# Login first to get session cookie, then:
curl -X GET 'https://your-domain.com/api/admin/analytics?range=30d' \
  --cookie 'admin_session=YOUR_SESSION_TOKEN'
```

## Troubleshooting

### Error: "relation 'download_logs' does not exist"
**Solution**: Run the main migrations first:
```bash
npm run db:migrate
```

### Error: "column 'updated_at' does not exist"
**Solution**: Run the analytics migration:
```bash
npm run db:migrate:analytics
```

### Error: "foreign key constraint fails"
**Solution**: The analytics migration will fix UUID/INTEGER mismatches automatically.

### No data showing
**Solution**: Ensure you have some test data:
```sql
-- Insert test license key
INSERT INTO license_keys (key_code, status, download_count, customer_name, customer_email)
VALUES ('TEST-1234-5678', 'active', 5, 'Test Company', 'test@example.com');

-- Insert test download log
INSERT INTO download_logs (platform, success)
VALUES ('Windows 11', true);
```

## Live Deployment

After deploying to Vercel:

1. **Run migrations on production database**:
   ```bash
   # Using Vercel Postgres CLI
   vercel env pull .env.production
   psql $(grep DATABASE_URL .env.production | cut -d '=' -f2) -f lib/migrations-analytics.sql
   ```

2. **Verify in admin dashboard**:
   - Login at `/admin`
   - Navigate to Analytics tab
   - Should see real data (or zeros if no activity yet)

3. **Monitor performance**:
   - Check Vercel function logs for slow queries
   - Add indexes if specific queries are slow

## Future Enhancements

Potential additions:
- [ ] Revenue tracking integration
- [ ] Email notification on key thresholds
- [ ] Export analytics to CSV/PDF
- [ ] Custom date range picker
- [ ] Comparison with previous periods
- [ ] Customer lifetime value calculations
