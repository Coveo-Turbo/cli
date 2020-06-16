import Path from 'path';
import { FileDoesNotExistError } from '../errors';

export default class WebpackConfigurationFactory {
    constructor(nameResolver, scriptExtensionResolver, stylesExtensionResolver, fileProvider, logger, config = {}) {
        this.nameResolver = nameResolver;
        this.scriptExtensionResolver = scriptExtensionResolver;
        this.stylesExtensionResolver = stylesExtensionResolver;
        this.fileProvider = fileProvider;
        this.logger = logger;
        this.config = config;
    }

    create(name, path, type, {destination = 'dist', stylesPath, stylesType, verbosity, disableSwapVar}) {
        const extension = this.scriptExtensionResolver.get(type);
        const stylesExtension = this.stylesExtensionResolver.get(stylesType);
        const namingStrategy = this.nameResolver.get(type);
        const library = `Coveo${namingStrategy.formatName(name)}`;

        let indexEntry = [
            ...this.createEntries(path, extension, {verbosity}),
            ...this.createEntries(stylesPath, stylesExtension, {verbosity, suppressError: true}),
        ];

        const entry = {
            'index': indexEntry,
            'index.min': indexEntry,
        }

        if (verbosity) {
            this.logger.debug({...entry});
        }

        const output = {
            ...this.config.output,
            library,
            path: Path.resolve(destination),
        };

        let config = {
            ...this.config, 
            entry, 
            output
        };

        if (disableSwapVar) {
            config = this.removeSwapvarLoader(config);
        }

        if (verbosity) {
            this.logger.debug({...config});
        }
        
        return config;
    }

    createEntries(path, extension, {verbosity, suppressError}) {
        const file = `index.${extension}`;
        const fileExists = this.fileProvider.exists(path, `index.${extension}`);

        if (verbosity) {
            this.logger.debug(`File to be added to entry: ${path}/${file}, ${fileExists ? 'Exists' : 'Does not exist'}`);
        }

        if (!fileExists) {
            const e = new FileDoesNotExistError(file, path, suppressError);

            if (suppressError) {
                this.logger.warn(e.message);
                return [];
            }

            throw e;
        }

        return [
            Path.resolve(`${path}/${file}`),
        ];
    }

    removeSwapvarLoader(config) {
        const INJECT_SWAPVAR = 'inject-swapvar';

        const index = config.module.rules.findIndex(item => item.use && item.use.includes(INJECT_SWAPVAR));
        if (index >= 0) {
            config.module.rules[index].use = config.module.rules[index].use.filter(loader => INJECT_SWAPVAR !== loader);
        }

        delete config.resolveLoader.alias[INJECT_SWAPVAR];

        return config;
    }
}