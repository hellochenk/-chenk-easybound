const commander = require("commander");
const webpack = require("webpack");
const chalk = require("chalk");
const path = require("path");

import moment from "moment";
import WebpackDevServer from "webpack-dev-server";
import webpackConfigure from "./webpack-configrue.js";
import ReadConfig from "./readConfig.js";

// const workingDir = process.cwd();
// const log = console.log;

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
			.option("-D, --dev", "运行开发环境", v => v, "development")
			.option(
				"-d, --dist",
				"运行打包部署，参数：指定目标环境，默认production",
				v => v,
				"production"
			)
			.option("-t, --tsDev", "运行ts模式", v => v, "typescript")
			.option("-t, --tsProd", "运行ts模式", v => v, "typescript")
			.option("-c. --config <items>", "指定配置文件", v => v.split(","))
			.version("1.0.17", "-v, --version")
			.parse(process.argv);

		if (process.argv.length <= 2) {
			commander.outputHelp();
			return;
		}

		if (commander.dev) {
			this.dev(commander.dev, commander.config);
		}

		if (commander.tsDev) {
			this.ts(commander.ts, commander.config);
		}

		if (commander.dist) {
			this.prod(commander.dist, commander.config);
		}

		if (commander.tsProd) {
			// TODO
			console.log("ts production model");
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
			console.log(chalk.cyan(`start compile. model:${target}`));

			process.env.NODE_ENV = "development";
			// 读取设定，入口，端口
			const setting = this.ReadConfig.read(file); 
			// 生成webpack配置
			const appConfig = this.webpackConfigure.build(setting);
			// webpack 开发模式
			appConfig.mode = "development";

			// 加入 webpackdevserver hoc 入口 
			const { devServer } = appConfig;
			WebpackDevServer.addDevServerEntrypoints(appConfig, devServer);

			new WebpackDevServer(
				this.getWebpackCompiler(appConfig),
				devServer
			).listen(devServer.port, devServer.host, err => {
				if (err) {
					console.log(err);
				}
				console.log(`应用启动成功，端口:${devServer.port}`);
			});
		} catch (err) {
			console.log("err", chalk.red(err));
		}
	}

	prod(target, file) {
		try {
			console.log(chalk.cyan(`开始构建. model:`), chalk.red(`${target}`));

            // process.env.DEPLOY_ENV = target;
            process.env.NODE_ENV = "production";
			const setting = this.ReadConfig.read(file);
			const appConfig = this.webpackConfigure.build(setting);
			appConfig.mode = "production";
			appConfig.watch = false;
			// console.log('appConfig', appConfig)

			this.getWebpackCompiler(appConfig, (err, stats) => {
				if (err) {
					console.error(err);
					return;
				}
				console.log(stats.toString({
					chunks: false,  // 使构建过程更静默无输出
					modules: false,
					children: false,
					colors: true    // 在控制台展示颜色
				}));
			});


            // this.getWebpackCompiler(appConfig, function(err, stats) {
            //     if (err) throw err;
            //     process.stdout.write(
            //         stats.toString({
            //             colors: true,
            //             modules: false,
            //             children: false,
            //             chunks: false,
            //             chunkModules: false
            //         }) + `\n`
            //     );
            // });

        } catch (e) {
            console.error(e);
        }
	}

	// dev
	ts(target, file) {
		console.log(chalk.cyan(`start compile. model:${target}`));
		process.env.app_mode = "ts";
		process.env.NODE_ENV = "development";
		const setting = this.ReadConfig.read(file);
		setting.mode = "development";
		// console.log('setting ->>>>>>', setting)

		const appConfig = this.webpackConfigure.compileTs(setting);

		const { devServer } = appConfig;
		// const compile = this.getWebpackCompiler(appConfig);

		WebpackDevServer.addDevServerEntrypoints(appConfig, devServer);
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
}

export default Main;
