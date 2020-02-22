import {
    App,
} from 'tramway-core';

import CommandResolver from 'tramway-command';
import DICommandFactory from 'tramway-command-di-factory';

export default {
    "app": {
        "class": App,
        "constructor": [
            {"type": "service", "key": "router"},
            {"type": "parameter", "key": "app"},
            {"type": "parameter", "key": "port"}
        ],
        "functions": [
            {
                "function": "use",
                "args": [
                    {"type": "parameter", "key": "_method"}
                ]
            },
            {
                "function": "use",
                "args": [
                    {"type": "parameter", "key": "xMethod"}
                ]
            },
            {
                "function": "use",
                "args": [
                    {"type": "parameter", "key": "cors"}
                ]
            },
            {
                "function": "use",
                "args": [
                    {"type": "parameter", "key": "json"}
                ]
            },
            {
                "function": "use",
                "args": [
                    {"type": "parameter", "key": "urlEncoding"}
                ]
            },
            {
                "function": "use",
                "args": [
                    {"type": "parameter", "key": "cookieParser"}
                ]
            },
            {
                "function": "addLogger",
                "args": [
                    {"type": "service", "key": "logger.middleware"}
                ]
            },
        ]
    },
    "command": {
        "class": CommandResolver,
        "constructor": [
            {"type": "parameter", "key": "commands"},
            {"type": "service", "key": "factory.command"},
        ],
    },
    "factory.command": {
        "class": DICommandFactory,
        "constructor": [
            {"type": "parameter", "key": "commands"},
        ]
    }

};