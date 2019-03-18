const path = require('path')
import Configure from "./configure.js";
const workDir = process.cwd();

export default class Output extends Configure {
	constructor(props) {
		super(props);
	}

	configure(webpack) {
		const { dll, version } = this.config;
		webpack.output = {
			path: path.resolve(workDir, 'dist'),
			filename: `[name]/js/[name][hash:4].js`,
            // chunkFilename: '[name].bundle.js',
			chunkFilename: '[id].js',
            publicPath: '/',

            // path: path.resolve (__dirname, 'dist'),
            // filename: '[name].bundle.js',
            // publicPath: '/',
            // chunkFilename: '[name].bundle.js',

			// path: path.join(process.cwd(),version&&isString(version)?`dist/${version}`:'dist'),
   //          filename: `[name]/js/[name].js`,
   //          chunkFilename: '[id].js',
   //          publicPath: dll ?`/public/${this.config.name}/${version}/`:`/public/${this.config.name}/`,
   //          library: dll ? "[name]" : undefined,
		}
	}
}