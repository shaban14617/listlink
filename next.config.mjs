/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*googleusercontent.com",
      },
      {
        hostname: "linklistowner.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
