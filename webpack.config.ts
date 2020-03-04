require("dotenv").config()
const path = require("path")
import { Configuration } from "webpack"
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server"

const { WDS_PORT } = process.env
const DIST_DIR = path.join(__dirname, "dist")
const SRC_DIR = path.join(__dirname, "src")
const OUTPUT_PATH = WDS_PORT ? `http://localhost:${WDS_PORT}/dist/` : DIST_DIR

interface TWebpackProps extends Configuration {
  devServer: WebpackDevServerConfiguration
}

const config: TWebpackProps = {
  entry: {
    web: "./src/app.ts",
  },
  output: {
    filename: `[name].js`,
    path: DIST_DIR,
    publicPath: OUTPUT_PATH,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    symlinks: false,
  },
  devServer: {
    port: Number(WDS_PORT),
    publicPath: OUTPUT_PATH,
    contentBase: false,
    disableHostCheck: true,
    compress: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            // https://github.com/TypeStrong/ts-loader#loader-options
            transpileOnly: true,
            happyPackMode: true,
            compilerOptions: {
              // IMPORTANT! target is ES5 for production
              target: "ES2018",
            },
            experimentalWatchApi: true, // https://webpack.js.org/guides/build-performance/#typescript-loader
          },
        },
        exclude: [/node_modules/],
        include: SRC_DIR,
      },
    ],
  },
}

export default config
