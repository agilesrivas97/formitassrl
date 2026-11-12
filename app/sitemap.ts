import type { MetadataRoute } from 'next'
import { CATEGORIES, SITE_URL } from './lib/seo'
import { PRODUCTS, productHref } from './lib/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/distribuidores`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/catalogo`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...Object.keys(CATEGORIES).map(categoria => ({
      url: `${SITE_URL}/catalogo/${categoria}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...PRODUCTS.map(prod => ({
      url: `${SITE_URL}${productHref(prod)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
