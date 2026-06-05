import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const isProduction = process.env.NODE_ENV === 'production';
const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProduction ? '/valoir-parfum' : '',
  assetPrefix: isProduction ? '/valoir-parfum/' : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProduction ? '/valoir-parfum' : '',
  },
  turbopack: {
    root: projectRoot,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
