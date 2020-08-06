const path = require("path");

// We first tell Webpack to use the reported entry file as the entry point into our project.
// Webpack will combine all of our JS files and combine into app.js which reside in the "dist" or distribution folder from line 9.

// DevServer tells Webpack to launch our application from the "dist" folder on port 9000
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
  },
  mode: "development",
};
