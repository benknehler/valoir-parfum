import { notFound } from 'next/navigation';
import DtcProductDetailPage from '../../../components/dtc/DtcProductDetailPage.jsx';
import { getProduct, products } from '../../../lib/products.js';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: `${product.name} | Valoir Parfum`,
    description: product.short,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return <DtcProductDetailPage product={product} />;
}
