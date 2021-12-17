/* eslint-disable no-undef */


const CopyWebpackPlugin = require("copy-webpack-plugin");



const urlDev = "http://localhost/";
//const urlProd = "https://www.contoso.com/"; // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION
const urlProd = "https://symbolclick.com/addon/"; // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION

/* global require, module, process, __dirname */


module.exports = async (env, options) => {
  const dev = options.mode === "development";
  const buildType = dev ? "dev" : "prod";
  const config = {
    devtool: "source-map",
    entry: {
      functions: "./src/functions.js",
      taskpane: "./src/taskpane.js",
      commands: "./src/commands.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          },
        },
      ],
    },
    plugins: [

      new CopyWebpackPlugin({
        patterns: [
          {
            from: "assets/*",
            to: "assets/[name][ext][query]",
          },
          { 
            from : "src/*.(html|css|json)",
            to :"[name][ext]"
          },              
          {
            from: "manifest*.xml",
            to: "[name]." + buildType + "[ext]",
            transform(content) {
              if (dev) {
                return content;
              } else {
                return content.toString().replace(new RegExp(urlDev, "g"), urlProd);
              }
            },
          },
        ],
      }),
 
    ]

}

  return config;
};
