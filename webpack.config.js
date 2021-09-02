const path = require('path');

module.exports = {
  entry: './src/boot.js',
  output: {
    filename: 'boot.js',
    path: path.resolve(__dirname, 'dist'),
  },
};