import Configure from "./configure.js";

export default class Output extends Configure {
	constructor(props) {
		super(props);
	}

	configure(webpack) {
		console.log("获取出口......", this);
		// const { dll, version } = this.config;
		return webpack;
	}
}