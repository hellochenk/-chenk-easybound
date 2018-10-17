const path = require('path');
const fs = require('fs');

import Entry from './webpack-entry.js';
import OutPut from './webpack-output.js';

const workPath = process.cwd()

const defaultConfig = {
	entry: './src/index',
	output: {
		filename: `[name]-[chunkhash:4].js`,
		path: path.resolve(workPath, './dist/js')
	}
}

export default class Configrue{
	constructor() {
		this.webpackConfig = defaultConfig
	}

	build(setting) {
		// complie...
		if(!setting) return;
		
		const webpacks = [
			new Entry(setting),
			new OutPut(setting)
		];
		/**
		 * TODO......
		 * 1.实例化 webpack各个部分（入口，出口，loader，plugin）
		 * 2.调用configure更新配置
		 * 3.返回新配置
		 */
		webpacks.map(item => {
			return item.configure(this.webpackConfig)
		})
		return this.webpackConfig
	}

}