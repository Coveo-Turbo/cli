import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {SuccessMessage, ErrorMessage} = terminal;

export default class CreateProjectCommand extends Command {
    constructor(service, componentService, logger, params = {}) {
        super();
        this.service = service;
        this.componentService = componentService;
        this.logger = logger;
        this.params = params;
    }

    configure() {
        const {defaultType, path} = this.params;

        this.args.add(new InputOption('name', InputOption.string).isRequired());
        this.options.add((new InputOption('template', InputOption.string, defaultType)));
        this.options.add(new InputOption('verbosity', InputOption.string));
        this.options.add(new InputOption('create-component', InputOption.boolean));
        this.options.add(new InputOption('component-path', InputOption.string, path));
    }

    async action() {
        const name = this.getArgument('name');
        const template = this.getOption('template');
        const shouldCreateComponent = this.getOption('create-component');

        const verbosity = this.getOption('verbosity');
        let logger;

        if (Logger.DEBUG === verbosity) {
            logger = this.logger;
        }

        try {
            await this.service.create(name, template, {logger});
        } catch(e) {
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }

            new ErrorMessage(e.message);
            return;
        }
        
        new SuccessMessage('Project created!')

        if (shouldCreateComponent) {
            const path = this.getOption('component-path');

            try {
                this.componentService.create(name, template, {path, logger});
            } catch(e) {
                if (Logger.DEBUG === verbosity) {
                    this.logger.log(verbosity, e.stack);
                }
    
                new ErrorMessage(e.message);
                return;
            }

            new SuccessMessage('Component created!')
        }
    }
}