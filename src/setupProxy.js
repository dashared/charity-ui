/* eslint-disable */
const { createProxyMiddleware } = require("http-proxy-middleware");

const GRAPHQL_API_URL = process.env.GRAPHQL_API_URL ?? "hello";
const GRAPHQL_API_MOCK = process.env.GRAPHQL_API_MOCK;

module.exports = (app) => {
  app.use(
    "/graphql",
    createProxyMiddleware({
      target: GRAPHQL_API_URL,
      changeOrigin: true,
    }),
  );
};
