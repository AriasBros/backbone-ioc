const path = require("path");

module.exports = {
    mode: "production",
    context: path.resolve(__dirname, 'src'),
    entry: "./index.js",
    output: {
        filename: "backbone-ioc.min.js"
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                options: {
                    presets: ["es2015"]
                },
            },
        ]
    },
    externals: {
        jquery: 'jQuery',
        backbone: 'Backbone',
        underscore: 'Underscore'
    }
};