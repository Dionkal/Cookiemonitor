module.exports = {
  entry: {  
    background_script: './src/background-script.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist' 
  }
};
