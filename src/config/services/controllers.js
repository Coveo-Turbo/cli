import {
    MainController,
} from '../../controllers';

export default {
    "controller.main": {
        "class": MainController,
        "constructor": [
            {"type": "service", "key": "router"},
            {"type": "service", "key": "resolver.sandbox"},
        ],
        "functions": []
    },
};