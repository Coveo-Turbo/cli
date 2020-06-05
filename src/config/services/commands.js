import {
    UpdateCoveoSearchPageCommand,
    CreateComponentCommand,
    BuildCommand,
    CreateProjectCommand,
    ServerCommand,
    CreateSandboxCommand,
    CreateStylesheetCommand,
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
            {"type": "service", "key": "service.stylesheet"},
            {"type": "service", "key": "logger"},
            {"type": "parameter", "key": "component"},
            {"type": "parameter", "key": "stylesheet"},
        ],
    },
    "command.build": {
        "class": BuildCommand,
        "constructor": [
            {"type": "service", "key": "service.build"},
            {"type": "service", "key": "logger"},
            {"type": "parameter", "key": "component"},
            {"type": "parameter", "key": "stylesheet"},
        ],
    },
    "command.createproject": {
        "class": CreateProjectCommand,
        "constructor": [
            {"type": "service", "key": "service.project"},
            {"type": "service", "key": "service.component"},
            {"type": "service", "key": "service.stylesheet"},
            {"type": "service", "key": "service.sandbox"},
            {"type": "service", "key": "logger"},
            {"type": "parameter", "key": "component"},
            {"type": "parameter", "key": "stylesheet"},
            {"type": "parameter", "key": "coveo"},
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
    "command.createstylesheet": {
        "class": CreateStylesheetCommand,
        "constructor": [
            {"type": "service", "key": "service.stylesheet"},
            {"type": "service", "key": "logger"},
            {"type": "parameter", "key": "stylesheet"},
        ],
    },
}
