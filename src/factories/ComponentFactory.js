import { Component } from "../entities";

export default class ComponentFactory {
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

        return new Component()
            .setName(name)
            .setCode(template.replace(/__COMPONENT_NAME__/g, name))
            .setExtension(extension)
        ;
    }
}