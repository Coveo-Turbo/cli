import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {SuccessMessage, ErrorMessage} = terminal;

export default class CreateDockerCommand extends Command {
    constructor(service, logger) {
        super();
        this.service = service;
        this.logger = logger;
    }

    configure() {
        this.options.add(new InputOption('verbosity', InputOption.string));
    }

    action() {
        const verbosity = this.getOption('verbosity');

        try {
            this.service.create();
        } catch(e) {
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }

            new ErrorMessage(e.message);
            return;
        }
        
        new SuccessMessage(`docker-compose.yml file created`)
    }
}