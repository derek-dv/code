module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    MONGO_URI: "mongodb://localhost:27017/code",
    JWT_SECRET: "somedummytext",
  },
};
