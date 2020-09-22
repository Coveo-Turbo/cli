import { InvalidComponentTypeError } from "../errors";

export default class IndexService {
    constructor(factory, fileProvider, options = {}) {
        this.factory = factory;
        this.fileProvider = fileProvider;
        this.options = options;
    }

    create(component, type, options = {}) {
        const { types = []} = this.options;

        if (!(types.includes(type))) {
            throw new InvalidComponentTypeError(type, types)
        }

        const {path} = options;
        const index = this.factory.create(component, type);

        this.save(path, index, true);
    }

    save(path, component, shouldAppend) {
        this.fileProvider.write(path, component.getName(), component.getCode(), component.getExtension(), {shouldAppend});
    }
}