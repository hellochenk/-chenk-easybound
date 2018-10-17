import Configure from "./configure.js";
/* 根据配置，生成项目入口 */
export default class Entry extends Configure {
	constructor(props) {
		super(props);
	}

	configure(webpack) {
		const { config: { apps } } = this;
		if (typeof apps === "string") {
			webpack.entry = `./src/${apps}`
		} else {
			webpack.entry = apps.reduce((acc, cur) =>{
				return {...acc, [cur]: `./src/${cur}/`}
			}, {})
		}
	}
}