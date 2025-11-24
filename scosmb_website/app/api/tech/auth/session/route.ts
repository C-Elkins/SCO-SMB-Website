export const dynamic = 'force-dynamic';

// Your existing code with Cache-Control headers applied

NextResponse.json = ((...args) => {
    const response = NextResponse.json(...args);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
});

// ... Rest of your existing code
