const path = require('path');
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const mode = process.env.NODE_ENV;
const pagesDirPath = path.resolve(__dirname, "./pages");
let files = fs.readdirSync(pagesDirPath);
files = files.filter(item=>item!=='.DS_Store')
const getEntries = () => {
  let entry = {};
  files.forEach(item => {
      entry[item] = path.resolve(__dirname, `./pages/${item}/index.ts`);
  });
  return entry;
}
const generatorHtmlWebpackPlugins = () => {
  const arr = [];
  files.forEach(item => {
      //判断页面目录下有无自己的index.html
      let templatePath;
      let selfTemplatePath = pagesDirPath + `/${item}/index.html`;
      let publicTemplatePath = path.resolve(__dirname, "./template/index.html");
      try {
          fs.accessSync(selfTemplatePath);
          templatePath = selfTemplatePath;
      } catch(err) {
          templatePath = publicTemplatePath;
      }
      arr.push(new HtmlWebpackPlugin({
          template: templatePath,
          filename: `${item}.html`
      }));
  });
  return arr;
}
module.exports = {
  mode,
  entry: getEntries(),
  output: {
    path:path.resolve(__dirname, 'dist'),
    filename: './js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    ...generatorHtmlWebpackPlugins(),
  ],
}