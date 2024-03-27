/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "weavement.s3.ap-northeast-2.amazonaws.com",
      "weavement-test.s3.ap-northeast-2.amazonaws.com",
    ],
    minimumCacheTTL: 31536000,
    swcMinify: true,
  },
  output: "standalone",
};

module.exports = nextConfig;
