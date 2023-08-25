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
  },
};

module.exports = nextConfig;
