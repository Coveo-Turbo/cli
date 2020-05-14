import Path from 'path';

export default class WebpackConfigurationFactory {
    constructor(nameResolver, extensionResolver, config = {}) {
        this.nameResolver = nameResolver;
        this.extensionResolver = extensionResolver;
        this.config = config;
    }

    create(name, path, type, {logger, destination = 'dist'}) {
        const extension = this.extensionResolver.get(type);
        const namingStrategy = this.nameResolver.get(type);
        const library = `Coveo${namingStrategy.formatName(name)}`;

        const entry = {
            'index': [Path.resolve(`${path}/index.${extension}`)],
        }

        const output = {
            ...this.config.output,
            library,
            path: Path.resolve(destination),
        };

        const config = {
            ...this.config, 
            entry, 
            output
        };

        if (logger) {
            logger.debug(config);
        }
        
        return config;
    }
}