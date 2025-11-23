import { NextResponse } from 'next/server';
import { submitKeyPagesToIndexNow, submitSitemapToIndexNow } from '@/lib/indexnow';

/**
 * API Route: Submit URLs to IndexNow
 * POST /api/indexnow
 * 
 * Usage: Trigger after deployments or content updates
 */
export async function POST(request: Request) {
  try {
    const { urls, submitSitemap } = await request.json().catch(() => ({}));

    if (submitSitemap) {
      await submitSitemapToIndexNow();
      return NextResponse.json({ 
        success: true, 
        message: 'Sitemap submitted to IndexNow' 
      });
    }

    if (urls) {
      const { submitToIndexNow } = await import('@/lib/indexnow');
      await submitToIndexNow(urls);
      return NextResponse.json({ 
        success: true, 
        message: `${Array.isArray(urls) ? urls.length : 1} URL(s) submitted to IndexNow` 
      });
    }

    // Default: Submit key pages
    await submitKeyPagesToIndexNow();
    return NextResponse.json({ 
      success: true, 
      message: 'Key pages submitted to IndexNow' 
    });

  } catch (error) {
    console.error('[IndexNow API] Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to submit to IndexNow' 
      },
      { status: 500 }
    );
  }
}

// Allow GET to manually trigger from browser
export async function GET() {
  try {
    await submitKeyPagesToIndexNow();
    return NextResponse.json({ 
      success: true, 
      message: 'Key pages submitted to IndexNow (triggered via GET)' 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to submit' 
      },
      { status: 500 }
    );
  }
}
