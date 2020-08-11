import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {SuccessMessage, ErrorMessage} = terminal;

export default class CreateLocalesCommand extends Command {
    constructor(service, logger, params = {}) {
        super();
        this.service = service;
        this.logger = logger;
        this.params = params;
    }

    configure() {
        const { defaultLocale, type } = this.params;

        this.args.add(new InputOption('locales', InputOption.array));
        this.options.add(new InputOption('default', InputOption.string, defaultLocale));
        this.options.add(new InputOption('type', InputOption.string, type));
        this.options.add(new InputOption('verbosity', InputOption.string));
    }

    action() {
        const locales = this.getArgument('locales');
        const type = this.getOption('type');
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
    }
}