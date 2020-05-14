import {
    UpdateCoveoSearchPageCommand,
    CreateComponentCommand,
} from '../../commands';

export default {
    "command.updatecoveosearchpage": {
        "class": UpdateCoveoSearchPageCommand,
        "constructor": [
            {"type": "service", "key": "service.coveosearchpagebundler"},
            {"type": "service", "key": "logger"},
        ],
    },
    "command.createcomponent": {
        "class": CreateComponentCommand,
        "constructor": [
            {"type": "service", "key": "service.components"},
            {"type": "service", "key": "logger"},
            {"type": "parameter", "key": "component"},
        ],
    },
}
