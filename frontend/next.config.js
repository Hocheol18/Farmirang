/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "tailwindui.com",
      "images.unsplash.com",
      "wp-ht-s3.s3.ap-northeast-2.amazonaws.com",
      "s3.ap-northeast-2.amazonaws.com",
    ],
  },
  reactStrictMode: false,
  env: {
    CUSTOM_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;
