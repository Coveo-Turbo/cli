import {
    ComponentFactory,
    IndexFactory,
    WebpackConfigurationFactory,
} from '../../factories';

export default {
    "factory.component": {
        "class": ComponentFactory,
        "constructor": [
            {"type": "service", "key": "service.templateloader"},
            {"type": "service", "key": "resolver.name"},
            {"type": "service", "key": "resolver.extension:scripts"},
            {"type": "service", "key": "resolver.initstrategy"},
        ],
    },
    "factory.index": {
        "class": IndexFactory,
        "constructor": [
            {"type": "service", "key": "service.indexloader"},
        ],
    },
    "factory.webpackconfig": {
        "class": WebpackConfigurationFactory,
        "constructor": [
            {"type": "service", "key": "resolver.name"},
            {"type": "service", "key": "resolver.extension:scripts"},
            {"type": "service", "key": "resolver.extension:styles"},
            {"type": "parameter", "key": "webpack"},
        ],
    },
}
