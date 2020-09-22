import { Component } from "../entities";

export default class ComponentInstallationService {
    constructor(installService, indexService, extensionResolver, htmlParser, componentSnippetResolver, sandboxService, options = {}) {
        this.installService = installService;
        this.indexService = indexService;
        this.extensionResolver = extensionResolver;
        this.htmlParser = htmlParser;
        this.componentSnippetResolver = componentSnippetResolver;
        this.sandboxService = sandboxService;
        this.options = options;        
    }

    async setup(type, componentPath, sandboxPath, shouldInstallDependency = true) {    
        const { components = [] } = this.options;

        try {
            await this.installComponents(components, type, componentPath, sandboxPath, shouldInstallDependency);
        } catch(e) {
            return;
        }
    }

    async installComponents(components, type, componentPath, sandboxPath, shouldInstallDependency = true) {
        const extension = this.extensionResolver.get(type);

        if (!components || !components.length) {
            return;
        }

        if (shouldInstallDependency) {
            try {
                await this.installService.install(...components.map(({packageName}) => packageName));
            } catch(e) {
                return;
            }
        }

        components.forEach(({name, packageName}) => {
            let component = new Component()
                .setName(packageName)
                .setInstalled(true)
                .setExtension(extension)
                .setAlias(name)
            ;

            this.exposeScripts(component, type, {path: componentPath});
            this.installMarkup(packageName, sandboxPath)

        });
    }

    exposeScripts(component, type, {path}) {
        this.indexService.create(component, type, {path});
    }

    installMarkup(packageName, sandboxPath) {
        this.sandboxService.getPages(sandboxPath).forEach(page => {
            let data = this.sandboxService.getPage(sandboxPath, page);
            let snippet = this.componentSnippetResolver.load(packageName);
            data = this.htmlParser.appendCode(data, '<script src="init.js"></script>', snippet, "    ");
            this.sandboxService.savePage(sandboxPath, page, data);
        })
    }
}