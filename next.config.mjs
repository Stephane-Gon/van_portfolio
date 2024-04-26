import WithBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withBundleAnalyzer = WithBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'otlzsvdiblrhypgkjdkh.supabase.co',
      },
    ],
  },
})

export default withBundleAnalyzer(nextConfig)