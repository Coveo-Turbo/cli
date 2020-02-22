import {Command, commands} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;

export default class UpdateCoveoSearchPageCommand extends Command {
    constructor(bundler, logger) {
        super();
        this.bundler = bundler;
        this.logger = logger;
    }

    configure() {
        this.args.add(new InputOption('pageName', InputOption.string).isRequired());
        this.options.add((new InputOption('cssExclusions', InputOption.array, [])));
        this.options.add((new InputOption('jsExclusions', InputOption.array, [])));
        this.options.add(new InputOption('cssPath', InputOption.string).isRequired());
        this.options.add(new InputOption('jsPath', InputOption.string).isRequired());
        this.options.add(new InputOption('htmlFilePath', InputOption.string).isRequired());
        this.options.add(new InputOption('pagesFilePath', InputOption.string).isRequired());
        this.options.add(new InputOption('startDelimeter', InputOption.string));
        this.options.add(new InputOption('endDelimeter', InputOption.string));
        this.options.add(new InputOption('verbosity', InputOption.string));
    }

    action() {
        const pageName = this.getArgument('pageName');
        const cssExclusions = this.getOption('cssExclusions');
        const jsExclusions = this.getOption('jsExclusions');
        const cssPath = this.getOption('cssPath');
        const jsPath = this.getOption('jsPath');
        const htmlFilePath = this.getOption('htmlFilePath');
        const pagesFilePath = this.getOption('pagesFilePath');
        const startDelimeter = this.getOption('startDelimeter');
        const endDelimeter = this.getOption('endDelimeter');
        const verbosity = this.getOption('verbosity');

        if (Logger.SILLY === verbosity) {
            this.logger.log(verbosity, JSON.stringify({
                pageName,
                cssExclusions,
                jsExclusions,
                cssPath,
                jsPath,
                htmlFilePath,
                pagesFilePath,
                startDelimeter,
                endDelimeter,
            }));
        }
        
        this.bundler.bundle(pageName, {
            cssExclusions,
            jsExclusions,
            cssPath,
            jsPath,
            htmlFilePath,
            pagesFilePath,
            startDelimeter,
            endDelimeter,
        })
    }
}