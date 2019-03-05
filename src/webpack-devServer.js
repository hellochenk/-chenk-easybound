const path = require("path");

import Configure from "./configure.js";

export default class DevServer extends Configure {
	constructor(props) {
		super(props);
	}

	configure(webpack) {
		if (process.env.NODE_ENV === "production") return;
		const { port, localhost } = this.config;
		const { output } = webpack;
		// console.log('output ->>>>', output)

		webpack.devServer = {
			contentBase: path.join(__dirname, "public"),
			// compress: true,
			port: port || 8080,
			host: localhost || "127.0.0.1",
			inline: true,
			hot: true,
			open: true,
			clientLogLevel: "none",
			noInfo: true,

			/**
			 * 启用GZip
			 */
			// compress: true,
			/**
			 * 隐藏 WebpackDevServer 自身的日志, 但警告和错误依旧上报
			 */
			// clientLogLevel: 'none',
			/**
			 * 任何在 "contentBase" 的资源文件发生变更时, 页面会触发 reload
			 */
			watchContentBase: true,
			historyApiFallback: {
				// 请求路径使用"."也应该可以支持API降级
				// See https://github.com/facebookincubator/create-react-app/issues/387.
				disableDotRule: true
			},

			quiet: true,
			stats: { color: "red" }
		};
	}
}
