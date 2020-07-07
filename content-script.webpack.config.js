module.exports = {
  entry: {  
    content_script: './src/content-script.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist' 
  }
};
