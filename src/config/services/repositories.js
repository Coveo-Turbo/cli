import {
    PlatformPageRepository,
    SearchPageRepository,
    PlatformPageStaticResourceRepository,
    PipelineRepository,
    ConditionRepository,
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
    "repository.pipeline": {
        "class": PipelineRepository,
        "constructor": [
            {"type": "service", "key": "provider.api:pipelines"},
            {"type": "service", "key": "factory.pipeline"}
        ],
        "functions": []
    },
    "repository.condition": {
        "class": ConditionRepository,
        "constructor": [
            {"type": "service", "key": "provider.api:conditions"},
            {"type": "service", "key": "factory.condition"}
        ],
        "functions": []
    },
};