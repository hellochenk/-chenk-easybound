const path = require('path');
const fs = require('fs');

import Entry from './webpack-entry.js';
import OutPut from './webpack-output.js';
import Plugin from './webpack-plugin.js';
import Module from './webpack-module.js';
import DevServer from './webpack-devServer.js';

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
		if(!setting) return;
		const configrues = [
			new Entry(setting),
			new OutPut(setting),
			new Plugin(setting),
			new Module(setting),
			new DevServer(setting)
		];

		let webpack = {
			...this.webpackConfig,
			mode: process.env.app_mode === 'dev' 
				? 'development'
				: 'production' ,
			devtool: process.env.app_mode === 'dev'
				? 'source-map'
				: false,
			resolve: {
				extensions:['.js', '.jsx', '.json']
			}
		}

		// 生成 webpack 配置
		configrues.map(item => {
			return item.configure(webpack)
		});

		return webpack
	}

}