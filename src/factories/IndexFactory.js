import { Component } from "../entities";

export default class IndexFactory {
    constructor(templateLoader) {
        this.templateLoader = templateLoader;
    }

    create(component, type) {
        if (component.getAlias()) {
            type = `${type}-aliased`;
        }

        let template = this.templateLoader.load(type);

        if (component.isInstalled()) {
            template = template.replace('./__COMPONENT_NAME__', '__COMPONENT_NAME__');
        }

        template = template.replace(/__COMPONENT_NAME__/g, component.getName());
        template = template.replace(/__COMPONENT_ALIAS__/g, component.getAlias());

        return new Component()
            .setName('index')
            .setCode(template)
            .setExtension(component.getExtension())
        ;
    }
}