module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'https://next-jwt-auth.herokuapp.com/api/:slug*'
        // this one for development:
        // destination: 'http://localhost:5000/api/:slug*'
      }
    ]
  }
}
