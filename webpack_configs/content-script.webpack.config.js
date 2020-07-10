function moveBackADir(filepath){
  let path = filepath.split("/");
  path.pop();
  return path.join('/');
}

module.exports = {
  entry: {  
    content_script: './src/content-script.js'
  },
  output: {
    filename: '[name].js',
    path: moveBackADir(__dirname) + '/dist' 
  }
};
