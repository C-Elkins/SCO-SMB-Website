import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb } from '@/lib/db';
import { tech_blog_posts, tech_users, tech_sessions, tech_activity_logs } from '@/lib/schema';

const db = getDb();
import { eq, and, gt, desc } from 'drizzle-orm';

// Helper to get authenticated tech user
async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('tech_session')?.value;

  if (!sessionToken) {
    return null;
  }

  const sessions = await db
    .select({ user: tech_users })
    .from(tech_sessions)
    .innerJoin(tech_users, eq(tech_sessions.user_id, tech_users.id))
    .where(
      and(
        eq(tech_sessions.session_token, sessionToken),
        gt(tech_sessions.expires_at, new Date())
      )
    )
    .limit(1);

  return sessions.length > 0 ? sessions[0].user : null;
}

// GET - Fetch all blog posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = db
      .select({
        post: tech_blog_posts,
        author: {
          id: tech_users.id,
          username: tech_users.username,
          full_name: tech_users.full_name,
          avatar_url: tech_users.avatar_url,
          role: tech_users.role,
        },
      })
      .from(tech_blog_posts)
      .innerJoin(tech_users, eq(tech_blog_posts.author_id, tech_users.id))
      .orderBy(desc(tech_blog_posts.is_pinned), desc(tech_blog_posts.created_at))
      .limit(limit);

    const posts = await query;

    // Parse JSON fields
    const formattedPosts = posts.map(({ post, author }) => ({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : [],
      affected_versions: post.affected_versions ? JSON.parse(post.affected_versions) : [],
      related_printers: post.related_printers ? JSON.parse(post.related_printers) : [],
      author,
    }));

    // Filter by category and status if provided
    let filtered = formattedPosts;
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (status) {
      filtered = filtered.filter((p) => p.status === status);
    }

    return NextResponse.json({ success: true, posts: filtered });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post
export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const {
      title,
      content,
      category,
      tags = [],
      severity,
      status = 'open',
      affected_versions = [],
      related_printers = [],
    } = data;

    if (!title || !content || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create post
    const newPosts = await db
      .insert(tech_blog_posts)
      .values({
        author_id: user.id,
        title,
        content,
        category,
        tags: JSON.stringify(tags),
        severity: severity || null,
        status,
        affected_versions: JSON.stringify(affected_versions),
        related_printers: JSON.stringify(related_printers),
      })
      .returning();

    const newPost = newPosts[0];

    // Update user post count
    await db
      .update(tech_users)
      .set({ total_posts: (user.total_posts || 0) + 1 })
      .where(eq(tech_users.id, user.id));

    // Log activity
    await db.insert(tech_activity_logs).values({
      user_id: user.id,
      action: 'blog_post_created',
      details: JSON.stringify({
        post_id: newPost.id,
        title,
        category,
      }),
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
    });

    return NextResponse.json({
      success: true,
      post: {
        ...newPost,
        tags: JSON.parse(newPost.tags || '[]'),
        affected_versions: JSON.parse(newPost.affected_versions || '[]'),
        related_printers: JSON.parse(newPost.related_printers || '[]'),
      },
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
