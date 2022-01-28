module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    MONGO_URI: "mongodb://127.0.0.1/code_share",
    JWT_SECRET: "somedummytext",
  },
};
