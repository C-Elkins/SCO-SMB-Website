# Real-Time Data Synchronization System

## Overview

The website now includes a comprehensive real-time data synchronization system that ensures all data stays up-to-date with the database at all times.

## Architecture

### 1. **DataSync Manager** (`lib/dataSync.ts`)

Core utility that manages automatic data polling and synchronization:

- **Auto-refresh intervals**: Configurable polling for different data types
- **Cache management**: Intelligent caching with TTL (Time To Live)
- **Visibility detection**: Pauses aggressive polling when tab is inactive
- **Manual refresh**: Trigger immediate data updates
- **Cleanup**: Automatic cleanup on component unmount

### 2. **Admin Dashboard Sync**

The admin dashboard implements comprehensive real-time synchronization:

#### Sync Intervals:
- **Dashboard Stats**: 30 seconds
- **License Keys**: 15 seconds (most frequent - critical data)
- **Customers**: 30 seconds
- **Admin Users**: 60 seconds (less frequent - stable data)

#### Features:
- ✅ Live sync indicator with pulse animation
- ✅ Last updated timestamp display
- ✅ Manual "Refresh Now" button
- ✅ Auto-sync toggle (enable/disable)
- ✅ Loading states during refresh
- ✅ Cache invalidation on data mutations

#### Cache Invalidation:
When data is modified (create/update/delete), the system:
1. Invalidates relevant caches
2. Immediately fetches fresh data
3. Updates UI without full page reload

```typescript
// Example: After creating a license key
dataCache.invalidate('license-keys');
dataCache.invalidate('dashboard-stats');
await fetchLicenseKeys();
await fetchDashboardStats();
```

### 3. **Portal Page Sync**

The technician portal automatically refreshes release data:

- **Release data**: 5 minutes (GitHub API rate limit friendly)
- **Auto-refresh**: On page visibility change
- **Fresh data**: `cache: 'no-store'` ensures no stale data

### 4. **License Validation**

License validation API ensures real-time accuracy:

- ✅ Always queries fresh database data (no caching)
- ✅ Updates `updated_at` and `last_used` timestamps
- ✅ Logs all validation attempts
- ✅ Console logging for debugging
- ✅ Real-time download count tracking

### 5. **Sync API Endpoint**

New `/api/admin/sync` endpoint provides:

#### GET Request:
- Fetches recent changes since specified timestamp
- Returns recent keys, customers, and activity logs
- Used for polling-based real-time updates

```typescript
GET /api/admin/sync?since=2024-01-01T12:00:00Z
```

#### POST Request (Webhook):
- External systems can trigger data refresh
- Logs webhook events to audit log
- Useful for CI/CD integration

```typescript
POST /api/admin/sync
{
  "event": "deployment_complete",
  "data": { ... }
}
```

## Usage Examples

### React Component with Auto-Sync

```typescript
import { dataSyncManager, dataCache } from '@/lib/dataSync';

function MyComponent() {
  useEffect(() => {
    // Register auto-refresh
    dataSyncManager.register('my-data', fetchMyData, {
      interval: 30000, // 30 seconds
      enabled: true,
      onError: (error) => console.error('Sync failed:', error)
    });

    // Cleanup on unmount
    return () => dataSyncManager.unregister('my-data');
  }, []);

  const fetchMyData = async () => {
    const response = await fetch('/api/my-data', {
      cache: 'no-store' // Always fresh
    });
    const data = await response.json();
    setMyData(data);
  };

  return <div>{/* Your UI */}</div>;
}
```

### Manual Refresh

```typescript
// Trigger immediate refresh for specific key
await dataSyncManager.refresh('license-keys');

// Refresh all registered data sources
await dataSyncManager.refreshAll();
```

### Cache Management

```typescript
import { dataCache, fetchWithCache } from '@/lib/dataSync';

// Fetch with automatic caching
const data = await fetchWithCache(
  'my-cache-key',
  () => fetch('/api/data').then(r => r.json()),
  60000 // 60 second TTL
);

// Invalidate specific cache
dataCache.invalidate('my-cache-key');

// Clear all caches
dataCache.clear();
```

## Performance Optimizations

