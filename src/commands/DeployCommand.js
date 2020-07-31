import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {ErrorMessage, SuccessMessage} = terminal;

export default class DeployCommand extends Command {
    constructor(service, logger, defaults = {}) {
        super();
        this.service = service;
        this.logger = logger;
        this.defaults = defaults;
    }

    configure() {
        const {orgId, name, path, token} = this.defaults;

        this.args.add(new InputOption('name', InputOption.string, name));
        this.args.add(new InputOption('page-name', InputOption.string, name));
        this.options.add(new InputOption('path', InputOption.string, path));
        this.options.add(new InputOption('org-id', InputOption.string, orgId));
        this.options.add(new InputOption('token', InputOption.string, token));
        this.options.add(new InputOption('verbosity', InputOption.string));
    }

    async action() {
        const name = this.getArgument('name');
        const pageName = this.getArgument('page-name');
        const path = this.getOption('path');
        const orgId = this.getOption('org-id');
        const token = this.getOption('token');
        const verbosity = this.getOption('verbosity');
        
        try {
            await this.service.deploy(name, pageName, {path, orgId, token, verbosity});
        } catch(e) {
            console.error(e)
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }
            
            new ErrorMessage(e.message);
            return;
        }

        new SuccessMessage(`Deployed Sandbox: ${path}/${name} to Platform page: ${pageName} on Coveo Org: ${orgId}`);
    }
}