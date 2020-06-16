import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {SuccessMessage, ErrorMessage} = terminal;

export default class CreateStylesheetCommand extends Command {
    constructor(service, logger, params = {}) {
        super();
        this.service = service;
        this.logger = logger;
        this.params = params;
    }

    configure() {
        const {defaultType, path} = this.params;

        this.args.add(new InputOption('name', InputOption.string).isRequired());
        this.options.add((new InputOption('template', InputOption.string, defaultType)));
        this.options.add((new InputOption('path', InputOption.string, path)));
        this.options.add(new InputOption('verbosity', InputOption.string));
    }

    action() {
        const name = this.getArgument('name');
        const template = this.getOption('template');

        const path = this.getOption('path');
        const verbosity = this.getOption('verbosity');

        try {
            this.service.create(name, template, {path});
        } catch(e) {
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }

            new ErrorMessage(e.message);
            return;
        }
        
        new SuccessMessage(`Stylesheet created: ${path}/${name} - ${template}`)
    }
}