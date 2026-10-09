import type { MetadataRoute } from 'next'

// CMS — служебный сервис, индексировать в ней нечего: каталог и страницы
// для посетителей живут на сайте (FRONTEND_URL).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', disallow: '/' }],
  }
}
