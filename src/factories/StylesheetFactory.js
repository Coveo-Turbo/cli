import { Stylesheet } from "../entities";

export default class StylesheetFactory {
    constructor(templateLoader, nameResolver, extensionResolver) {
        this.templateLoader = templateLoader;
        this.nameResolver = nameResolver;
        this.extensionResolver = extensionResolver;
    }

    create(name, type) {
        const template = this.templateLoader.load(type);
        const namingStrategy = this.nameResolver.get(type);
        name = namingStrategy.formatName(name);
        const extension = this.extensionResolver.get(type);

        let code = template
            .replace(/__COMPONENT_NAME__/g, name)
        ;

        return new Stylesheet()
            .setName(name)
            .setCode(code)
            .setExtension(extension)
        ;
    }
}