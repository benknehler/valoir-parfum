import ProductDetailPage from '../../../components/ProductDetailPage.jsx';
import { products } from '../../../lib/products.js';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  return {
    title: product ? `${product.name} | Valoir Parfum` : 'Valoir Parfum',
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ProductDetailPage slug={slug} />;
}
