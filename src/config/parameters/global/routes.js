const routeValues = [
    {
        "controller": "controller.main",
        "action": "credentials",
        "path": "config.js",
        "methods": ["get"],
    },
    {
        "controller": "controller.main",
        "action": "index",
        "methods": ["get"],
        "arguments": ["name?"]
    },
];

export default routeValues;