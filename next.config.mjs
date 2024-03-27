import withPlaiceholder from "@plaiceholder/next";
/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "weavement.s3.ap-northeast-2.amazonaws.com",
      "weavement-test.s3.ap-northeast-2.amazonaws.com",
    ],
    minimumCacheTTL: 31536000,
  },
  output: "standalone",

  swcMinify: true,
};

export default withPlaiceholder(nextConfig);
