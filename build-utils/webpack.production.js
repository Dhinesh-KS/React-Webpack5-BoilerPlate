const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");

module.exports = () => ({
  devtool: "nosources-source-map",
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: {
      name: "runtime",
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      //babel loader
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            loader: "babel-loader",
            options: {
              compact: false,
              presets: [
                "@babel/preset-react",
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      browsers: "last 2 versions",
                    },
                    modules: false,
                    loose: false,
                  },
                ],
              ],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "react-hot-loader/babel",
                "syntax-dynamic-import",
              ],
            },
          },
        ],
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
      chunkFilename: "[id].css",
    }),
  ],
});
