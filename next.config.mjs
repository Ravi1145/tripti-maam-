/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  async rewrites() {
    // Serve the CMS (public/admin/index.html) at /admin/
    return { beforeFiles: [{ source: "/admin/", destination: "/admin/index.html" }] };
  },
  async headers() {
    return [{ source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};
export default nextConfig;
