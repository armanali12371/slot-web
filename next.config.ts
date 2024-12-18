module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  distDir: 'build_1',
 
  //dev///////////
  env: {
    API_PORT: 'http://159.89.169.237:3000'
  },
  generateBuildId: async () => {
    return '' + new Date().getTime();
  },
  eslint: {
    ignoreDuringBuilds: true
  },


};