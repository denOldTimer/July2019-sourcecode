const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const pimport = require("postcss-import");
//plugins
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  //mode: "production",
  mode: "development",
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  entry: {
    main: "./src/js/entry.js"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js"
    //publicPath: "/public"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      },
      {
        test: /\.s?css/,
        use: [
          MiniCssExtractPlugin.loader,
          //{ loader: "style-loader" },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                pimport(),
                tailwindcss("tailwind.config.js"),
                autoprefixer()
              ]
            }
          },
          {
            loader: "sass-loader"
            // options: {
            //   plugins: () => [tailwindcss("tailwind.config.js"), autoprefixer()]
            // }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/", //The file location
              publicPath: "img/" //The path reference in the links
            }
          }
        ]
      },
      {
        //font-awesome
        test: /font-awesome\.config\.js/,
        use: [{ loader: "style-loader" }, { loader: "font-awesome-loader" }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new MiniCssExtractPlugin({
      //options similar to same options in WebpackOptions.output
      //both options are optional
      filename: "[name].bundle.css",
      chunckFilename: "[id].css"
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new HtmlWebPackPlugin({
      template: "./src/menu.html",
      filename: "./menu.html"
    }),
    new HtmlWebPackPlugin({
      template: "./src/test.html",
      filename: "./test.html"
    })
  ]
};
