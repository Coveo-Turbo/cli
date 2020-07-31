import {
    FileProvider,
    ApiProvider,
} from '../../providers';

export default {
    "provider.file": {
        "class": FileProvider,
        "constructor": [],
    },
    "provider.api:pages": {
        "class": ApiProvider,
        "constructor": [
            {"type": "parameter", "key": "api.pages"},
        ]
    },
    "provider.api:searchpages": {
        "class": ApiProvider,
        "constructor": [
            {"type": "parameter", "key": "api.searchpages"},
        ]
    },
    "provider.api:pageheader": {
        "class": ApiProvider,
        "constructor": [
            {"type": "parameter", "key": "api.pageheader"},
        ]
    },
}
