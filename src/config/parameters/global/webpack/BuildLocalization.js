import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import YAML from 'yaml';

function assignToVariable(translations) {
    return `var LOCALES = ${JSON.stringify(translations, null, 4)}`;
}

function extractTranslations(fileContents) {
    return JSON.parse(fileContents.substring(fileContents.indexOf('{'), fileContents.lastIndexOf('}') + 1));
}

export default function LocalizationBuilder() {
    return new CopyPlugin(
        {
            patterns: [
                {
                    context: path.resolve("./locales"),
                    from: '*.js',
                    to: 'locales/[name].js',
                    transform: (content) => {
                        let translations = extractTranslations(content.toString('utf8'));
                        let fileContents = assignToVariable(translations);

                        return Buffer.from(fileContents, 'utf8');
                    },
                    noErrorOnMissing: true,
                },
                {
                    context: path.resolve("./locales"),
                    from: '*.json',
                    to: 'locales/[name].js',
                    transform: (content) => {
                        let translations = JSON.parse(content.toString('utf8'));
                        let fileContents = assignToVariable(translations);

                        return Buffer.from(fileContents, 'utf8');
                    },
                    noErrorOnMissing: true,
                },
                {
                    context: path.resolve("./locales"),
                    from: '*.yaml',
                    to: 'locales/[name].js',
                    transform: (content) => {
                        YAML.scalarOptions.null.nullStr = "";
                        let translations = YAML.parse(content.toString('utf8'));
                        let fileContents = assignToVariable(translations);

                        return Buffer.from(fileContents, 'utf8');
                    },
                    noErrorOnMissing: true,
                },
            ]
        }
    )
}