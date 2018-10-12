const fs = require("fs");
const path = require("path");

export default class Loader {
	static defaultConfigName = "config";

	static defaultconfig = {
		name: 'testApp',
		title: 'testApp',
		port: '8888'
	}

	constructor(name = Loader.defaultConfigName) {
		this.name = name;
	}

	load(files) {
		// 运行目录
		const workingDir = process.cwd();
		let loaderFiles =
			files && files.length > 0 ? files : [`${this.name}.js`];
		// console.log("work dir", workingDir);
		// let a = fs.readdirSync(path.resolve(workingDir, "./src"));
		// console.log(a);
		// TODO read & load file...
		let myconfig = Loader.defaultconfig
		myconfig = loaderFiles.reduce((acc, cur) => {
			let config = require(path.resolve(workingDir, cur));
			return {cur, ...config};
		}, {});


		// console.log('myconfig', myconfig)

		return myconfig
	}
}
