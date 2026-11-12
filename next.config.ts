import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
    qualities: [55, 75, 80],
    // Las fotos casi no cambian: que el navegador y el CDN no las revaliden a cada rato.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    // El cache persistente de Turbopack (activado por default desde Next 16.1)
    // falla al escribir sus archivos SST en esta carpeta — probablemente por
    // estar dentro de ~/Documents con sincronización de iCloud Drive de por
    // medio. Lo desactivamos para que `next dev` no tire 500 en todas las rutas.
    turbopackFileSystemCacheForDev: false,
  },
  allowedDevOrigins: ['*.ngrok-free.app'],
  async headers() {
    // Assets estáticos de public/: caché de 30 días (con revalidación en segundo plano).
    // En conexión lenta evita volver a pedir cada imagen/video en las visitas siguientes.
    const cache = [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }]
    return ['catalog', 'fabrica', 'logos', 'mascot', 'platos', 'pop', 'recetas', 'video'].map(dir => ({
      source: `/${dir}/:path*`,
      headers: cache,
    }))
  },
  async redirects() {
    return [
      { source: '/catalogo/bocaditos', destination: '/catalogo/vegetales', permanent: true },
      // La categoría "especiales" se dividió en mariscos y vegetales/quesos.
      { source: '/catalogo/especiales', destination: '/catalogo/mariscos', permanent: true },
    ]
  },
}

export default nextConfig
