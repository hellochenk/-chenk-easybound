import Configure from "./configure.js";

export default class GeneratTsConfig extends Configure {
	constructor(props) {
		super(props);
	}

	configure(webpack) {
		webpack.module = {
			rules: [
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/
				}
			]
		};
	}
}
