import { InvalidComponentTypeError } from '../errors';
import webpack from 'webpack';

export default class BuildService {
    constructor(webpackConfigFactory, options = {}) {
        this.webpackConfigFactory = webpackConfigFactory;
        this.options = options;
    }

    async build(name, path, type, options = {}) {
        const { types = [] } = this.options;
        const { logger, destination, stylesPath, stylesType } = options;

        if (!(types.includes(type))) {
            throw new InvalidComponentTypeError(type, types);
        }

        const config = this.webpackConfigFactory.create(name, path, type, {logger, destination, stylesPath, stylesType});
        const compiler = webpack(config);

        return await new Promise((resolve, reject) => {
            return compiler.run((err, res) => {
                if (err) {
                    return reject(err);
                }

                return resolve(res);
            })
        })
    }
}