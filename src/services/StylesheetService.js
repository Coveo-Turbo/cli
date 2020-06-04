import { InvalidComponentTypeError, InvalidInitializationStrategyError } from "../errors";

export default class StylesheetService {
    constructor(stylesheetFactory, indexFactory, fileProvider, options = {}) {
        this.stylesheetFactory = stylesheetFactory;
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

        const component = this.stylesheetFactory.create(name, type);
        const index = this.indexFactory.create(component, type);

        this.save(path, component);
        this.save(path, index, true);
    }

    save(path, component, shouldAppend) {
        this.fileProvider.write(path, component.getName(), component.getCode(), component.getExtension(), {shouldAppend});
    }
}