import { Component } from "../entities";

export default class IndexFactory {
    constructor(templateLoader) {
        this.templateLoader = templateLoader;
    }

    create(component, type) {
        if (component instanceof Component && component.getAlias()) {
            type = `${type}-aliased`;
        }

        let template = this.templateLoader.load(type);

        if (component instanceof Component && component.isInstalled()) {
            template = template.replace('./__COMPONENT_NAME__', '__COMPONENT_NAME__');
        }

        template = template.replace(/__COMPONENT_NAME__/g, component.getName());

        if (component instanceof Component && component.getAlias()) {
            template = template.replace(/__COMPONENT_ALIAS__/g, component.getAlias());
        }

        return new Component()
            .setName('index')
            .setCode(template)
            .setExtension(component.getExtension())
        ;
    }
}