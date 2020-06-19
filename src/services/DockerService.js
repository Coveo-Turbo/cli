import Path from 'path';

export default class DockerService {
    constructor(fileProvider) {
        this.fileProvider = fileProvider;
    }

    create() {
        this.copy();
    }

    copy() {
        this.fileProvider.copy(Path.resolve(__dirname, `../../templates/docker/docker-compose.yml`), `./docker-compose.yml`);
    }
}