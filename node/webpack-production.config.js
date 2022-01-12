// Webpack 5

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {

  entry: {
    index: "./src/index.ts"
  },
  mode: "production",
  target: "node",

  plugins: [

    new CleanWebpackPlugin()

  ],

  // These are functions that filters warnings based on the source module and
  // the warning's message
  ignoreWarnings: [

    (warning, compilation) =>
      (warning.module.resource).indexOf("chokidar") > -1,

    (warning, compilation) =>
      (warning.module.resource).indexOf("mocha") > -1 &&
        (warning.message).indexOf("the request of a dependency") > -1,

    (warning, compilation) =>
      (warning.message).indexOf("the request of a dependency") > -1,

    (warning, compilation) =>
      (warning.message).indexOf("Critical dependency: require function is used in a way in which dependencies cannot be statically extracted") > -1

  ],

  // If uncommented, does not bundle the global node_modules, resulting in a
  // much smaller file, but less portable. However, for testing purposes this
  // produces faster builds.
  // externals: [ nodeExternals() ],

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    library: "TsUtils",
    clean: true
  },

  // This does not bundle the global node_modules, resulting in a much smaller
  // file, but less portable.
  // externals: [nodeExternals()],

  module: {
    rules: [{
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: [

        path.join(__dirname, "/node_modules/"),
        path.join(__dirname, "/test/")

      ]
    }]
  },

  optimization: {

    // Setting minimize to false will result in a larger bundle, but speeds up
    // the build for testing.
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
      terserOptions: {
        mangle: {
          toplevel: true
        },
        output: {
          comments: false
        }
      }
    })]

  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }

}
