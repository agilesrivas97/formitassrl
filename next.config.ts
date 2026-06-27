import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
  experimental: {
    // El cache persistente de Turbopack (activado por default desde Next 16.1)
    // falla al escribir sus archivos SST en esta carpeta — probablemente por
    // estar dentro de ~/Documents con sincronización de iCloud Drive de por
    // medio. Lo desactivamos para que `next dev` no tire 500 en todas las rutas.
    turbopackFileSystemCacheForDev: false,
  },
  allowedDevOrigins: ['*.ngrok-free.app'],
  async redirects() {
    return [
      { source: '/catalogo/bocaditos', destination: '/catalogo/especiales', permanent: true },
    ]
  },
}

export default nextConfig
