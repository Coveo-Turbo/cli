import {Controller} from 'tramway-core-router'; 
import express from 'express';
import Path from 'path';

export default class MainController extends Controller {
    constructor(router, sandboxPathResolver) {
        super(router);
        this.sandboxPathResolver = sandboxPathResolver;
    }

    async index(req, res, next) {
        const sandboxPath = this.sandboxPathResolver.get('path');
        return express.static(Path.resolve(sandboxPath))(req, res, next);
    }

    async credentials(req, res, next) {
        const orgId = this.sandboxPathResolver.get('org-id');
        const token = this.sandboxPathResolver.get('token');
        const restUri = this.sandboxPathResolver.get('rest-uri');
        const searchHub = this.sandboxPathResolver.get('search-hub');
        const searchUrl = this.sandboxPathResolver.get('search-url');

        const code = `
            var demoConfig = {
                orgId: "${orgId}",
                token: "${token}",
                restUri: "${restUri}",
                searchHub: "${searchHub}",
                searchUrl: "${searchUrl}"
            };
        `

        return res.header('content-type', 'text/javascript').send(code);
    }

    async init(req, res, next) {
        const orgId = this.sandboxPathResolver.get('org-id');
        const token = this.sandboxPathResolver.get('token');
        const restUri = this.sandboxPathResolver.get('rest-uri');

        let code;

        if (orgId && token) {
            code = `
                document.addEventListener('DOMContentLoaded', function () {
                    Coveo.SearchEndpoint.configureCloudV2Endpoint('${orgId}', '${token}', '${restUri}');
                });
            `
        } else {
            code = `
                document.addEventListener('DOMContentLoaded', function () {
                    console.warn("No orgId or token were found in your environment or in the startup of the sandbox. Falling back to demo configuration");
                    Coveo.SearchEndpoint.configureSampleEndpointV2();
                });
            `
        }

        return res.header('content-type', 'text/javascript').send(code);
    }
}