import {
    ComponentFactory,
    IndexFactory,
    WebpackConfigurationFactory,
    StylesheetFactory,
    ReadmeFactory,
    PlatformPageFactory,
    SearchPageFactory,
    PlatformPageStaticResourceFactory,
} from '../../factories';

export default {
    "factory.component": {
        "class": ComponentFactory,
        "constructor": [
            {"type": "service", "key": "service.templateloader:scripts"},
            {"type": "service", "key": "resolver.name:scripts"},
            {"type": "service", "key": "resolver.extension:scripts"},
            {"type": "service", "key": "resolver.initstrategy"},
        ],
    },
    "factory.index:scripts": {
        "class": IndexFactory,
        "constructor": [
            {"type": "service", "key": "service.indexloader:scripts"},
        ],
    },
    "factory.index:styles": {
        "class": IndexFactory,
        "constructor": [
            {"type": "service", "key": "service.indexloader:styles"},
        ],
    },
    "factory.webpackconfig": {
        "class": WebpackConfigurationFactory,
        "constructor": [
            {"type": "service", "key": "resolver.name:scripts"},
            {"type": "service", "key": "resolver.extension:scripts"},
            {"type": "service", "key": "resolver.extension:styles"},
            {"type": "service", "key": "provider.file"},
            {"type": "service", "key": "logger"},
            {"type": "parameter", "key": "webpack"},
        ],
    },
    "factory.stylesheet": {
        "class": StylesheetFactory,
        "constructor": [
            {"type": "service", "key": "service.templateloader:styles"},
            {"type": "service", "key": "resolver.name:styles"},
            {"type": "service", "key": "resolver.extension:styles"},
        ],
    },
    "factory.readme": {
        "class": ReadmeFactory,
        "constructor": [
            {"type": "service", "key": "service.templateloader:readme"},
        ],
    },
    "factory.platformpage": {
        "class": PlatformPageFactory,
        "constructor": [],
        "functions": []
    },
    "factory.searchpage": {
        "class": SearchPageFactory,
        "constructor": [],
        "functions": []
    },
    "factory.platformpagestaticresource": {
        "class": PlatformPageStaticResourceFactory,
        "constructor": [],
        "functions": []
    },
}
