import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {SuccessMessage, ErrorMessage} = terminal;

export default class CreateProjectCommand extends Command {
    constructor(service, componentService, stylesheetService, sandboxService, logger, params = {}, stylesParams = {}, sandboxParams = {}) {
        super();
        this.service = service;
        this.componentService = componentService;
        this.stylesheetService = stylesheetService;
        this.sandboxService = sandboxService;
        this.logger = logger;
        this.params = params;
        this.stylesParams = stylesParams;
        this.sandboxParams = sandboxParams;
    }

    configure() {
        const {defaultType, path} = this.params;
        const {defaultType: stylesTemplate, path: stylesPath, defaultWithStyles} = this.stylesParams;
        const {path: sandboxPath} = this.sandboxParams;

        this.args.add(new InputOption('name', InputOption.string).isRequired());
        this.options.add((new InputOption('template', InputOption.string, defaultType)));
        this.options.add(new InputOption('verbosity', InputOption.string));
        this.options.add(new InputOption('create-component', InputOption.boolean));
        this.options.add(new InputOption('component-path', InputOption.string, path));
        this.options.add(new InputOption('with-styles', InputOption.boolean, defaultWithStyles));
        this.options.add(new InputOption('styles-path', InputOption.string, stylesPath));
        this.options.add(new InputOption('styles-template', InputOption.string, stylesTemplate));
        this.options.add((new InputOption('with-sandbox', InputOption.boolean)));
        this.options.add((new InputOption('sandbox-path', InputOption.string, sandboxPath)));
    }

    async action() {
        const name = this.getArgument('name');
        const template = this.getOption('template');
        const shouldCreateComponent = this.getOption('create-component');
        const shouldCreateStylesheet = this.getOption('with-styles');
        const shouldCreateSandbox = this.getOption('with-sandbox');

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

            new SuccessMessage(`Component created: ${path}/${name} - ${template}`)

            if (shouldCreateStylesheet) {
                const path = this.getOption('styles-path');
                const template = this.getOption('styles-template');

                try {
                    this.stylesheetService.create(name, template, {path, verbosity});
                } catch(e) {
                    if (Logger.DEBUG === verbosity) {
                        this.logger.log(verbosity, e.stack);
                    }
        
                    new ErrorMessage(e.message);
                    return;
                }

                new SuccessMessage(`Stylesheet created:  ${path}/${name} - ${template}`)
            }
        }

        if (shouldCreateSandbox) {
            const path = this.getOption('sandbox-path');

            try {
                this.sandboxService.create(path);
            } catch(e) {
                if (Logger.DEBUG === verbosity) {
                    this.logger.log(verbosity, e.stack);
                }
    
                new ErrorMessage(e.message);
                return;
            }
            
            new SuccessMessage(`Sandbox created: ${path}/index.html`)
        }
    }
}