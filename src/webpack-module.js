import Configure from "./configure.js";

export default class Module extends Configure {
	constructor(props) {
		super(props);
	}

	configure(webpack) {
		/**
		 * 从this.config中获取数据
		 * 装载配置，更新webpack然后返回
		 */
		webpack.module = {
			rules: [this.loaderJs(), ...this.loadStyles()]
		};
		return webpack;
	}

	loaderJs() {
		return {
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: "babel-loader"
				// custom babel loader......
				// options: {
				// 	presets: ["@babel/preset-env", "@babel/preset-react"],
				// 	plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-syntax-dynamic-import"]
				// }
			}
		};
	}

	loadStyles() {
		let css = {
			test: /\.css$/,
			use: ["style-loader", "css-loader"]
		};
		let scss = {
			test: /\.scss$/,
			use: [
				{
					loader: "style-loader" // 将 JS 字符串生成为 style 节点
				},
				{
					loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
					options: {
						modules: true
					}
				},
				{
					loader: "sass-loader" // 将 Sass 编译成 CSS
				}
			]
		};
		return [css, scss];
	}
}
