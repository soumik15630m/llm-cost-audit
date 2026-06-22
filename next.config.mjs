/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // All public pages are statically rendered (SSG). No experimental flags needed
  // for a zero-config Vercel deploy.
};

export default nextConfig;
