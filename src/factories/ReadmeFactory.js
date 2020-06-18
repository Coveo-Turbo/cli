import { Readme } from "../entities";

export default class ReadmeFactory {
    constructor(templateLoader) {
        this.templateLoader = templateLoader;
    }

    create(name, packageName, description = '') {
        const template = this.templateLoader.load('default');

        let code = template
            .replace(/__COMPONENT_NAME__/g, name)
            .replace(/__DESCRIPTION__/g, this.formatDescription(description))
            .replace(/__PACKAGE_NAME__/g, packageName)
        ;

        return new Readme()
            .setCode(code)
        ;
    }

    formatDescription(description) {
        if (!description) {
            return '';
        }

        description = description.replace(/\w,\w/g, ' ');

        return `\n${description}\n`;
    }
}