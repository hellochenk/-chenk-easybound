const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
import Configure from "./configure.js";
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const workDir = process.cwd();

export default class Plugin extends Configure {
	constructor(props) {
		super(props);
	}

	configure(webpackConfig) {
		const { output } = webpackConfig;

		webpackConfig.plugins = [
			...this.getHtmlWebpackPlugin(webpackConfig)
		];
		if (process.env.NODE_ENV !== "development") {
			webpackConfig.plugins.push(new UglifyJSPlugin());
		} else {
			webpackConfig.plugins.push(
				new webpack.HotModuleReplacementPlugin()
			);
		}
	}

	getHtmlWebpackPlugin(webpackConfig) {
		const { output } = webpackConfig;
		const {
			config: { apps }
		} = this;
		let htmlconfig = apps.map(item => {
			return new HtmlWebpackPlugin({
				filename: `${output.path}/${item}/index.html`,
				chunks: [item],
				template: path.resolve(workDir, `./src/${item}/index.html`),
			    favicon: path.resolve(workDir, `./src/${item}/favicon.ico`),
			});
		});
		return htmlconfig;
	}
	
	reactPlugin() {}
	angularPlugin() {}
	nodePlugin() {}
}