1. **Adaptive Polling**: 
   - More frequent for critical data (keys: 15s)
   - Less frequent for stable data (admins: 60s)

2. **Visibility-Based**: 
   - Pauses aggressive polling when page hidden
   - Refreshes all data when page becomes visible

3. **Cache Layers**:
   - In-memory cache with TTL
   - HTTP `cache: 'no-store'` for always-fresh data
   - Smart invalidation on mutations

4. **Parallel Requests**:
   - Uses `Promise.all()` for concurrent fetches
   - Reduces total load time

5. **Error Handling**:
   - Graceful degradation on sync failures
   - Console logging for debugging
   - Optional error callbacks

## Database Best Practices

All database operations now:

1. **Update Timestamps**: Set `updated_at` on every change
2. **Track Activity**: Log to `audit_logs` for monitoring
3. **No Caching**: Direct database queries for critical operations
4. **Atomic Updates**: Use transactions where needed

## Monitoring

### Console Logs

```
[DataSync] Registered license-keys with 15000ms interval
[DataSync] Manual refresh completed for license-keys
[Cache] Hit for dashboard-stats
[Cache] Miss for customers, fetching...
[License Validation] Checking key: SCO-1234...
[License Validation] Key activated: SCO-1234...
[Portal] Release data updated: v1.2.3
```

### Sync Status

Check active syncs in browser console:

```javascript
dataSyncManager.getStatus()
// Returns: [{ key: 'license-keys', active: true, lastSync: Date }]
```

## API Endpoints with Real-Time Support

| Endpoint | Cache | Refresh Interval | Notes |
|----------|-------|------------------|-------|
| `/api/admin/stats` | 30s TTL | 30s | Dashboard statistics |
| `/api/admin/keys` | 15s TTL | 15s | License keys (critical) |
| `/api/admin/customers` | 30s TTL | 30s | Customer database |
| `/api/admin/users` | 60s TTL | 60s | Admin users |
| `/api/releases/latest` | 5min TTL | 5min | GitHub releases |
| `/api/validate-license` | No cache | On-demand | Always fresh validation |
| `/api/admin/sync` | No cache | Polling | Real-time updates |

## Configuration

### Customize Sync Intervals

```typescript
// In component
dataSyncManager.register('my-key', fetchData, {
  interval: 45000,  // 45 seconds
  enabled: true,
  onError: handleError
});
```

### Adjust Cache TTL

```typescript
// Short-lived cache (15 seconds)
dataCache.set('volatile-data', data, 15000);

// Long-lived cache (5 minutes)
dataCache.set('stable-data', data, 300000);
```

## Testing Real-Time Sync

1. **Open Admin Dashboard**
2. **Watch live sync indicator** (green pulsing dot)
3. **Check "Last updated" timestamp**
4. **Make changes** (create/delete key)
5. **Verify immediate refresh** (no page reload needed)
6. **Toggle auto-sync** to pause/resume
7. **Click "Refresh Now"** for manual updates

## Future Enhancements

- [ ] WebSocket support for instant push updates
- [ ] Conflict resolution for concurrent edits
- [ ] Offline support with sync queue
- [ ] Per-user sync preferences
- [ ] Analytics on sync performance
- [ ] Batch operations for efficiency

## Troubleshooting

### Data Not Updating?

1. Check auto-sync is enabled (green indicator)
2. Verify network connectivity
3. Check browser console for errors
4. Try manual refresh button
5. Clear cache: `dataCache.clear()`

### High Server Load?

1. Increase sync intervals
2. Disable auto-sync for inactive tabs
3. Reduce number of registered syncs
4. Implement rate limiting

### Stale Data?

1. Ensure `cache: 'no-store'` in fetch calls
2. Verify cache invalidation on mutations
3. Check timestamp updates in database
4. Monitor `updated_at` fields

## Summary

The website now maintains **real-time synchronization** with the database through:

✅ Automatic polling at optimized intervals  
✅ Smart caching with invalidation  
✅ Visibility-based sync control  
✅ Manual refresh capabilities  
✅ Comprehensive logging  
✅ Cache-free critical operations  
✅ Timestamp tracking  
✅ Webhook support  

**Result**: The admin dashboard and portal always reflect the current database state without manual page refreshes.
