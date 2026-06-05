export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function assetPath(path) {
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}
