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
      // Where webpack looks to start building the bundle
      entry: path.resolve(__dirname, "src/index.js"),
      resolve: {
        extensions: [".js", ".jsx", ".json"],
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
      // Determine how modules within the project are treated
      module: {
        rules: [
          // JavaScript: Use Babel to transpile JavaScript files
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
          },
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
          // Load csv files
          {
            test: /\.(csv|tsv)$/i,
            use: ["csv-loader"],
          },
        ],
      },
      // To customize the webpack build process
      plugins: [
        // Generates an HTML file from a template
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "public/index.html"),
          favicon: path.resolve(__dirname, "public/favicon.ico"),
        }),
        //new webpack.HotModuleReplacementPlugin(),
        // To extract build progress information
        new webpack.ProgressPlugin((percentage, message) => {
          console.log(`${(percentage * 100).toFixed()}% ${message}`);
        }),
      ],
    },
    modeConfiguration(mode)
  );
};
