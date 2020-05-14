import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {ErrorMessage} = terminal;

export default class ServerCommand extends Command {
    constructor(app, logger, sandboxResolver, defaults = {}) {
        super();
        this.app = app;
        this.logger = logger;
        this.sandboxResolver = sandboxResolver;
        this.defaults = defaults;
    }

    configure() {
        const {restUri, orgId, path, searchHub, searchUrl, token} = this.defaults;

        this.options.add((new InputOption('port', InputOption.number)));
        this.options.add(new InputOption('path', InputOption.string, path));
        this.options.add(new InputOption('org-id', InputOption.string, orgId));
        this.options.add(new InputOption('token', InputOption.string, token));
        this.options.add(new InputOption('rest-uri', InputOption.string, restUri));
        this.options.add(new InputOption('search-hub', InputOption.string, searchHub));
        this.options.add(new InputOption('search-url', InputOption.string, searchUrl));
        this.options.add(new InputOption('verbosity', InputOption.string));
    }

    action() {
        const port = this.getOption('port');
        const path = this.getOption('path');
        const orgId = this.getOption('org-id');
        const token = this.getOption('token');
        const restUri = this.getOption('rest-uri');
        const searchHub = this.getOption('search-hub');
        let searchUrl = this.getOption('search-url');
        const verbosity = this.getOption('verbosity');

        this.sandboxResolver.add('path', path);
        this.sandboxResolver.add('org-id', orgId);
        this.sandboxResolver.add('token', token);
        this.sandboxResolver.add('rest-uri', restUri);
        this.sandboxResolver.add('search-hub', searchHub);
        
        if (port) {
            this.app.port = port;

            if (!searchUrl) {
                searchUrl = `http://localhost:${port}/`
            }
        }

        this.sandboxResolver.add('search-url', searchUrl);
        
        try {
            this.app.initialize().start();
        } catch(e) {
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }

            new ErrorMessage(e.message);
            return;
        }
    }
}