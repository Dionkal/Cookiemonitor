function moveBackADir(filepath){
  let path = filepath.split("/");
  path.pop();
  return path.join('/');
}

module.exports = {
  entry: {  
    getCMPObject: './src/getCMPObject.js'
  },
  output: {
    filename: '[name].js',
    path: moveBackADir(__dirname) + '/dist' 
  }
};
