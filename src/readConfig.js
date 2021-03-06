const fs = require("fs");
const path = require("path");

const workingDir = process.cwd();
const log = console.log;

export default class ReadConfig {
	static defaultConfigName = "config";

	static defaultSetting = {
		name: "myApp",
		title: "myApp",
		port: "8080"
	};

	constructor(name = ReadConfig.defaultConfigName) {
		this.name = name;
	}

	read(files) {
		// 如有自定义配置，加载自定义配置，如果没有默认加载config
		let loaderFiles =
			(files && files.length) > 0 ? files : [`${this.name}.js`];

		// let a = fs.readdirSync(path.resolve(workingDir, "./src"));
		try {
			let defaultSetting = ReadConfig.defaultSetting;

			// console.log("loaderFiles", loaderFiles);

			return loaderFiles.reduce((acc, cur) => {
				let config = require(path.resolve(workingDir, cur));
				return { ...acc, ...config };
			}, defaultSetting);

			// console.log("finilyconfig", finilyconfig);

			// return finilyconfig;
		} catch (err) {
			console.log(err);
		}
	}
}
