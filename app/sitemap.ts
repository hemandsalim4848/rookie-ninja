import type { MetadataRoute } from 'next'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

const SITE_URL = 'https://rookie-ninja.com'

const staticRoutes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/catalogue', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/products', changeFrequency: 'daily', priority: 0.9 },
  { path: '/our-vendors', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/print-solutions', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/scan-solutions', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/consumer-electronics', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/gaming', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/audio-visual', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/it-accessories', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/software-solutions', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about/mission', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/about/team', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/careers', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/partner-central', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/support', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms-of-use', changeFrequency: 'yearly', priority: 0.2 },
]

const vendorSlugs = [
  'aerocool', 'aztech', 'brother', 'canon', 'colortrac', 'contex', 'czur',
  'dahua', 'deli', 'dicota', 'fujitsu', 'iris', 'kodak-alaris', 'msi',
  'ricoh', 'unv', 'viewsonic-av',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB()
  const products = await Product.find({}, 'slug updatedAt').lean()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }))

  const vendorEntries: MetadataRoute.Sitemap = vendorSlugs.map(slug => ({
    url: `${SITE_URL}/our-vendors/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const productEntries: MetadataRoute.Sitemap = products.map((p: any) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticEntries, ...vendorEntries, ...productEntries]
}
