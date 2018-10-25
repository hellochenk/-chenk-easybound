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
			path: path.resolve(workDir, 'dist/'),
			filename: `[name]/js/[name][hash:4].js`
		}
	}
}