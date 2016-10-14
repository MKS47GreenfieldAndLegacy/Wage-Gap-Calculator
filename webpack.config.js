module.exports = {
  entry: "./client/scripts/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style!css"}
    ]
  }
}
