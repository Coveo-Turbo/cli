import {
    UpdateCoveoSearchPageCommand,
} from '../../commands';

export default {
    "command.updatecoveosearchpage": {
        "class": UpdateCoveoSearchPageCommand,
        "constructor": [
            {"type": "service", "key": "service.coveosearchpagebundler"},
            {"type": "service", "key": "logger"},
        ],
    },
}
