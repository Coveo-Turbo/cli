import path from 'path';
import { InvalidLocalizationFileTypeError } from '../errors';

export default class LocalesService {
    constructor(fileProvider, parser, options = {}) {
        this.fileProvider = fileProvider;
        this.parser = parser;
        this.options = options;        
    }

    create(defaultLocale, locales = [], type) {
        let baseLocalesFileContents;

        try {
            baseLocalesFileContents = this.getLocale(defaultLocale, type);
        } catch(e) {
            if (!e.message.includes('no such file or directory')) {
                throw e;
            }

            this.createBase(defaultLocale, type);
            baseLocalesFileContents = this.getLocale(defaultLocale, type);
        }

        let newLocalesContents = this.parser.prepareBlankLocales(baseLocalesFileContents, type);
        locales.forEach(locale => {
            this.persist(locale, newLocalesContents, type);
        });
    }    

    createBase(name, type = "json") {
        const { directory, types } = this.options;

        if (!types.includes(type)) {
            throw new InvalidLocalizationFileTypeError(type, types);
        }

        this.fileProvider.copy(path.resolve(__dirname, `../../templates/locales/${type}.${type}`), `./${directory}/${name}.${type}`);
    }

    getLocale(locale, type = "json") {
        const { directory } = this.options;
        return this.fileProvider.read(`./${directory}/${locale}.${type}`);
    }

    persist(locale, contents, type = "json") {
        const { directory } = this.options;
        this.fileProvider.write(`./${directory}`, locale, contents, type);
    }

    getLocaleFiles() {
        const { directory } = this.options;

        let localeFiles = [];

        try {
            localeFiles = this.fileProvider.readDirectory(directory);
        } catch(e) {
            if (!e.message.includes('no such file or directory')) {
                throw e;
            }
        }

        return localeFiles;
    }

    getLocales() {
        return this.getLocaleFiles().map(fileName => fileName.substring(0, fileName.indexOf('.')));
    }
}