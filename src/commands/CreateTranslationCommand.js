import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';
import { RequiresLocalesError } from '../errors';

const {InputOption} = commands;
const {SuccessMessage, ErrorMessage, Message} = terminal;

export default class CreateTranslationCommand extends Command {
    locales = [];

    constructor(service, logger, params = {}) {
        super();
        this.service = service;
        this.logger = logger;
        this.params = params;
    }

    configure() {
        this.locales = this.service.getLocales();

        this.locales.forEach(locale => this.options.add(new InputOption(locale, InputOption.string)));

        const {type} = this.params;

        this.options.add(new InputOption('target', InputOption.string));
        this.options.add(new InputOption('type', InputOption.string, type));
        this.options.add(new InputOption('verbosity', InputOption.string));
        this.args.add(new InputOption('word', InputOption.string).isRequired());
    }

    prepareTranslations() {
        let translations = new Map();

        this.locales.forEach(locale => {
            translations.set(locale, this.getOption(locale));
        });

        return translations;
    }

    action() {
        const word = this.getArgument('word');
        const target = this.getOption('target');
        const type = this.getOption('type');
        const verbosity = this.getOption('verbosity');
        let translations = this.prepareTranslations();

        if (Logger.DEBUG === verbosity) {
            this.logger.log(verbosity, word);
            this.logger.log(verbosity, this.locales);
            this.logger.log(verbosity, translations);
        }

        try {
            this.service.create(word, translations, target, type);
        } catch(e) {
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }

            new ErrorMessage(e.message);

            if (e instanceof RequiresLocalesError) {
                new Message(`Create locales and specify a default using the following command: npx @coveops/cli create:locales en fr --default en`);
            }

            return;
        }

        new SuccessMessage(`The translations for word ${word} have been added to the corresponding files: ${this.locales.map(l => `${l}.${type}`).join(', ')}`)
    }
}