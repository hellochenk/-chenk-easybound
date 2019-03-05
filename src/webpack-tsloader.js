import Configure from "./configure.js";

export default class GeneratTsConfig extends Configure {
	constructor(props) {
		super(props);
	}

	configure(webpack) {
		// TODO
		// console.log("generat ts config......");
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
