const path = require("path");

module.exports = () => ({
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
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
              sourceType: "unambiguous",
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    regenerator: true,
                  },
                ],
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
