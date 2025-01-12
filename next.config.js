/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
    compiler: {
    emotion: true
  }
}

module.exports = nextConfig 