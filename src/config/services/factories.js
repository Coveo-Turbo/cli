import {
    ComponentFactory,
    IndexFactory,
} from '../../factories';

export default {
    "factory.component": {
        "class": ComponentFactory,
        "constructor": [
            {"type": "service", "key": "service.templateloader"},
            {"type": "service", "key": "resolver.name"},
            {"type": "service", "key": "resolver.extension"},
        ],
    },
    "factory.index": {
        "class": IndexFactory,
        "constructor": [
            {"type": "service", "key": "service.indexloader"},
        ],
    },
}
