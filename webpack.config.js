module.exports = {
    mode: "production",
    entry: "./src",
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