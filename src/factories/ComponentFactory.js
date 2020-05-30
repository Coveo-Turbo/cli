import { Component } from "../entities";

export default class ComponentFactory {
    constructor(templateLoader, nameResolver, extensionResolver, initStrategyResolver) {
        this.templateLoader = templateLoader;
        this.nameResolver = nameResolver;
        this.extensionResolver = extensionResolver;
        this.initStrategyResolver = initStrategyResolver;
    }

    create(name, type, initStrategy) {
        const template = this.templateLoader.load(type);
        const namingStrategy = this.nameResolver.get(type);
        name = namingStrategy.formatName(name);
        const extension = this.extensionResolver.get(type);
        initStrategy = this.initStrategyResolver.get(initStrategy);

        let code = template
            .replace(/__COMPONENT_NAME__/g, name)
            .replace(/__COMPONENT_INIT_STRATEGY__/g, initStrategy)
        ;

        return new Component()
            .setName(name)
            .setCode(code)
            .setExtension(extension)
        ;
    }
}