/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  async redirects() {
    // old addresses from earlier versions of the site keep working
    return [
      { source: "/services", destination: "/work-with-schools/", permanent: true },
      { source: "/blog", destination: "/articles/", permanent: true },
      { source: "/blog/:slug", destination: "/articles/:slug/", permanent: true },
      { source: "/writing", destination: "/anubhuti/", permanent: true },
    ];
  },
  async rewrites() {
    // Serve the CMS (public/admin/index.html) at /admin/
    return { beforeFiles: [{ source: "/admin/", destination: "/admin/index.html" }] };
  },
  async headers() {
    return [{ source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};
export default nextConfig;
