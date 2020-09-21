import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {SuccessMessage, ErrorMessage} = terminal;

export default class CreatePipelineCommand extends Command {
    constructor(service, conditionService, logger, defaults = {}) {
        super();
        this.service = service;
        this.conditionService = conditionService;
        this.logger = logger;
        this.defaults = defaults;
    }

    configure() {
        const {orgId, token} = this.defaults;

        this.args.add(new InputOption('name', InputOption.string).isRequired());
        this.options.add(new InputOption('search-hub', InputOption.string));
        this.options.add(new InputOption('description', InputOption.string));
        this.options.add(new InputOption('without-search-hub', InputOption.boolean))
        this.options.add(new InputOption('org-id', InputOption.string, orgId));
        this.options.add(new InputOption('token', InputOption.string, token));
        this.options.add(new InputOption('verbosity', InputOption.string));
    }

    async action() {
        const name = this.getArgument('name');
        const searchHub = this.getOption('search-hub') || name;
        const description = this.getOption('description');
        const withoutSearchHub = this.getOption('without-search-hub');
        const orgId = this.getOption('org-id');
        const token = this.getOption('token');
        const verbosity = this.getOption('verbosity');

        let condition;

        if (!withoutSearchHub) {
            try {
                condition = await this.conditionService.createSearchHub(searchHub, {orgId, token, verbosity});
            } catch(e) {
                if (Logger.DEBUG === verbosity) {
                    this.logger.log(verbosity, e.stack);
                }
                
                new ErrorMessage(e.message);
                return;
            }
        }
        
        try {
            await this.service.create({name, condition, description}, {orgId, token, verbosity});
        } catch(e) {
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }
            
            new ErrorMessage(e.message);
            return;
        }

        new SuccessMessage(`Created Pipeline: ${name}${withoutSearchHub ? '' : `with Search Hub ${searchHub}`} on Coveo Org: ${orgId}`);
    }
}