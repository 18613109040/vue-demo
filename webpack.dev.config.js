
const path = require('path');
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config.js");
const Webpack = require("webpack");
module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  plugins: [
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
		contentBase: path.resolve(__dirname, "dist"),
		host: "localhost",  
		port: "8090",
		open: true, 
		hot: true   
	},
});