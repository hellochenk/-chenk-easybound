const commander = require("commander");
const webpack = require("webpack");
const chalk = require("chalk");
const path = require("path");

import moment from "moment";
import WebpackDevServer from "webpack-dev-server";
import webpackConfigure from "./webpack-configrue.js";
import ReadConfig from "./readConfig.js";

const workingDir = process.cwd();
const log = console.log;

class Main {
	// commander;
	constructor() {
		this.commander = commander;
		this.ReadConfig = new ReadConfig();
		this.webpackConfigure = new webpackConfigure();
	}

	cmd() {
		const { commander } = this;
		commander
			.version("0.1")
			.option("-D, --dev", "运行开发环境", v => v, "development")
			.option(
				"-d, --dist",
				"运行打包部署，参数：指定目标环境，默认production",
				v => v,
				"production"
			)
			.option("-t, --ts", "运行ts模式", v => v, "typescript")
			.option("-c. --config <items>", "指定配置文件", v => v.split(","))
			.version("0.0.1", "-v, --version")
			.parse(process.argv);

		if (process.argv.length <= 2) {
			commander.outputHelp();
			return;
		}

		if (commander.dev) {
			// this.testFn(commander.dev, commander.config);
			this.dev(commander.dev, commander.config);
		}

		if (commander.ts) {
			this.ts(commander.ts, commander.config);
		}

		if (commander.dist) {
			this.prod(commander.dist, commander.config);
		}
	}

	getWebpackCompiler(webpackConfig, callBack) {
		// 传入生成配置，执行编译
		const compiler = webpack(webpackConfig, callBack);
		if (!callBack) {
			let bundleStartTime;
			compiler.plugin("compile", () => {
				console.info(`${new Date()} 打包中...`);
				bundleStartTime = Date.now();
			});

			compiler.plugin("done", () => {
				const timeSpent = Date.now() - bundleStartTime;
				console.info(
					`${new Date()} 打包完成, 耗时 ${timeSpent / 1000} s.`
				);
			});
		}
		return compiler;
	}

	dev(target, file) {
		try {
			// 执行develop模式
			log(chalk.cyan(`start compile. model:${target}`));
			process.env.NODE_ENV = "development";

			const setting = this.ReadConfig.read(file);
			setting.mode = "development";
			const appConfig = this.webpackConfigure.build(setting);
			// const compile = this.getWebpackCompiler(appConfig);

			const { devServer } = appConfig;
			// console.log('devServer', devServer)
			// WebpackDevServer.addDevServerEntrypoints(appConfig, devServer);
			new WebpackDevServer(
				this.getWebpackCompiler(appConfig),
				devServer
			).listen(devServer.port, devServer.host, err => {
				// console.log('err: ', err)
				console.log("start .................");
				if (err) {
					console.log(err);
				}
				console.log(`应用启动成功，端口:${devServer.port}`);
			});

			// if (devServer.open) {
			// 	const {name, basePath, apps} = options;
			// 	const {host, port} = devServer;
			// 	open(`http://${host}${port ? (":" + port) : ""}${basePath}/${name}/${apps[0]}`)
			// }

			// this.getWebpackCompiler(appConfig, (err, stats) => {
			// 	if (err) {
			// 		return console.log(chalk.red(err));
			// 	}
			// 	process.stdout.write(
			// 		stats.toString({
			// 			colors: true,
			// 			modules: false,
			// 			children: false,
			// 			chunks: false,
			// 			chunkModules: false
			// 		}) + `\n`
			// 	);
			// });
		} catch (err) {
			console.log("err", chalk.red(err));
		}
	}

	prod(target, file) {
		// 将文件编译打包，
		log(chalk.cyan(`start compile. model:`), chalk.red(`${target}`));
		process.env.app_mode = "prod";
	}

	ts(target, file) {
		log(chalk.cyan(`start compile. model:${target}`));
		process.env.app_mode = "ts";
		const setting = this.ReadConfig.read(file);
		setting.mode = "development";
		// console.log('setting ->>>>>>', setting)

		const appConfig = this.webpackConfigure.compileTs(setting);
		// console.log('ts config ================>', appConfig);

		const { devServer } = appConfig;
		const compile = this.getWebpackCompiler(appConfig);

		// // WebpackDevServer.addDevServerEntrypoints(appConfig, devServer);
		new WebpackDevServer(this.getWebpackCompiler(appConfig)).listen(
			devServer.port,
			err => {
				if (err) {
					console.log(err);
				}
				console.log(`应用启动成功，端口:${devServer.port}`);
			}
		);
	}

	/* testFn(target, files) {
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
	} */
}

export default Main;
