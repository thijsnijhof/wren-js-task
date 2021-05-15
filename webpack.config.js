const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ROOT_PATH = path.resolve(__dirname, "");
const SRC_PATH = path.resolve(__dirname, "src");
const BUILD_PATH = path.resolve(ROOT_PATH, "build");

module.exports = {
  entry: path.resolve(SRC_PATH, "index.ts"),
  mode: "development",
  devtool: "cheap-eval-source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img",
              esModule: false
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_PATH, "index.html"),
      filename: "index.html",
      inject: "body"
    })
  ],

  output: {
    path: BUILD_PATH,
    filename: "[name].js"
  }
};
