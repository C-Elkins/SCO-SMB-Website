# Release Management

This project now serves installers directly from the application instead of redirecting technicians to GitHub. Each deploy ships with a static manifest plus the binaries stored under `public/downloads`.

## Folder Structure

```text
scosmb_website/
├── data/releases/latest.json  # Release metadata + checksums
└── public/downloads/          # Installer payloads referenced by the manifest
```

## Publishing a New Release

1. **Build signed installers** for every platform you support (macOS Apple Silicon, macOS Intel, Windows x64, etc.).
2. **Replace the placeholder files** inside `public/downloads` with the real binaries. The filenames must stay in sync with what is listed in the manifest.
3. **Update `data/releases/latest.json`:**
   - `tag_name`, `name`, and `published_at` should reflect the release build.
   - Update the Markdown `body` with the latest release notes.
   - For every asset, ensure the `name`, `file`, and `checksum` entries match the uploaded file.
4. **Optional: refresh the checksums** with `shasum -a 256 public/downloads/<file>`.
5. **Commit and deploy.** The `/api/releases/latest` endpoint automatically recalculates the file sizes and injects `/api/downloads/<file>` URLs, so the portal UI picks up the new binaries immediately after deployment.

## Operational Notes

- The `/api/downloads/[filename]` route streams installers directly from `public/downloads`, records the download in the `download_logs` table (when `DATABASE_URL` is configured), and returns the file with an attachment header so browsers download rather than navigate.
- If an asset listed in the manifest is missing from disk, the releases API will respond with an error. This is intentional to avoid silent 404s during deployment.
- The schema alignment script (`npx tsx scripts/align-schema.ts`) now creates an `asset_name` column on `download_logs` so portal downloads remain auditable even without license keys.

## Local Testing

- `npx tsx --eval "import { getLatestRelease } from './lib/releases'; (async () => console.log(await getLatestRelease()))();"`
- `npx tsx --eval "import { NextRequest } from 'next/server'; import { GET } from './app/api/downloads/[filename]/route'; (async () => { const res = await GET(new NextRequest('http://localhost'), { params: { filename: 'SCO-SMB-win-x64.exe' } }); console.log(res.status); })();"`

Keep this file up to date whenever the release process changes so technicians always receive direct downloads from our domain.
