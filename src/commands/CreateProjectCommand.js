import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {SuccessMessage, ErrorMessage} = terminal;

export default class CreateProjectCommand extends Command {
    constructor(
        service, 
        componentService, 
        stylesheetService, 
        sandboxService, 
        readmeService, 
        dockerService,
        localeService,
        localeSetupService,
        logger, 
        params = {},
        stylesParams = {}, 
        sandboxParams = {},
        localesParams = {},
    ) {
        super();
        this.service = service;
        this.componentService = componentService;
        this.stylesheetService = stylesheetService;
        this.sandboxService = sandboxService;
        this.readmeService = readmeService;
        this.dockerService = dockerService;
        this.localeService = localeService;
        this.localeSetupService = localeSetupService;
        this.logger = logger;
        this.params = params;
        this.stylesParams = stylesParams;
        this.sandboxParams = sandboxParams;
        this.localesParams = localesParams;
    }

    configure() {
        const {defaultType, path} = this.params;
        const {defaultType: stylesTemplate, path: stylesPath, defaultWithStyles} = this.stylesParams;
        const {path: sandboxPath, name: sandboxName} = this.sandboxParams;
        const { defaultLocale, type: localeType } = this.localesParams;

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
        this.options.add((new InputOption('sandbox-name', InputOption.string, sandboxName)));
        this.options.add((new InputOption('with-page', InputOption.boolean)));
        this.options.add((new InputOption('page-path', InputOption.string, sandboxPath)));
        this.options.add((new InputOption('page-name', InputOption.string, sandboxName)));
        this.options.add((new InputOption('description', InputOption.string, '')));
        this.options.add((new InputOption('package-name', InputOption.string)));
        this.options.add((new InputOption('with-docker', InputOption.boolean)));
        this.options.add(new InputOption('setup-locales', InputOption.array, []));
        this.options.add(new InputOption('default-locale', InputOption.string, defaultLocale));
        this.options.add(new InputOption('locale-type', InputOption.string, localeType));
    }

    async action() {
        const name = this.getArgument('name');
        const template = this.getOption('template');
        const shouldCreateComponent = this.getOption('create-component');
        const shouldCreateStylesheet = this.getOption('with-styles');
        const shouldCreateSandbox = this.getOption('with-sandbox') || this.getOption('with-page');
        const description = this.getOption('description');
        const packageName = this.getOption('package-name');
        const shouldCreateDocker = this.getOption('with-docker');
        const locales = this.getOption('setup-locales');

        const verbosity = this.getOption('verbosity');
        let logger;

        if (Logger.DEBUG === verbosity) {
            logger = this.logger;
        }

        try {
            await this.service.create(name, template, {description, packageName, logger});
        } catch(e) {
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }

            new ErrorMessage(e.message);
            return;
        }
        
        new SuccessMessage('Project created!')
        
        try {
            await this.readmeService.create(name, description);
        } catch(e) {
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }

            new ErrorMessage(e.message);
        }

        new SuccessMessage('README created!')

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
            const path = this.getOption('sandbox-path') || this.getOption('page-path');
            const sandboxName = this.getOption('sandbox-name') || this.getOption('page-name');

            try {
                this.sandboxService.create(path, sandboxName);
            } catch(e) {
                if (Logger.DEBUG === verbosity) {
                    this.logger.log(verbosity, e.stack);
                }
    
                new ErrorMessage(e.message);
                return;
            }
            
            new SuccessMessage(`Sandbox created: ${path}/${sandboxName}.html`)
        }

        if (shouldCreateDocker) {
            try {
                this.dockerService.create();
            } catch(e) {
                if (Logger.DEBUG === verbosity) {
                    this.logger.log(verbosity, e.stack);
                }
    
                new ErrorMessage(e.message);
                return;
            }
            
            new SuccessMessage(`docker-compose.yml file`)
        }

        if (locales.length) {
            const defaultLocale = this.getOption('default-locale');
            const localeType = this.getOption('locale-type');
            const componentPath = this.getOption('component-path');
            const sandboxPath = this.getOption('sandbox-path') || this.getOption('page-path');

            try {
                this.localeService.create(defaultLocale, locales, localeType);
            } catch(e) {
                if (Logger.DEBUG === verbosity) {
                    this.logger.log(verbosity, e.stack);
                }
    
                new ErrorMessage(e.message);
                return;
            }

            new SuccessMessage(`The locales folder has been made with the following files: ${[defaultLocale, ...locales].map(l => `${l}.${localeType}`).join(', ')}`);

            try {
                await this.localeSetupService.setup(template, componentPath, sandboxPath);
            } catch(e) {
                if (Logger.DEBUG === verbosity) {
                    this.logger.log(verbosity, e.stack);
                }

                new ErrorMessage(e.message);
                return;
            }

            new SuccessMessage(`The localization module has been setup.`)
        }
    }
}