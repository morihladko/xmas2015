'use strict';

const cleanPlugin = require('clean-webpack-plugin');

let config = {
    context: `${__dirname}/src`,
    entry: './app.js',
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { 
                test: /\.css$/, 
                loader: 'style!css'
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel?presets[]=es2015!jshint'
            },

            { test: /\.png$/, loader: "url-loader?limit=100000" }
        ]
    },
    plugins: [
        new cleanPlugin(['dist'])
    ]
};

module.exports = config;
