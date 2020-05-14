import { InvalidComponentTypeError } from "../errors";

export default class ComponentService {
    constructor(componentFactory, indexFactory, fileProvider, options = {}) {
        this.componentFactory = componentFactory;
        this.indexFactory = indexFactory;
        this.fileProvider = fileProvider;
        this.options = options;
    }

    create(name, type, options = {}) {
        const { types = [] } = this.options;

        if (!(types.includes(type))) {
            throw new InvalidComponentTypeError(type, types)
        }

        const {path} = options;

        const component = this.componentFactory.create(name, type);
        const index = this.indexFactory.create(component, type);

        this.save(path, component);
        this.save(path, index);
    }

    save(path, component) {
        this.fileProvider.write(path, component.getName(), component.getCode(), component.getExtension());
    }
}