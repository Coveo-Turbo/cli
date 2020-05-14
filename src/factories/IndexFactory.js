import { Component } from "../entities";

export default class IndexFactory {
    constructor(templateLoader) {
        this.templateLoader = templateLoader;
    }

    create(component, type) {
        const template = this.templateLoader.load(type);

        return new Component()
            .setName('index')
            .setCode(template.replace(/__COMPONENT_NAME__/g, component.getName()))
            .setExtension(component.getExtension())
        ;
    }
}