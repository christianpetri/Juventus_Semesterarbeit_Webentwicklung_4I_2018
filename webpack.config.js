const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
		app :'./src/app/app.js',
		vendor : ['core-js','jquery','bootstrap','less']
	},
	output: {
		path: path.resolve(__dirname,'public'),
		filename: './public/bundle.[chunkhash].js'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{test: /\.css$/, use: ExtractTextWebpackPlugin.extract(
				{use: ['css-loader']})},
			{test: /\.less$/, use: ExtractTextWebpackPlugin.extract(
				{use: ['css-loader', 'less-loader']})},
			{test: /\.(jpg|png|svg|ttf|woff|woff2|eot)$/,
				use: 'url-loader?limit=25000'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'file-loader?name=/public/img/[name].[ext]'
			},
			{test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
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