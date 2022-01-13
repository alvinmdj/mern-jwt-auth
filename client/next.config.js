module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'https://next-jwt-auth.herokuapp.com/api/:slug*'
      }
    ]
  }
}
