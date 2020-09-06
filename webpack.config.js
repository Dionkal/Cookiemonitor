'use strict';

const path = require('path');

module.exports = {
    entry: {
        content_script: './src/content_script/index.js',
        background_script: './src/background_script/index.js',
        page_script: './src/page_script/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_bundle.js'
    },
    mode: process.env.NODE_ENV !== 'production'? 'development': 'production',
    module: {
        rules: [
            {
                test: /\.js$/
            }
        ]
    }
    // target: 'web',
}