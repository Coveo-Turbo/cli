import Path from 'path';

export default class ReadmeService {
    constructor(readmeFactory, fileProvider) {
        this.readmeFactory = readmeFactory;
        this.fileProvider = fileProvider;
    }

    create(name, description) {
        let packageJson = this.fileProvider.read('./package.json');

        packageJson = JSON.parse(packageJson);

        const readme = this.readmeFactory.create(name, packageJson.name, packageJson.description || description);

        this.save(Path.resolve('./'), readme);
    }

    save(path, component, shouldAppend) {
        this.fileProvider.write(path, component.getName(), component.getCode(), component.getExtension(), {shouldAppend});
    }
}