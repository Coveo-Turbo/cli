import YAML from 'yaml';

//TODO: Refactor this to have proper strategies for each type: JS, JSON, YAML. USe the Resolvers from Component implementation etc
export default class LocalesParser {
    prepareBlankLocales(fileContents, type) {
        let currentLocales = this.parseLocales(fileContents, type);
        let placeholders = this.generateLocalePlaceholders(currentLocales);
        return this.assembleLocales(fileContents, placeholders, type)
    }

    parseLocales(fileContents = '', type) {
        let locales = 'js' === type ? fileContents.substring(fileContents.indexOf('{'), fileContents.lastIndexOf('}') + 1) : fileContents;
        return this.parse(locales, type);
    }

    generateLocalePlaceholders(locales = {}) {
        return Object.keys(locales).reduce((placeholders, locale) => {
            placeholders[locale] = '';
            return placeholders;
        }, {})
    }

    assembleLocales(fileContents, locales, type) {
        let currentLocales = 'js' === type ? fileContents.substring(fileContents.indexOf('{'), fileContents.lastIndexOf('}') + 1) : fileContents;
        return fileContents.replace(currentLocales, this.stringify(locales, type));
    }

    parse(locales, type) {
        if ('yaml' === type) {
            return YAML.parse(locales) || "";
        }

        return JSON.parse(locales);
    }

    stringify(locales, type) {
        if ('yaml' === type) {
            return YAML.stringify(locales, {
                indent: 4,
            })
        }

        return JSON.stringify(locales, null, 4);
    }
}