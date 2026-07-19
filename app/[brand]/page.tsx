import Link from 'next/link'
import { Suspense } from 'react'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import { Brand } from '@/src/lib/models/Brands'
import BrandCatalogueClient from './BrandCatalogueClient'

export default async function BrandPage({
  params,
  searchParams,
}: {
  params: Promise<{ brand: string }>
  searchParams: Promise<{ category?: string }>
}) {
  const { brand: brandSlug } = await params
  const { category } = await searchParams

  await connectDB()
  const [brand, products] = await Promise.all([
    Brand.findOne({ slug: brandSlug }).lean(),
    Product.find({ brandSlug }).sort({ name: 1 }).lean(),
  ])

  if (!brand) {
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

  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-[#0A1628]/40">Loading...</div>}>
      <BrandCatalogueClient
        key={category || 'all'}
        brand={JSON.parse(JSON.stringify(brand))}
        brandSlug={brandSlug}
        products={JSON.parse(JSON.stringify(products))}
      />
    </Suspense>
  )
}
