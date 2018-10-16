import Configure from './configure.js'

export default class Loader extends Configure{
	constructor(props) {
		super(props)
	}

	configure(webpack) {
		/**
		 * 从this.config中获取数据
		 * 装载配置，更新webpack然后返回
		 */
		 return webpack;
	}
}