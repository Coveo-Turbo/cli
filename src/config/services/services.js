import {
    CoveoSearchPageCompiler,
    CoveoClientPageUpdater,
    CoveoSearchPageBundler,
    ComponentService,
    TemplateLoader,
    PascalCaseNamingStrategy,
    CamelCaseNamingStrategy,
    ParamCaseNamingStrategy,
    BuildService,
    ProjectService,
    InstallService,
    SandboxService,
    StylesheetService,
    ReadmeService,
    DockerService,
    PlatformPageService,
    DeployService,
    SearchPageService,
    HtmlParser,
    PlatformPageStaticResourceService,
    LocalesService,
    LocalesParser,
    TranslationService,
    PipelineService,
    ConditionService,
    IndexService,
    ComponentInstallationService,
} from '../../services';

export default {
    "service.coveosearchpagecompiler": {
        "class": CoveoSearchPageCompiler,
        "constructor": [
            {"type": "parameter", "key": "searchPageCompiler"},
        ],
    },
    "service.coveoclientpageupdater": {
        "class": CoveoClientPageUpdater,
        "constructor": [],
    },
    "service.coveosearchpagebundler": {
        "class": CoveoSearchPageBundler,
        "constructor": [
            {"type": "service", "key": "service.coveosearchpagecompiler"},
            {"type": "service", "key": "service.coveoclientpageupdater"},
        ],
    },
    "service.component": {
        "class": ComponentService,
        "constructor": [
            {"type": "service", "key": "factory.component"},
            {"type": "service", "key": "factory.index:scripts"},
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "component"},
        ],
    },
    "service.index": {
        "class": IndexService,
        "constructor": [
            {"type": "service", "key": "factory.index:scripts"},
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "component"},
        ],
    },
    "service.templateloader:scripts": {
        "class": TemplateLoader,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "service", "key": "resolver.template:scripts"},
            '../../templates/components/scripts',
        ],
    },
    "service.templateloader:readme": {
        "class": TemplateLoader,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "service", "key": "resolver.template:readme"},
            '../../templates/readme',
        ],
    },
    "service.indexloader:scripts": {
        "class": TemplateLoader,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "service", "key": "resolver.template:scripts"},
            '../../templates/index/scripts',
        ],
    },
    "service.templateloader:styles": {
        "class": TemplateLoader,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "service", "key": "resolver.template:styles"},
            '../../templates/components/styles',
        ],
    },
    "service.indexloader:styles": {
        "class": TemplateLoader,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "service", "key": "resolver.template:styles"},
            '../../templates/index/styles',
        ],
    },
    "service.indexloader:component-snippets": {
        "class": TemplateLoader,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "service", "key": "resolver.component-snippets"},
            '../../templates/component-snippets',
        ],
    },
    "service.naming.pascalcase": {
        "class": PascalCaseNamingStrategy,
        "constructor": [],
    },
    "service.naming.camelcase": {
        "class": CamelCaseNamingStrategy,
        "constructor": [],
    },
    "service.naming.paramcase": {
        "class": ParamCaseNamingStrategy,
        "constructor": [],
    },
    "service.build": {
        "class": BuildService,
        "constructor": [
            {"type": "service", "key": "factory.webpackconfig"},
            {"type": "service", "key": "logger"},
            {"type": "parameter", "key": "component"},
        ],
    },
    "service.project": {
        "class": ProjectService,
        "constructor": [
            {"type": "service", "key": "resolver.basefiles"},
            {"type": "service", "key": "provider.file"},
            {"type": "service", "key": "resolver.libraries"},
            {"type": "service", "key": "service.install"},
            {"type": "service", "key": "service.naming.paramcase"},
        ],
    },
    "service.install": {
        "class": InstallService,
        "constructor": [],
    },
    "service.sandbox": {
        "class": SandboxService,
        "constructor": [
            {"type": "service", "key": "resolver.pagelayout"},
            {"type": "service", "key": "provider.file"},
        ],
    },
    "service.stylesheet": {
        "class": StylesheetService,
        "constructor": [
            {"type": "service", "key": "factory.stylesheet"},
            {"type": "service", "key": "factory.index:styles"},
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "stylesheet"},
        ],
    },
    "service.readme": {
        "class": ReadmeService,
        "constructor": [
            {"type": "service", "key": "factory.readme"},
            {"type": "service", "key": "provider.file"},
        ],
    },
    "service.docker": {
        "class": DockerService,
        "constructor": [
            {"type": "service", "key": "provider.file"},
        ],
    },
    "service.platformpage": {
        "class": PlatformPageService,
        "constructor": [
            {"type": "service", "key": "repository.platformpage"}
        ],
        "functions": []
    },
    "service.searchpage": {
        "class": SearchPageService,
        "constructor": [
            {"type": "service", "key": "repository.searchpage"}
        ],
        "functions": []
    },
    "service.deploy": {
        "class": DeployService,
        "constructor": [
            {"type": "service", "key": "service.platformpage"},
            {"type": "service", "key": "service.searchpage"},
            {"type": "service", "key": "service.platformpagestaticresource"},
            {"type": "service", "key": "service.sandbox"},
            {"type": "service", "key": "service.htmlparser"},
            {"type": "service", "key": "logger"},
        ]
    },
    "service.htmlparser": {
        "class": HtmlParser,
        "constructor": []
    },
    "service.platformpagestaticresource": {
        "class": PlatformPageStaticResourceService,
        "constructor": [
            {"type": "service", "key": "repository.platformpagestaticresource"}
        ],
        "functions": []
    },
    "service.locales": {
        "class": LocalesService,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "service", "key": "service.localesparser"},
            {"type": "parameter", "key": "locales"},
        ],
    },
    "service.componentinstallation": {
        "class": ComponentInstallationService,
        "constructor": [
            {"type": "service", "key": "service.install"},
            {"type": "service", "key": "service.index"},
            {"type": "service", "key": "resolver.extension:scripts"},
            {"type": "service", "key": "service.htmlparser"},
            {"type": "service", "key": "service.indexloader:component-snippets"},
            {"type": "service", "key": "service.sandbox"},
            {"type": "parameter", "key": "locales"},
        ],
    },
    "service.localesparser": {
        "class": LocalesParser,
        "constructor": [],
    },
    "service.translation": {
        "class": TranslationService,
        "constructor": [
            {"type": "service", "key": "service.locales"},
            {"type": "service", "key": "service.localesparser"},
        ],
    },
    "service.pipeline": {
        "class": PipelineService,
        "constructor": [
            {"type": "service", "key": "repository.pipeline"},
        ],
    },
    "service.condition": {
        "class": ConditionService,
        "constructor": [
            {"type": "service", "key": "repository.condition"},
            {"type": "service", "key": "factory.condition"},
        ],
    },
}
