import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {SuccessMessage, ErrorMessage} = terminal;

export default class BuildCommand extends Command {
    constructor(service, logger, params = {}, stylesParams = {}, watchOptions = {}) {
        super();
        this.service = service;
        this.logger = logger;
        this.params = params;
        this.stylesParams = stylesParams;
        this.watchOptions = watchOptions;
    }

    configure() {
        const {defaultType, path, destination} = this.params;
        const {defaultType: defaultStylesType, path: stylesPath, destination: stylesDestination} = this.stylesParams;
        const { watchTimeout } = this.watchOptions;

        this.args.add(new InputOption('name', InputOption.string).isRequired());
        this.options.add((new InputOption('template', InputOption.string, defaultType)));
        this.options.add((new InputOption('path', InputOption.string, path)));
        this.options.add((new InputOption('destination', InputOption.string, destination)));
        this.options.add(new InputOption('verbosity', InputOption.string));
        this.options.add(new InputOption('styles-path', InputOption.string, stylesPath));
        this.options.add(new InputOption('styles-type', InputOption.string, defaultStylesType));
        this.options.add(new InputOption('styles-destination', InputOption.string, stylesDestination));
        this.options.add(new InputOption('dry', InputOption.boolean));
        this.options.add(new InputOption('disable-swapvar', InputOption.boolean));
        this.options.add(new InputOption('watch', InputOption.boolean));
        this.options.add(new InputOption('watch-timeout', InputOption.number, watchTimeout));
    }

    async action() {
        const template = this.getOption('template');

        const name = this.getArgument('name');
        const path = this.getOption('path');
        const destination = this.getOption('destination');
        let verbosity = this.getOption('verbosity');
        const stylesPath = this.getOption('styles-path');
        const stylesType = this.getOption('styles-type');
        const stylesDestination = this.getOption('styles-destination');
        const dry = this.getOption('dry');
        const disableSwapVar = this.getOption('disable-swapvar');
        const watch = this.getOption('watch');
        const watchTimeout = this.getOption('watch-timeout');

        if (dry) {
            verbosity = verbosity || Logger.DEBUG;
        }

        const watchOptions = {
            timeout: watchTimeout,
            aggregateTimeout: watchTimeout,
            callback: () => new SuccessMessage('Source code built and bundled! Please refresh to see the results.')
        };

        try {
            await this.service.build(name, path, template, {
                destination, 
                stylesPath, 
                stylesType, 
                stylesDestination, 
                dry, 
                verbosity, 
                disableSwapVar, 
                watch,
                watchOptions,
            });
        } catch(e) {
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }

            new ErrorMessage(e.message);
            return;
        }
        
        new SuccessMessage('Source code built and bundled! Please refresh to see the results.')
    }
}