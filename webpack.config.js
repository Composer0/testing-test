const path = require( 'path' )
const TerserPlugin = require( 'terser-webpack-plugin' )

module.exports = {
    mode: 'development',
    optimization: {
        minimize: false,
        minimizer: [new TerserPlugin()],
    },
    entry: {
        bundle: path.resolve( __dirname, 'src/js/bundle.js' ),
    },
    output: {
        path: path.resolve( __dirname, 'dist/js' ),
        filename: '[name].js'
    },
}