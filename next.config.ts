import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
  experimental: {},
  allowedDevOrigins: ['*.ngrok-free.app'],
  async redirects() {
    return [
      { source: '/catalogo/bocaditos', destination: '/catalogo/especiales', permanent: true },
    ]
  },
}

export default nextConfig
