module.exports = () => ({
  // Control how source maps are generated
  devtool: "eval-cheap-module-source-map",
  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
    open: true,
    port: 9080,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  performance: {
    hints: "warning",
    maxEntrypointSize: 1000 * 512, //KiB
    maxAssetSize: 1000 * 512, //KiB
  },
  module: {
    rules: [
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
    ],
  },
});
