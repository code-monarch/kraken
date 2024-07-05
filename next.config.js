/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ummrah-images.s3.us-east-1.amazonaws.com',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    1

    return config
  },
  env: getEnvConfig(),
}

function getEnvConfig() {
  const environment = process.env.TARGET_ENV || process.env.NODE_ENV
  try {
    return require(`./env-${environment}.json`)
  } catch (err) {
    return require('./env-development.json')
  }
}
