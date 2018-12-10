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
			open: true
		};
	}
}
