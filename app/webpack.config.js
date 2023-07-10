const { resolve } = require('path');

function isProduction () {
    return process.env.NODE_ENV !== 'development';
}

function getEnvironment () {
    return isProduction() ? 'production' : 'development'
}

module.exports = {
    mode: getEnvironment(),
    devtool: isProduction() ? 'source-map' : 'cheap-module-source-map',
    entry: resolve(__dirname, './client/index.tsx'),
    output: {
        path: resolve(__dirname, './dist/static'),
        publicPath: 'static/',
        filename: 'index.js'
    },
    resolve: {
        extensions: [ '.js', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: [/\.test.(ts|tsx)$/],
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(woff|woff2|ttf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]'
                }
            }
        ]
    }
};
