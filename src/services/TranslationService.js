import { RequiresLocalesError, TranslationAlreadyExistsError } from "../errors";

export default class TranslationService {
    constructor(localesService, parser, options = {}) {
        this.localesService = localesService;
        this.parser = parser;
    }

    create(word, translations, target, type) {
        let locales = this.getLocales();

        if (!locales.length) {
            throw new RequiresLocalesError();
        }

        locales.forEach(locale => {
            let fileContents = this.localesService.getLocale(locale, type);

            let value = translations.get(locale) || "";

            try {
                fileContents = this.addTranslation(fileContents, word, value, target, type);
            } catch(e) {
                return;
            }
            
            this.localesService.persist(locale, fileContents, type);
        });
    }

    update(word, translations, target, type) {
        let locales = this.getLocales();

        if (!locales.length) {
            throw new RequiresLocalesError();
        }

        locales.forEach(locale => {
            let fileContents = this.localesService.getLocale(locale, type);

            let value = translations.get(locale) || "";

            if (!value) {
                return;
            }

            fileContents = this.updateTranslation(fileContents, word, value, target, type);
            
            this.localesService.persist(locale, fileContents, type);
        });
    }

    addTranslation(fileContents, word, value, target, type) {
        let locales = this.parser.parseLocales(fileContents, type) || {};

        if ((!target && locales[word]) || (locales[target] && locales[target][word])) {
            throw new TranslationAlreadyExistsError(word, locales[word] || locales[target][word]);
        }

        if (target) {
            if (!locales[target]) {
                locales[target] = {};
            }

            locales[target][word] = value;
        } else {
            locales[word] = value;
        }
        
        return this.parser.assembleLocales(fileContents, locales, type);
    }

    updateTranslation(fileContents, word, value, target, type) {
        let locales = this.parser.parseLocales(fileContents, type) || {};

        if (target) {
            if (!locales[target]) {
                locales[target] = {};
            }

            locales[target][word] = value;
        } else {
            locales[word] = value;
        }

        return this.parser.assembleLocales(fileContents, locales, type);
    }

    getLocales() {
        return this.localesService.getLocales();
    }
}