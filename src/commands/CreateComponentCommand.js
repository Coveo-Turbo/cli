import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {SuccessMessage, ErrorMessage} = terminal;

export default class CreateComponentCommand extends Command {
    constructor(service, stylesheetService, logger, params = {}, stylesParams = {}) {
        super();
        this.service = service;
        this.stylesheetService = stylesheetService;
        this.logger = logger;
        this.params = params;
        this.stylesParams = stylesParams;
    }

    configure() {
        const {defaultType, path, defaultInitStrategy} = this.params;
        const {defaultType: defaultStylesTemplate, path: defaultStylesPath, defaultWithStyles} = this.stylesParams;

        this.args.add(new InputOption('name', InputOption.string).isRequired());
        this.options.add((new InputOption('template', InputOption.string, defaultType)));
        this.options.add((new InputOption('path', InputOption.string, path)));
        this.options.add(new InputOption('verbosity', InputOption.string));
        this.options.add(new InputOption('init-strategy', InputOption.string, defaultInitStrategy));
        this.options.add(new InputOption('with-styles', InputOption.boolean, defaultWithStyles));
        this.options.add(new InputOption('styles-template', InputOption.boolean, defaultStylesTemplate));
        this.options.add(new InputOption('styles-path', InputOption.boolean, defaultStylesPath));
    }

    action() {
        const name = this.getArgument('name');
        const template = this.getOption('template');

        const path = this.getOption('path');
        const verbosity = this.getOption('verbosity');
        const initStrategy = this.getOption('init-strategy');

        const stylesPath = this.getOption('styles-path');
        const stylesTemplate = this.getOption('styles-template');
        const withStyles = this.getOption('with-styles');

        try {
            this.service.create(name, template, {path, initStrategy});
        } catch(e) {
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }

            new ErrorMessage(e.message);
            return;
        }

        if (withStyles) {
            try {
                this.stylesheetService.create(name, stylesTemplate, {path: stylesPath});
            } catch (e) {
                if (Logger.DEBUG === verbosity) {
                    this.logger.log(verbosity, e.stack);
                }
    
                new ErrorMessage(e.message);
                return;
            }
        }
        
        new SuccessMessage(`Component created: ${path}/${name} - ${template}`)
    }
}