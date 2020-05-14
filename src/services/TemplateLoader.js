import path from 'path';

export default class TemplateLoader {
    constructor(fileProvider, resolver, path) {
        this.fileProvider = fileProvider;
        this.resolver = resolver;
        this.path = path;
    }

    load(name) {
        const templateFile = this.resolver.get(name);
        const templatePath = path.resolve(__dirname, `./${this.path}/${templateFile}`);
        let contents;

        try {
            contents = this.fileProvider.read(templatePath);
        } catch (e) {
            throw new Error(`Template ${templateFile} doesn't exist`);
        }

        return contents;
    }

}