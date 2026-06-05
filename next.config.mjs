import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const isGitHubPagesBuild =
  process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY?.toLowerCase().endsWith('/valoir-parfum');
const basePath = configuredBasePath ?? (isGitHubPagesBuild ? '/valoir-parfum' : '');

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    root: projectRoot,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
