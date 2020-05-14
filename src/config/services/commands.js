import {
    UpdateCoveoSearchPageCommand,
    CreateComponentCommand,
    BuildCommand,
    CreateProjectCommand,
    ServerCommand,
    CreateSandboxCommand,
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
            {"type": "service", "key": "service.component"},
            {"type": "service", "key": "logger"},
            {"type": "parameter", "key": "component"},
        ],
    },
    "command.build": {
        "class": BuildCommand,
        "constructor": [
            {"type": "service", "key": "service.build"},
            {"type": "service", "key": "logger"},
            {"type": "parameter", "key": "component"},
        ],
    },
    "command.createproject": {
        "class": CreateProjectCommand,
        "constructor": [
            {"type": "service", "key": "service.project"},
            {"type": "service", "key": "service.component"},
            {"type": "service", "key": "logger"},
            {"type": "parameter", "key": "component"},
        ],
    },
    "command.server": {
        "class": ServerCommand,
        "constructor": [
            {"type": "service", "key": "app"},
            {"type": "service", "key": "logger"},
            {"type": "service", "key": "resolver.sandbox"},
            {"type": "parameter", "key": "coveo"},
        ],
    },
    "command.sandbox": {
        "class": CreateSandboxCommand,
        "constructor": [
            {"type": "service", "key": "service.sandbox"},
            {"type": "service", "key": "logger"},
            {"type": "parameter", "key": "coveo"},
        ],
    },
}
