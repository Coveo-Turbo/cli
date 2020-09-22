import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {SuccessMessage, ErrorMessage} = terminal;

export default class CreateLocalesCommand extends Command {
    constructor(service, setupService, logger, params = {}, componentParams = {}, sandboxParams = {}) {
        super();
        this.service = service;
        this.setupService = setupService;
        this.logger = logger;
        this.params = params;
        this.componentParams = componentParams;
        this.sandboxParams = sandboxParams;
    }

    configure() {
        const { defaultLocale, type } = this.params;
        const { defaultType, path } = this.componentParams;
        const { path: sandboxPath } = this.sandboxParams;

        this.args.add(new InputOption('locales', InputOption.array));
        this.options.add(new InputOption('default', InputOption.string, defaultLocale));
        this.options.add(new InputOption('type', InputOption.string, type));
        this.options.add((new InputOption('setup', InputOption.boolean)));
        this.options.add((new InputOption('component-template', InputOption.string, defaultType)));
        this.options.add(new InputOption('component-path', InputOption.string, path));
        this.options.add((new InputOption('sandbox-path', InputOption.string, sandboxPath)));
        this.options.add(new InputOption('verbosity', InputOption.string));
    }

    async action() {
        const locales = this.getArgument('locales');
        const type = this.getOption('type');
        const setup = this.getOption('setup');
        const defaultLocale = this.getOption('default');
        const verbosity = this.getOption('verbosity');

        try {
            this.service.create(defaultLocale, locales, type);
        } catch(e) {
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }

            new ErrorMessage(e.message);
            return;
        }
        
        new SuccessMessage(`The locales folder has been made with the following files: ${[defaultLocale, ...locales].map(l => `${l}.${type}`).join(', ')}`)

        if (setup) {
            const template = this.getOption('component-template');
            const componentPath = this.getOption('component-path');
            const sandboxPath = this.getOption('sandbox-path');

            try {
                await this.setupService.setup(template, componentPath, sandboxPath);
            } catch(e) {
                if (Logger.DEBUG === verbosity) {
                    this.logger.log(verbosity, e.stack);
                }

                new ErrorMessage(e.message);
                return;
            }

            new SuccessMessage(`The localization module has been setup.`)
        }
    }
}