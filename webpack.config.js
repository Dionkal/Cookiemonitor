const path = require('path');

module.exports = {
  entry: [
    './src/decodeConsentString.js',
    './src/cookie_list.js'
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
