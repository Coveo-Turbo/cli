import Path from 'path';

export default class ProjectService {
    constructor(filesResolver, fileProvider, librariesResolver, installService, projectNameFormatter) {
        this.filesResolver = filesResolver;
        this.fileProvider = fileProvider;
        this.librariesResolver = librariesResolver;
        this.installService = installService;
        this.projectNameFormatter = projectNameFormatter;
    }

    async create(name, type, {description, packageName, logger}) {
        await this.updatePackageJson(name, type, packageName, description);
        this.addBaseFiles(type, {logger});
        await this.installBasePackages(type);
    }
    
    addBaseFiles(type, {logger}) {
        const files = this.filesResolver.get(type);
        files.forEach(file => this.copy(file, {logger}));
    }

    copy(file, {logger}) {
        try {
            this.fileProvider.copy(Path.resolve(__dirname, `../../templates/base/${file}.txt`), `./${file}`);
        } catch(e) {
            if (logger) {
                logger.error(e.stack);
            }
        }
    }

    async installBasePackages(type) {
        const packages = this.librariesResolver.get(type);
        await this.installService.install(...packages);
        await this.installSelf();
    }

    async installSelf() {
        let packageJson = this.fileProvider.read(Path.resolve(__dirname, '../../package.json'));
        packageJson = JSON.parse(packageJson);
        await this.installService.installDev(packageJson.name);
    }

    getPackageJsonContents() {
        return this.fileProvider.read('./package.json');
    }

    async updatePackageJson(name, type, packageName, description) {
        let packageJson;

        try {
            packageJson = this.getPackageJsonContents();
        } catch (e) {
            await this.installService.init();
            packageJson = this.getPackageJsonContents();
        }

        packageJson = JSON.parse(packageJson);

        packageJson.main = "dist/index.js";
        packageJson.license = "Apache-2.0";

        if ('typescript' === type) {
            packageJson.types = "dist/index.d.ts";
        }

        packageJson.files = [
            "dist"
        ];

        packageJson.name = this.preparePackageName(name, packageName);

        if (description && !packageJson.description) {
            packageJson.description = description;
        }
        
        packageJson.scripts = {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": `coveops build ${name} --template ${type}`,
            "watch": `coveops build ${name} --template ${type} --watch`,
            "serve": `coveops serve`,
            "precompile": "npm run build"
        }

        packageJson = JSON.stringify(packageJson, null, 4);

        this.fileProvider.write('./', 'package.json', packageJson);
    }

    preparePackageName(name, packageName) {
        if (packageName) {
            return this.projectNameFormatter.formatName(packageName);
        }

        name = this.projectNameFormatter.formatName(name);
        return `@coveops/${name}`;
    }
}