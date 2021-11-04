const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfiguration = (env) => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "production" }) => {
  console.log(`App is running in "${mode}" mode.`);

  return merge(
    {
      mode,
      entry: path.resolve(__dirname, "src/index.js"),
      devServer: {
        hot: true,
        open: true,
        port: 9080,
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
      output: {
        publicPath: "/",
        path: path.resolve(__dirname, "build"),
        filename: "[name].[contenthash].js",
      },
      optimization: {
        splitChunks: {
          chunks: "all",
        },
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "public/index.html"),
          favicon: path.resolve(__dirname, "public/favicon.ico"),
        }),
        new webpack.HotModuleReplacementPlugin(),
      ],
    },
    modeConfiguration(mode)
  );
};
