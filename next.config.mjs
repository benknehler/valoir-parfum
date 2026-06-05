import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const isProduction = process.env.NODE_ENV === 'production';
const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  output: 'export',
  basePath: isProduction ? '/valoir-parfum' : '',
  assetPrefix: isProduction ? '/valoir-parfum/' : undefined,
  turbopack: {
    root: projectRoot,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
