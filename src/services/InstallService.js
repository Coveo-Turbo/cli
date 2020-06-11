import { spawn } from 'child_process';

export default class InstallService {
    async install(...packages) {
        return await this.run('npm', 'i', ...packages);
    }

    async installDev(...packages) {
        return await this.run('npm', 'install', '--save-dev', ...packages);
    }

    async init() {
        return await this.run('npm', 'init', '-y');
    }

    async run(command, ...args) {
        return await new Promise((resolve, reject) => {
            let errBuffer = [];

            const shell = spawn(command, args, { shell: 'win32' === process.platform });
            shell.stdout.on('data', data => resolve(data));
            shell.stderr.on('data', data => errBuffer.push(data));
            shell.on('close', code => {
                let data = Buffer.concat(errBuffer).toString('utf8');

                if (code > 0) {
                    return reject({code, data});
                }

                return resolve(data);
            });
        });
    }
}