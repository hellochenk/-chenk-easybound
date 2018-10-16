import Configure from "./configure.js";

export default class Entry extends Configure {
	constructor(props) {
		super(props);
	}

	configure(webpack) {
		console.log("获取入口......", this);
		// const { config: { app } } = this
		// 从 config 中取出所需物件，整理到webpack中

		return webpack;
	}
}