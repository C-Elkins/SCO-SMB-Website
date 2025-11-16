import { NextRequest } from 'next/server';

export const runtime = 'edge';

const OWNER = 'C-Elkins';
const REPO = 'SCO-SMB';

async function fetchReleases(token?: string) {
  const headers: Record<string,string> = { 'Accept': 'application/vnd.github+json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/releases`, { headers });
  if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
  return res.json();
}

export async function GET(_req: NextRequest) {
  try {
    const token = process.env.GITHUB_TOKEN;
    const releases = await fetchReleases(token);
    const cleaned = releases.slice(0, 10).map((r: any) => ({
      id: r.id,
      tag_name: r.tag_name,
      name: r.name,
      published_at: r.published_at,
      body: r.body,
      assets: (r.assets || []).map((a: any) => ({ name: a.name, size: a.size, download_count: a.download_count }))
    }));
    return new Response(JSON.stringify({ items: cleaned }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
