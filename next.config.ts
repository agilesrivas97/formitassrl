import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
  experimental: {},
  allowedDevOrigins: ['*.ngrok-free.app'],
}

export default nextConfig
