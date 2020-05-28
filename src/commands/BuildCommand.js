import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {SuccessMessage, ErrorMessage} = terminal;

export default class BuildCommand extends Command {
    constructor(service, logger, params = {}) {
        super();
        this.service = service;
        this.logger = logger;
        this.params = params;
    }

    configure() {
        const {defaultType, path, destination, defaultStylesType} = this.params;

        this.args.add(new InputOption('name', InputOption.string).isRequired());
        this.options.add((new InputOption('template', InputOption.string, defaultType)));
        this.options.add((new InputOption('path', InputOption.string, path)));
        this.options.add((new InputOption('destination', InputOption.string, destination)));
        this.options.add(new InputOption('verbosity', InputOption.string));
        this.options.add(new InputOption('styles-path', InputOption.string));
        this.options.add(new InputOption('styles-type', InputOption.string, defaultStylesType));
    }

    async action() {
        const template = this.getOption('template');

        const name = this.getArgument('name');
        const path = this.getOption('path');
        const destination = this.getOption('destination');
        const verbosity = this.getOption('verbosity');
        const stylesPath = this.getOption('styles-path');
        const stylesType = this.getOption('styles-type');

        try {
            let logger;

            if (Logger.DEBUG === verbosity) {
                logger = this.logger;
            }

            await this.service.build(name, path, template, {logger, destination, stylesPath, stylesType});
        } catch(e) {
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }

            new ErrorMessage(e.message);
            return;
        }
        
        new SuccessMessage('Source code built and bundled!')
    }
}