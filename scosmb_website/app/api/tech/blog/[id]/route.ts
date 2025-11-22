import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb } from '@/lib/db';
import { tech_blog_posts, tech_users, tech_sessions, admin_users } from '@/lib/schema';

const db = getDb();
import { eq, and, gt } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

// Helper to get authenticated tech user
async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('tech_session')?.value;

  if (!sessionToken) return null;

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
    const posts = await db
      .select()
      .from(tech_blog_posts)
      .where(eq(tech_blog_posts.id, id))
      .limit(1);

    if (posts.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    const post = posts[0];

    // Check if admin password provided
    if (admin_password) {
      // Verify admin password
      const admins = await db.select().from(admin_users).limit(1);

      if (admins.length === 0) {
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
      await db.delete(tech_blog_posts).where(eq(tech_blog_posts.id, id));

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
    await db.delete(tech_blog_posts).where(eq(tech_blog_posts.id, id));

    // Update user post count
    await db
      .update(tech_users)
      .set({ total_posts: Math.max(0, (user.total_posts || 0) - 1) })
      .where(eq(tech_users.id, user.id));

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
    const posts = await db
      .select()
      .from(tech_blog_posts)
      .where(eq(tech_blog_posts.id, id))
      .limit(1);

    if (posts.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    const post = posts[0];

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

    const updatedPosts = await db
      .update(tech_blog_posts)
      .set(updates)
      .where(eq(tech_blog_posts.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      post: updatedPosts[0],
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
      { status: 500 }
    );
  }
}
