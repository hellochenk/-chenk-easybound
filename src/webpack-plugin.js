const path = require('path');
import Configure from "./configure.js";
const HtmlWebpackPlugin = require("html-webpack-plugin");

const workDir = process.cwd();

export default class Plugin extends Configure {
	constructor(props) {
		super(props);
	}

	configure(webpack) {
		console.log('app_mode', process.env.app_mode)
		// webpack.plugins = [
		// 	...this.getHtmlWebpackPlugin()
		// ]
	}

	getHtmlWebpackPlugin() {
		const { config: { apps } } = this;
		let htmlconfig = apps.map(item => {
			return new HtmlWebpackPlugin({
				filename: item,
				template: path.resolve(workDir, `./src/${item}/index.html`)
			})
		});
		return htmlconfig
	}
	reactPlugin() {}
	angularPlugin() {}
	nodePlugin() {}
}