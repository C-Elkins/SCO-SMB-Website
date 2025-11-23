import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSql } from '@/lib/db';
import bcrypt from 'bcryptjs';

// Helper to get authenticated tech user
async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('tech_session')?.value;

  if (!sessionToken) return null;

  const sql = getSql();
  const sessions = await sql`
    SELECT 
      u.id, u.username, u.email, u.full_name, u.company, u.role, 
      u.avatar_url, u.bio, u.specializations, u.total_posts, 
      u.total_solutions, u.created_at, u.last_login
    FROM tech_sessions s
    INNER JOIN tech_users u ON s.user_id = u.id
    WHERE s.session_token = ${sessionToken} AND s.expires_at > CURRENT_TIMESTAMP
    LIMIT 1
  `;

  return (sessions as any[]).length > 0 ? (sessions as any[])[0] : null;
}

// DELETE - Remove blog post (requires admin password or post owner)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { admin_password } = data;

    // Get the post
    const sql = getSql();
    const posts = await sql`
      SELECT * FROM tech_blog_posts WHERE id = ${id} LIMIT 1
    `;

    if ((posts as any[]).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    const post = posts[0];

    // Check if admin password provided
    if (admin_password) {
      // Verify admin password
      const admins = await sql`SELECT * FROM admin_users LIMIT 1`;

      if ((admins as any[]).length === 0) {
        return NextResponse.json(
          { success: false, error: 'No admin accounts found' },
          { status: 500 }
        );
      }

      const isValidPassword = await bcrypt.compare(
        admin_password,
        admins[0].password_hash
      );

      if (!isValidPassword) {
        return NextResponse.json(
          { success: false, error: 'Invalid admin password' },
          { status: 403 }
        );
      }

      // Admin authenticated - delete the post
      await sql`DELETE FROM tech_blog_posts WHERE id = ${id}`;

      return NextResponse.json({
        success: true,
        message: 'Post deleted by admin',
      });
    }

    // Check if post owner
    const user = await getAuthenticatedUser();

    if (!user || user.id !== post.author_id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - admin password required' },
        { status: 403 }
      );
    }

    // Owner can delete their own post
    await sql`DELETE FROM tech_blog_posts WHERE id = ${id}`;

    // Update user post count
    await sql`
      UPDATE tech_users 
      SET total_posts = GREATEST(0, COALESCE(total_posts, 0) - 1)
      WHERE id = ${user.id}
    `;

    return NextResponse.json({
      success: true,
      message: 'Post deleted',
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}

// PATCH - Update blog post
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get the post
    const sql = getSql();
    const posts = await sql`
      SELECT * FROM tech_blog_posts WHERE id = ${id} LIMIT 1
    `;

    if ((posts as any[]).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    const post = (posts as any[])[0];

    // Check ownership
    if (post.author_id !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const data = await request.json();
    const updates: Record<string, unknown> = { updated_at: new Date() };

    if (data.title) updates.title = data.title;
    if (data.content) updates.content = data.content;
    if (data.category) updates.category = data.category;
    if (data.tags) updates.tags = JSON.stringify(data.tags);
    if (data.severity) updates.severity = data.severity;
    if (data.status) updates.status = data.status;
    if (data.affected_versions)
      updates.affected_versions = JSON.stringify(data.affected_versions);
    if (data.related_printers)
      updates.related_printers = JSON.stringify(data.related_printers);

    // Build update query dynamically
    const updateFields = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    
    const values = [id, ...Object.values(updates)];
    
    const updatedPosts = await sql.query(
      `UPDATE tech_blog_posts SET ${updateFields} WHERE id = $1 RETURNING *`,
      values
    );

    return NextResponse.json({
      success: true,
      post: (updatedPosts as any).rows[0],
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
      { status: 500 }
    );
  }
}
