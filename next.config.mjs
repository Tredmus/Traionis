/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'snipboard.io', pathname: '/**' },
      { protocol: 'https', hostname: 'i.snipboard.io', pathname: '/**' },
    ],
  },
};

export default nextConfig;
