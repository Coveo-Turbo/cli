import { HttpStatus } from "tramway-core-router";
import { ProjectNotBuiltError, SandboxDoesNotExistError } from '../errors';

export default class DeployService {
    constructor(platformPageService, searchPageService, staticResourceService, sandboxService, htmlParser, logger) {
        this.platformPageService = platformPageService;
        this.searchPageService = searchPageService;
        this.staticResourceService = staticResourceService;
        this.sandboxService = sandboxService;
        this.htmlParser = htmlParser;
        this.logger = logger;
    }

    async deploy(sandboxName, pageName, {path, orgId, token, verbosity, shouldBundle}) {
        let page, contents, resource, scripts, styles;

        this.manageParameters(orgId, token)

        try {
            contents = this.getSandboxContents(path, sandboxName);
        } catch(e) {
            throw SandboxDoesNotExistError(sandboxName);
        }

        if (verbosity) {
            this.logger.info(contents);
        }

        try {
            scripts = this.getSandboxScripts()
        } catch(e) {
            if (e.message.includes('no such file or directory')) {
                throw new ProjectNotBuiltError();
            }

            throw e;
        }

        if (verbosity) {
            this.logger.info(scripts);
        }

        try {
            styles = this.getSandboxStyles()
        } catch(e) {
            if (e.message.includes('no such file or directory')) {
                throw new ProjectNotBuiltError();
            }

            throw e;
        }

        if (verbosity) {
            this.logger.info(styles);
        }

        try {
            page = await this.getOrCreateSearchPage(pageName, {verbosity});
        } catch(e) {
            throw e;
        }

        if (verbosity) {
            this.logger.info({...page});
        }

        this.setPageId(page);

        if (shouldBundle) {
            contents += `
                <script>${scripts}</script>
                <style>${styles}</style>
            `;
        }

        try {
            page = await this.updateHtml(page, contents);
        } catch(e) {
            throw e;
        }

        if (verbosity) {
            this.logger.info({...page});
        }

        if (!shouldBundle) {
            try {
                await this.upsertOrRemoveStaticResource('javascript', sandboxName, scripts, { verbosity });
            } catch (e) {
                throw e;
            }

            try {
                await this.upsertOrRemoveStaticResource('css', sandboxName, styles, { verbosity });
            } catch (e) {
                throw e;
            }
        }        
    }

    manageParameters(orgId, token) {
        if (orgId) {
            this.platformPageService.setQueryParameter('orgId', orgId);
            this.searchPageService.setQueryParameter('orgId', orgId);
            this.staticResourceService.setQueryParameter('orgId', orgId);
        }

        if (token) {
            this.platformPageService.setHeader('authorization', `Bearer ${token}`);
            this.searchPageService.setHeader('authorization', `Bearer ${token}`);
            this.staticResourceService.setHeader('authorization', `Bearer ${token}`);
        }
    }

    setPageId(page) {
        this.staticResourceService.setQueryParameter('pageId', page.getId());
    }

    async getOrCreateSearchPage(name, {verbosity} = {}) {
        let pages, page;

        try {
            pages = await this.platformPageService.find({name});
        } catch(e) {
            if (HttpStatus.NOT_FOUND !== e.statusCode) {
                throw e;
            }

            if (verbosity) {
                this.logger.info("No pages were found with the name, attempting to create");
            }

            try {
                page = await this.platformPageService.create({
                    name,
                    title: name,
                });
            } catch(e) {
                throw e;
            }

            try {
                await this.searchPageService.register(name);
            } catch(e) {
                throw e;
            }

            return page;
        }

        return pages.getFirst();
    }

    getSandboxContents(path, name) {
        let page = this.sandboxService.getPage(path, name);
        return this.htmlParser.getElementContents(page, 'body');
    }

    getSandboxScripts() {
        return this.sandboxService.getJavascript();
    }

    getSandboxStyles() {
        return this.sandboxService.getCss();
    }

    async updateHtml(page, html) {
        page.setHtml(html);

        try {
            await this.platformPageService.update(page);
        } catch(e) {
            throw e;
        }
    }

    async upsertOrRemoveStaticResource(type, name, inlineContent, {verbosity}) {
        let resource;

        if (verbosity) {
            this.logger.info(`Creating static resources of type: ${type}`);
        }

        try {
            resource = await this.staticResourceService.update(type, {name, inlineContent});
        } catch(e) {
            if (HttpStatus.NOT_FOUND === e.statusCode) {
                if (verbosity) {
                    this.logger.info("The static resource did not exist so it will be created now")
                }

                if (!inlineContent) {
                    return;
                }

                try {
                    resource = await this.staticResourceService.create(type, {name, inlineContent});
                } catch(e) {
                    throw e;
                }

                return;
            }

            if (HttpStatus.BAD_REQUEST === e.statusCode && e.message.includes('contains no `url` or `inlineContent`')) {
                if (verbosity) {
                    this.logger.info("The static resource is empty and will be removed")
                }

                try {
                    await this.staticResourceService.delete(type, name);
                } catch(e) {
                    throw e;
                }

                return;
            }

            throw e;            
        }

        return resource;
    }
}