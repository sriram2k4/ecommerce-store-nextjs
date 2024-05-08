import { PageHeader } from '@/app/admin/_components/PageHeader';
import { ProductForm } from '../../_components/ProductForm';
import db from '@/db/db';
import { notFound } from 'next/navigation';

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });
  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
}
