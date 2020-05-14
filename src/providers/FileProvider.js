import fs from 'fs';
import mkdirp from 'mkdirp';
const { COPYFILE_EXCL } = fs.constants;

export default class FileProvider {
    read(dir) {
        const buffer = fs.readFileSync(dir);
        return buffer.toString();
    }

    write(dir, fileName, content, ext) {
        try {
            fs.writeFileSync(`${dir ? `${dir}/`: ''}${fileName}${ext ? `.${ext}` : ''}`, content);
        } catch (e) {
            if (e.message.includes('no such file or directory')) {
                mkdirp.sync(dir);
                return this.write(dir, fileName, content, ext);
            }

            throw e;
        }
    }

    copy(source, destination, overwrite = false) {
        if (overwrite) {
            fs.copyFileSync(source, destination);
            return;
        }

        fs.copyFileSync(source, destination, COPYFILE_EXCL);
    }
}