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
		// console.log('app_mode', process.env.app_mode)
		webpackConfig.plugins = [
			// new HtmlWebpackPlugin()
			...this.getHtmlWebpackPlugin(webpackConfig)
			// new UglifyJSPlugin()
		];
		if (process.env.NODE_ENV !== "development") {
			webpackConfig.plugins.push(new UglifyJSPlugin());
		} else {
			// console.log("webpack.HotModuleReplacementPlugin", webpack);
			webpackConfig.plugins.push(
				// 热更新
				new webpack.HotModuleReplacementPlugin()
			);
		}
	}

	getHtmlWebpackPlugin(webpackConfig) {
		const { output } = webpackConfig;
		// console.log('path ......', output.path)
		// const aa = fs.readFileSync(path.resolve(workDir, `./src/home/index.html`))
		// fs.writeFileSync(path.resolve(workDir, './haha'), aa)
		// console.log('aa ->>>>>>', aa)
		const {
			config: { apps }
		} = this;
		let htmlconfig = apps.map(item => {
			return new HtmlWebpackPlugin({
				filename: `${output.path}/${item}/index.html`,
				chunks: [item],
				template: path.resolve(workDir, `./src/${item}/index.html`)
			});
		});
		// console.log(htmlconfig)
		return htmlconfig;
	}
	reactPlugin() {}
	angularPlugin() {}
	nodePlugin() {}
}
