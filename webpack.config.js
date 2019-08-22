const path = require("path");
module.exports = {
  entry: ["babel-regenerator-runtime", "./src/background/index.ts"],
  mode: "production",
  devtool: "source-maps",
  optimization: {
    minimize: false
  },
  output: {
    path: path.join(__dirname, "public/dist"),
    filename: "background.js"
  },
  resolve: {
    extensions: [".mjs", ".js", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: require.resolve("babel-loader"),
        options: {
          babelrc: false,
          configFile: false,
          presets: [
            require.resolve("@babel/preset-env"),
            require.resolve("@babel/preset-typescript")
          ]
        }
      }
    ]
  }
};
