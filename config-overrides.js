/* eslint-disable @typescript-eslint/no-var-requires */
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
} = require("customize-cra");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const antdTheme = {
  hack: `true;@import "${require.resolve(
    "antd/lib/style/color/colorPalette.less",
  )}";`,
  ...require("antd/dist/default-theme"),
  //...require("antd/dist/dark-theme"),
  "font-size-base": "14px",
  "primary-color": "#1890FF",
};

const IS_PROD = process.env.NODE_ENV !== "development";
const IS_DEV = process.env.NODE_ENV === "development";

module.exports = override(
  // Ease of import plugins for lib
  fixBabelImports("antd", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  // Use theme
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: antdTheme,
      localIdentName: IS_PROD ? "[hash:base64]" : "[path][name]__[local]",
      noIeCompat: true,
    },
  }),
  // Just some info
  addWebpackPlugin(
    new BundleAnalyzerPlugin({
      analyzerMode: IS_DEV ? "server" : "static",
    }),
  ),
);
