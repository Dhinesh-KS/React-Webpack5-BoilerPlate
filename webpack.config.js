const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfiguration = (env) => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode, currentProcess } = { mode: "production", currentProcess: "running" }) => {
  console.log(`App is ${currentProcess} in "${mode}" mode.`);

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
      module: {
        rules: [
          // Images
          {
            test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
            type: "asset/resource",
          },
          // Fonts and SVGs
          {
            test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
            type: "asset/inline",
          },
        ],
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
