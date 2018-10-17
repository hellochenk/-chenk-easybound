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
			rules: [this.loaderJs()]
		};
		return webpack;
	}

	loaderJs() {
		return {
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env", "@babel/preset-react"],
					plugins: ["@babel/plugin-transform-runtime"]
				}
			}
		};
	}
}