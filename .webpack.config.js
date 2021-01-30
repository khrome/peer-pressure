var path = require( 'path' );
var webpack = require( 'webpack' );
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ( env, options ) => {
    var id = 'blah';
    return {
        entry: './src/block.js',
        output: {
            path: path.resolve( process.cwd(), 'build' ),
            filename: 'webpack-'+id+'.js',
        },
        module: {
            rules: [
                {
                    test: /\.es6$|\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {}
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: ( options.mode == 'production' ? true : false ),
                                sourceMap: true,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                //plugins: [ require( 'autoprefixer' ) ]
                            }
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'images/'
                            }
                        }
                    ]
                },
            ],
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.css',
                chunkFilename: '[id].css'
            })
        ],

    }
};
