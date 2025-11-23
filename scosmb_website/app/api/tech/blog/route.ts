import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSql } from '@/lib/db';

// Helper to get authenticated tech user
async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('tech_session')?.value;

  if (!sessionToken) {
    return null;
  }

  const sql = getSql();
  const sessions = await sql`
    SELECT u.id, u.username, u.full_name, u.email, u.role, u.avatar_url
    FROM tech_sessions s
    INNER JOIN tech_users u ON s.user_id = u.id
    WHERE s.session_token = ${sessionToken} AND s.expires_at > CURRENT_TIMESTAMP
    LIMIT 1
  `;

  return (sessions as any[]).length > 0 ? (sessions as any[])[0] : null;
}

// GET - Fetch all blog posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    const sql = getSql();
    const posts = await sql`
      SELECT 
        p.id, p.title, p.content, p.category, p.tags, p.severity, p.status,
        p.affected_versions, p.related_printers, p.views, p.likes, p.is_pinned,
        p.is_solution, p.created_at, p.updated_at, p.resolved_at,
        u.id as author_id, u.username as author_username, u.full_name as author_full_name,
        u.avatar_url as author_avatar_url, u.role as author_role
      FROM tech_blog_posts p
      INNER JOIN tech_users u ON p.author_id = u.id
      ORDER BY p.is_pinned DESC, p.created_at DESC
      LIMIT ${limit}
    `;

    // Parse JSON fields and restructure data
    const formattedPosts = (posts as any[]).map((row) => ({
      id: row.id,
      title: row.title,
      content: row.content,
      category: row.category,
      tags: row.tags ? JSON.parse(row.tags) : [],
      severity: row.severity,
      status: row.status,
      affected_versions: row.affected_versions ? JSON.parse(row.affected_versions) : [],
      related_printers: row.related_printers ? JSON.parse(row.related_printers) : [],
      views: row.views,
      likes: row.likes,
      is_pinned: row.is_pinned,
      is_solution: row.is_solution,
      created_at: row.created_at,
      updated_at: row.updated_at,
      resolved_at: row.resolved_at,
      author: {
        id: row.author_id,
        username: row.author_username,
        full_name: row.author_full_name,
        avatar_url: row.author_avatar_url,
        role: row.author_role
      }
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
    const sql = getSql();
    const newPosts = await sql`
      INSERT INTO tech_blog_posts (
        author_id, title, content, category, tags, severity, status,
        affected_versions, related_printers
      ) VALUES (
        ${user.id}, ${title}, ${content}, ${category}, ${JSON.stringify(tags)},
        ${severity || null}, ${status}, ${JSON.stringify(affected_versions)},
        ${JSON.stringify(related_printers)}
      )
      RETURNING *
    `;

    const newPost = newPosts[0];

    // Update user post count
    await sql`
      UPDATE tech_users 
      SET total_posts = COALESCE(total_posts, 0) + 1 
      WHERE id = ${user.id}
    `;

    // Log activity
    await sql`
      INSERT INTO tech_activity_logs (user_id, action, details, ip_address)
      VALUES (
        ${user.id}, ${'blog_post_created'}, 
        ${JSON.stringify({ post_id: newPost.id, title, category })},
        ${request.headers.get('x-forwarded-for') || 'unknown'}
      )
    `;

    return NextResponse.json({
      success: true,
      post: {
        ...newPost,
        tags: newPost.tags ? JSON.parse(newPost.tags) : [],
        affected_versions: newPost.affected_versions ? JSON.parse(newPost.affected_versions) : [],
        related_printers: newPost.related_printers ? JSON.parse(newPost.related_printers) : [],
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
