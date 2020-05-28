import Path from 'path';

export default class WebpackConfigurationFactory {
    constructor(nameResolver, scriptExtensionResolver, stylesExtensionResolver, config = {}) {
        this.nameResolver = nameResolver;
        this.scriptExtensionResolver = scriptExtensionResolver;
        this.stylesExtensionResolver = stylesExtensionResolver;
        this.config = config;
    }

    create(name, path, type, {logger, destination = 'dist', stylesPath, stylesType}) {
        const extension = this.scriptExtensionResolver.get(type);
        const stylesExtension = this.stylesExtensionResolver.get(stylesType);
        const namingStrategy = this.nameResolver.get(type);
        const library = `Coveo${namingStrategy.formatName(name)}`;

        let indexEntry = [
            Path.resolve(`${path}/index.${extension}`),
        ];

        if (stylesPath) {
            indexEntry.push(Path.resolve(`${stylesPath}/index.${stylesExtension}`));
        }

        const entry = {
            'index': indexEntry,
            'index.min': indexEntry,
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