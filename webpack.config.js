const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
		app :'./src/app/app.ts',
		vendor : ['core-js','jquery','bootstrap','less']
	},
	output: {
		path: path.resolve(__dirname,'public'),
		filename: './public/bundle.[chunkhash].js'
	},
	resolve: { extensions: ['.ts', '.js'] },
	devtool: 'source-map',
	module: {
		rules: [
			{test: /\.css$/, use: ExtractTextWebpackPlugin.extract(
				{use: ['css-loader']})},
			{test: /\.less$/, use: ExtractTextWebpackPlugin.extract(
				{use: ['css-loader', 'less-loader']})},
            {test: /\.(jpg|png|svg|ttf|woff|woff2|eot|ico)$/,
                use: 'url-loader?limit=100000'
            },
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
                exclude: /node_modules/,
				loader: 'file-loader?name=./img/[name].[ext]'
			},
			{test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
			{test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$ : 'jquery',
			jQuery : 'jquery'
		}),
		new HtmlWebpackPlugin({template:'index.html'}),
		new ExtractTextWebpackPlugin('app/app.[chunkhash].css'),
		new webpack.optimize.CommonsChunkPlugin({name:['vedor','manifest']}),
		new BundleAnalyzerPlugin({
			reportFilename: '../public/bundle-report.html',
			analyzerMode: 'static',
			defaultSizes: 'gzip',
			openAnalyzer: false})
	],
	devServer: {
		contentBase : 'public/'
	}
};