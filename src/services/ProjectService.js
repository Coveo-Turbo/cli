import Path from 'path';

export default class ProjectService {
    constructor(filesResolver, fileProvider, librariesResolver, installService) {
        this.filesResolver = filesResolver;
        this.fileProvider = fileProvider;
        this.librariesResolver = librariesResolver;
        this.installService = installService;
    }

    async create(name, type, {logger}) {
        this.updatePackageJson(name, type);
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
        return await this.installService.install(...packages);
    }

    updatePackageJson(name, type) {
        let packageJson = this.fileProvider.read('./package.json');
        packageJson = JSON.parse(packageJson);

        packageJson.main = "dist/index.js";
        packageJson.license = "Apache-2.0";

        if ('typescript' === type) {
            packageJson.types = "dist/index.d.ts";
        }

        packageJson.files = [
            "dist"
        ];
        
        packageJson.scripts = {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": `coveops build ${name} --template ${type}`,
            "serve": `coveops serve`,
            "precompile": "npm run build"
        }

        packageJson = JSON.stringify(packageJson, null, 4);

        this.fileProvider.write('./', 'package.json', packageJson);
    }
}