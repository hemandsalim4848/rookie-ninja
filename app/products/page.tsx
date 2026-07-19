import { Suspense } from 'react'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import { Brand } from '@/src/lib/models/Brands'
import ProductsPageClient from './ProductsPageClient'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  await connectDB()
  const [products, brands] = await Promise.all([
    Product.find({}, 'name slug brandSlug category shortDescription images')
      .sort({ name: 1 })
      .lean(),
    Brand.find({}, 'name slug').lean(),
  ])

  const brandNames: Record<string, string> = {}
  brands.forEach((b: any) => { brandNames[b.slug] = b.name })

  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-[#0A1628]/40">Loading...</div>}>
      <ProductsPageClient
        key={category || 'all'}
        products={JSON.parse(JSON.stringify(products))}
        brandNames={brandNames}
      />
    </Suspense>
  )
}
