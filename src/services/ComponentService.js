import { InvalidComponentTypeError, InvalidInitializationStrategyError } from "../errors";

export default class ComponentService {
    constructor(componentFactory, indexFactory, fileProvider, options = {}) {
        this.componentFactory = componentFactory;
        this.indexFactory = indexFactory;
        this.fileProvider = fileProvider;
        this.options = options;
    }

    create(name, type, options = {}) {
        const { types = [], defaultInitStrategy, initStrategies = []} = this.options;

        if (!(types.includes(type))) {
            throw new InvalidComponentTypeError(type, types)
        }

        let { initStrategy = defaultInitStrategy } = options;

        if (!(initStrategies.includes(initStrategy))) {
            throw new InvalidInitializationStrategyError(initStrategy, initStrategies);
        }

        const {path} = options;

        const component = this.componentFactory.create(name, type, initStrategy);
        const index = this.indexFactory.create(component, type);

        this.save(path, component);
        this.save(path, index, true);
    }

    save(path, component, shouldAppend) {
        this.fileProvider.write(path, component.getName(), component.getCode(), component.getExtension(), {shouldAppend});
    }
}