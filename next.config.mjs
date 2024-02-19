/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: () => ([
    {
      source: '/people',
      destination: '/',
      permanent: true,
    },
  ])
};

export default nextConfig;
