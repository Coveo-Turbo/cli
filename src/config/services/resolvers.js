import {
    Resolver,
} from '../../services';

export default {
    "resolver.template": {
        "class": Resolver,
        "constructor": [],
        "functions": [
            {
                "function": "add",
                "args": ['vanilla', 'vanilla.txt']
            },
            {
                "function": "add",
                "args": ['typescript', 'typescript.txt']
            },
        ]
    },
    "resolver.extension:scripts": {
        "class": Resolver,
        "constructor": [],
        "functions": [
            {
                "function": "add",
                "args": ['vanilla', 'js']
            },
            {
                "function": "add",
                "args": ['typescript', 'ts']
            },
        ]
    },
    "resolver.extension:styles": {
        "class": Resolver,
        "constructor": [],
        "functions": [
            {
                "function": "add",
                "args": ['vanilla', 'css']
            },
            {
                "function": "add",
                "args": ['sass', 'scss']
            },
        ]
    },
    "resolver.name": {
        "class": Resolver,
        "constructor": [],
        "functions": [
            {
                "function": "add",
                "args": [
                    'vanilla', 
                    {"type": "service", "key": "service.naming.pascalcase"}
                ]
            },
            {
                "function": "add",
                "args": [
                    'typescript', 
                    {"type": "service", "key": "service.naming.pascalcase"}
                ]
            },
        ]
    },
    "resolver.basefiles": {
        "class": Resolver,
        "constructor": [],
        "functions": [
            {
                "function": "add",
                "args": [
                    'vanilla', 
                    {"type": "parameter", "key": "basefiles.vanilla"}
                ]
            },
            {
                "function": "add",
                "args": [
                    'typescript', 
                    {"type": "parameter", "key": "basefiles.typescript"}
                ]
            },
        ]
    },
    "resolver.libraries": {
        "class": Resolver,
        "constructor": [],
        "functions": [
            {
                "function": "add",
                "args": [
                    'vanilla', 
                    {"type": "parameter", "key": "libraries.vanilla"}
                ]
            },
            {
                "function": "add",
                "args": [
                    'typescript', 
                    {"type": "parameter", "key": "libraries.typescript"}
                ]
            },
        ]
    },
    "resolver.sandbox": {
        "class": Resolver,
        "constructor": [],
    },
    "resolver.initstrategy": {
        "class": Resolver,
        "constructor": [],
        "functions": [
            {
                "function": "add",
                "args": ['component', 'component']
            },
            {
                "function": "add",
                "args": ['lazy', 'lazyComponent']
            },
            {
                "function": "add",
                "args": ['lazy-dependent', 'lazyDependentComponent']
            },
        ]
    }
}
