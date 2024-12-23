/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // webpack: (config) => {
  //   config.externals = [...config.externals, 'bcrypt'];
  //   return config;
  // },
};

module.exports = nextConfig;