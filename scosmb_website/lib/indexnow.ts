/**
 * IndexNow API Integration
 * Instantly notify search engines (Bing, Yandex, etc.) when pages are updated
 * https://www.indexnow.org/
 */

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '1e36e6cc47f04434b429e1748fa96116'; // IndexNow API key
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow'
];

interface IndexNowSubmission {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

/**
 * Submit URLs to IndexNow for instant indexing
 */
export async function submitToIndexNow(urls: string | string[]): Promise<void> {
  const urlList = Array.isArray(urls) ? urls : [urls];
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('[IndexNow] Skipping in development mode:', urlList);
    return;
  }

  const submission: IndexNowSubmission = {
    host: 'sco-smb.com',
    key: INDEXNOW_KEY,
    keyLocation: `https://sco-smb.com/${INDEXNOW_KEY}.txt`,
    urlList: urlList.map(url => {
      // Ensure full URLs
      if (url.startsWith('/')) {
        return `https://sco-smb.com${url}`;
      }
      return url;
    })
  };

  // Submit to all IndexNow endpoints
  const results = await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map(endpoint =>
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      })
    )
  );

  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value.ok) {
      console.log(`[IndexNow] ✅ Submitted to ${INDEXNOW_ENDPOINTS[index]}`);
    } else {
      console.error(`[IndexNow] ❌ Failed to submit to ${INDEXNOW_ENDPOINTS[index]}`);
    }
  });
}

/**
 * Submit sitemap to IndexNow
 */
export async function submitSitemapToIndexNow(): Promise<void> {
  const sitemapUrl = 'https://sco-smb.com/sitemap.xml';
  await submitToIndexNow(sitemapUrl);
}

/**
 * Convenience function to submit common pages
 */
export async function submitKeyPagesToIndexNow(): Promise<void> {
  const keyPages = [
    '/',
    '/features',
    '/pricing',
    '/download',
    '/trial',
    '/contact',
    '/docs',
    '/about'
  ];
  
  await submitToIndexNow(keyPages);
}
