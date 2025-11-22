/**
 * Real-time data synchronization utility
 * Provides polling, caching, and auto-refresh capabilities
 */

type RefreshCallback = () => Promise<void>;

interface SyncOptions {
  interval?: number;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

class DataSyncManager {
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  private callbacks: Map<string, RefreshCallback> = new Map();

  /**
   * Register a data source for automatic synchronization
   */
  register(key: string, callback: RefreshCallback, options: SyncOptions = {}) {
    const { interval = 30000, onError, enabled = true } = options;

    // Store callback
    this.callbacks.set(key, callback);

    // Clear existing interval if any
    this.unregister(key);

    if (!enabled) return;

    // Set up polling interval
    const intervalId = setInterval(async () => {
      try {
        await callback();
      } catch (error) {
        console.error(`[DataSync] Error refreshing ${key}:`, error);
        if (onError) {
          onError(error as Error);
        }
      }
    }, interval);

    this.intervals.set(key, intervalId);
    console.log(`[DataSync] Registered ${key} with ${interval}ms interval`);
  }

  /**
   * Unregister a data source
   */
  unregister(key: string) {
    const intervalId = this.intervals.get(key);
    if (intervalId) {
      clearInterval(intervalId);
      this.intervals.delete(key);
      this.callbacks.delete(key);
      console.log(`[DataSync] Unregistered ${key}`);
    }
  }

  /**
   * Manually trigger refresh for a specific key
   */
  async refresh(key: string) {
    const callback = this.callbacks.get(key);
    if (callback) {
      try {
        await callback();
        console.log(`[DataSync] Manual refresh completed for ${key}`);
      } catch (error) {
        console.error(`[DataSync] Manual refresh failed for ${key}:`, error);
        throw error;
      }
    }
  }

  /**
   * Refresh all registered data sources
   */
  async refreshAll() {
    const promises = Array.from(this.callbacks.entries()).map(([key, callback]) =>
      callback().catch(error => {
        console.error(`[DataSync] Failed to refresh ${key}:`, error);
      })
    );
    await Promise.all(promises);
    console.log('[DataSync] All data sources refreshed');
  }

  /**
   * Clean up all intervals
   */
  cleanup() {
    this.intervals.forEach((intervalId, key) => {
      clearInterval(intervalId);
      console.log(`[DataSync] Cleaned up ${key}`);
    });
    this.intervals.clear();
    this.callbacks.clear();
  }

  /**
   * Get status of all registered syncs
   */
  getStatus() {
    return Array.from(this.intervals.keys()).map(key => ({
      key,
      active: true,
      lastSync: new Date()
    }));
  }
}

// Global singleton instance
export const dataSyncManager = new DataSyncManager();

/**
 * React hook for automatic data synchronization
 */
export function useDataSync(
  key: string,
  fetchData: RefreshCallback,
  options: SyncOptions = {}
) {
  const { interval = 30000, enabled = true } = options;

  // Register on mount
  if (typeof window !== 'undefined') {
    dataSyncManager.register(key, fetchData, { interval, enabled });
  }

  // Cleanup on unmount
  if (typeof window !== 'undefined') {
    return () => dataSyncManager.unregister(key);
  }
}

/**
 * Cache with automatic invalidation
 */
class DataCache {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();

  set(key: string, data: any, ttl: number = 60000) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const age = Date.now() - cached.timestamp;
    if (age > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  invalidate(key: string) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }
}

export const dataCache = new DataCache();

/**
 * Fetch with automatic caching and revalidation
 */
export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 60000
): Promise<T> {
  // Check cache first
  const cached = dataCache.get(key);
  if (cached) {
    console.log(`[Cache] Hit for ${key}`);
    return cached;
  }

  // Fetch and cache
  console.log(`[Cache] Miss for ${key}, fetching...`);
  const data = await fetcher();
  dataCache.set(key, data, ttl);
  return data;
}

/**
 * Visibility change handler for pausing/resuming sync
 */
if (typeof window !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      console.log('[DataSync] Page hidden, pausing aggressive syncs');
    } else {
      console.log('[DataSync] Page visible, resuming syncs');
      dataSyncManager.refreshAll();
    }
  });
}
