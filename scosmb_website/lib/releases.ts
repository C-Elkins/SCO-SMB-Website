import path from 'path';
import { promises as fs } from 'fs';

export interface ReleaseAsset {
  name: string;
  file: string;
  size?: number;
  checksum?: string;
  download_count?: number;
}

export interface ReleaseManifest {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  assets: ReleaseAsset[];
}

export interface PublicReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
  checksum?: string;
  file: string;
}

export interface PublicReleaseResponse extends Omit<ReleaseManifest, 'assets'> {
  assets: PublicReleaseAsset[];
}

const manifestPath = path.join(process.cwd(), 'data', 'releases', 'latest.json');
const downloadsDir = path.join(process.cwd(), 'public', 'downloads');

export async function getLatestRelease(): Promise<PublicReleaseResponse> {
  const rawManifest = await fs.readFile(manifestPath, 'utf-8');
  const manifest = JSON.parse(rawManifest) as ReleaseManifest;

  const assets: PublicReleaseAsset[] = [];

  for (const asset of manifest.assets) {
    const fileName = asset.file || asset.name;
    const filePath = path.join(downloadsDir, fileName);
    let size = asset.size ?? 0;

    try {
      const stats = await fs.stat(filePath);
      size = stats.size;
    } catch (error) {
      console.error(`Missing asset file: ${fileName}`, error);
      throw new Error(`Release asset ${fileName} is missing from public/downloads`);
    }

    assets.push({
      name: asset.name,
      file: fileName,
      browser_download_url: `/api/downloads/${encodeURIComponent(fileName)}`,
      checksum: asset.checksum,
      size,
      download_count: asset.download_count ?? 0
    });
  }

  return {
    ...manifest,
    assets
  };
}
