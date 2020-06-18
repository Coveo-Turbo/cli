import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {SuccessMessage, ErrorMessage} = terminal;

export default class CreateReadmeCommand extends Command {
    constructor(service, logger) {
        super();
        this.service = service;
        this.logger = logger;
    }

    configure() {
        this.args.add(new InputOption('name', InputOption.string).isRequired());
        this.options.add((new InputOption('description', InputOption.string, '')));
        this.options.add(new InputOption('verbosity', InputOption.string));
    }

    action() {
        const name = this.getArgument('name');
        const description = this.getOption('description');

        console.log(description)

        const verbosity = this.getOption('verbosity');

        try {
            this.service.create(name, description);
        } catch(e) {
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }

            new ErrorMessage(e.message);
            return;
        }
        
        new SuccessMessage(`README.md created`)
    }
}