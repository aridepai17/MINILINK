/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/auth/signin',
        destination: '/login', // Customize the redirection as needed
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
