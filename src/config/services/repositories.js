import {
    PlatformPageRepository,
    SearchPageRepository,
    PlatformPageStaticResourceRepository,
} from '../../repositories';

export default {
    "repository.platformpage": {
        "class": PlatformPageRepository,
        "constructor": [
            {"type": "service", "key": "provider.api:pages"},
            {"type": "service", "key": "factory.platformpage"}
        ],
        "functions": []
    },
    "repository.searchpage": {
        "class": SearchPageRepository,
        "constructor": [
            {"type": "service", "key": "provider.api:searchpages"},
            {"type": "service", "key": "factory.searchpage"}
        ],
        "functions": []
    },
    "repository.platformpagestaticresource": {
        "class": PlatformPageStaticResourceRepository,
        "constructor": [
            {"type": "service", "key": "provider.api:pageheader"},
            {"type": "service", "key": "factory.platformpagestaticresource"}
        ],
        "functions": []
    },
};