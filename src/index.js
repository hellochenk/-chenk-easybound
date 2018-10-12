const commander = require("commander");
const webpack = require("webpack");
const chalk = require("chalk");
const path = require('path')
import moment from 'moment'

import Loader from './loader-helper'
const workingDir = process.cwd()

class Main {
	// commander;
	constructor() {
		this.commander = commander;
		// this.webpack = webpack;
		this.loader = new Loader();
	}

	cmd() {
		this.commander
			.version("0.1")
			.option("-D, --dev", "运行开发环境", v => v, "development")
			.option(
				"-d, --dist",
				"运行打包部署，参数：指定目标环境，默认production",
				v => v,
				"production"
			)
			.option("-c. --config <items>", "指定配置文件", v => v.split(","))
			.parse(process.argv);

		if (process.argv.length <= 2) {
			commander.outputHelp();
			return;
		}

		if (commander.dev) {
			// this.testFn(commander.dev, commander.config);
			this.dev();
		}

		if (commander.dist) {
			this.testFn(commander.dist, commander.config);
		}
	}

	dev() {
		// 执行develop模式
		console.log(webpack);
	}

	prod() {

	}

	testFn(target, files) {
		// console.log("test console");
		commander
			.version("0.1.0")
			.option(
				"-p, --peppers",
				"Add peppers",
				v => {
					console.log(v);
					return v;
				},
				"a"
			)
			.option("-P, --pineapple", "Add pineapple")
			.option("-b, --bbq-sauce", "Add bbq sauce")
			.option(
				"-c, --cheese [type]",
				"Add the specified type of cheese [marble]",
				"marble"
			)
			.parse(process.argv);
		// process.env.dev = "dev";
		// console commander
		// argv 中包含node，cli包地址，以及命令参数
		if (process.argv < 2) {
			// cli 没有配置 提示help
			return commander.outputHelp();
		}

		console.log(chalk.magenta("you ordered a pizza with:"));
		if (commander.peppers) {
			console.log("  - peppers", commander.peppers);
		}
		if (commander.pineapple) {
			console.log("  - pineapple", commander.pineapple);
		}
		if (commander.bbqSauce) {
			console.log("  - bbq", commander.bbqSauce);
		}
		console.log("  - %s cheese", commander.cheese);
		// 1.读取配置......
		let myconfig = this.loader.load()
		// console.log(
		let a = webpack({
			entry:'./src/home/index',
			output: {
				path: path.resolve(workingDir, './test/'),
				filename: 'test.js'
			}
		}, () => {})
		// WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);
		// );
		let bundleStartTime = moment(new Date())
		// 2.webpack编译
		a.plugin('compile', () => {
            bundleStartTime = moment(new Date())
            console.info(`${new Date()} 打包中...`, bundleStartTime);
        });

        a.plugin('done', () => {
            const timeSpent = moment(new Date()) - bundleStartTime;
            console.info(chalk.cyan(`${new Date()} 打包完成, 耗时 ${timeSpent} s.`));
        });

	}
}

export default Main;
