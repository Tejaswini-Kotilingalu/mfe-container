const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  mode: "production", // ✅

  entry: "./src/index.js",

  output: {
    publicPath: "auto",
    clean: true,
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
        products: "products@https://mfe-products-blue.vercel.app/remoteEntry.js",
        cart: "cart@https://mfe-cart-phi.vercel.app/remoteEntry.js",
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