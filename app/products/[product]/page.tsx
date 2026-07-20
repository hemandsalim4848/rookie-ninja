import Link from 'next/link'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import { Brand } from '@/src/lib/models/Brands'
import ProductDetailClient from './ProductDetailClient'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ product: string }>
}) {
  const { product: productSlug } = await params

  await connectDB()
  const product = await Product.findOne({ slug: productSlug }).lean() as any

  if (!product) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <p className="text-8xl font-bold text-[#0A1628]/10 mb-4">404</p>
        <h1 className="text-2xl font-bold text-[#0A1628] mb-2">Page Not Found</h1>
        <p className="text-gray-400 text-sm mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-[#0A1628] hover:bg-[#15A7DC] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Back to Home
        </Link>
      </main>
    )
  }

  const brand = await Brand.findOne({ slug: product.brandSlug }).lean()

  return (
    <ProductDetailClient
      product={JSON.parse(JSON.stringify(product))}
      brand={brand ? JSON.parse(JSON.stringify(brand)) : null}
      brandSlug={product.brandSlug}
    />
  )
}
