const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    publicPath: "auto",
  },

  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "public"),
    },
    headers: {
      "Access-Control-Allow-Origin": "*", // ✅ IMPORTANT
    },
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-env"],
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "container",

      remotes: {
        products: "products@https://tejaswini-kotilingalu-products.vercel.app/remoteEntry.js",
        cart: "cart@https://tejaswini-kotilingalu-cart.vercel.app/remoteEntry.js",
      },

      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};