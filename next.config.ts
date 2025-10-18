import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    globalNotFound:true,
  },
      images: {
        remotePatterns: [
            // Add the new domain for the images
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '', // Leave empty if not needed
                pathname: '/**', // Allow any path on this hostname
            },
            // If you have other external image domains (like unsplash.com, or your project link domain), add them here too
        ],
    },
};

export default nextConfig;
