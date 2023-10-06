const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = (env, argv) => {
  const injectManifest = new InjectManifest({
    swSrc: "./src-sw.js",
    swDest: "src-sw.js",
    ...(argv.mode !== "production" ? { exclude: [/./] } : {}),
  });

  if (argv.mode !== "production") {
    Object.defineProperty(injectManifest, "alreadyCalled", {
      get() {
        return false;
      },
      set() {},
    });
  }

  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Webpack plugin that generates our html file and injects our bundles.
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Text Editor",
      }),
      // Injects our custom service worker
      injectManifest,

      // Creates a manifest.json file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Contact Cards",
        short_name: "Contact",
        description: "Never forget your contacts!",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
};
