/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "out",
  images: {
    domains: ["api.dicebear.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "api.dicebear.com",
    //     port: "",
    //     pathname: "/7.x/shapes/svg",
    //   },
    // ],
  },
};

module.exports = nextConfig;
