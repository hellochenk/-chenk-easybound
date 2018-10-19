const path = require('path');

import Configure from "./configure.js";

export default class DevServer extends Configure {
	constructor(props) {
		super(props);
	}

	configure(webpack) {
		if(process.env.app_mode === 'production') return;
		const { port, localhost } = this.config;
		const { output } = webpack;
		console.log('output ->>>>', output)
		webpack.devServer = {
			contentBase: path.join(__dirname, "dist"),
			compress: true,
			port: port || 9870,
			host: localhost || 'localhost',
			hot: true
		};
	}
}