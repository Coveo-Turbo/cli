import fs from 'fs';
import path from 'path';

export default class CoveoSearchPageCompiler {
    constructor(options = {}) {
        this.options = options;
    }

    getWidget(filePath, options = {}) {
        let {widgetStartDelimeter, widgetEndDelimeter} = this.options || {};
        
        widgetStartDelimeter = options.startDelimeter || widgetStartDelimeter;
        widgetEndDelimeter = options.endDelimeter || widgetEndDelimeter;

        const contents = fs.readFileSync(filePath).toString();
        
        const start = contents.indexOf(widgetStartDelimeter) + widgetStartDelimeter.length;
        const end = contents.indexOf(widgetEndDelimeter);

        return contents.substring(start, end).trim();
    }

    getAsset(filePath) {
        return fs.readFileSync(filePath).toString()
    }

    getAssets(directory, inclusions = [], exceptions = []) {
        let fileNames = fs.readdirSync(directory);

        if (exceptions.length) {
            fileNames = fileNames.filter(fileName => !exceptions.includes(fileName));
        }

        if (inclusions.length) {
            fileNames = fileNames.filter(fileName => inclusions.includes(fileName));
        }

        return fileNames.map(fileName => {
            const filePath = path.join(directory, fileName);

            if (fs.lstatSync(filePath).isDirectory()) {
                return this.getAssets(filePath);
            }

            return this.getAsset(filePath);
        });
    }

    buildCSS(asset) {
        return `<style>${asset}</style>`;
    }

    buildJS(asset) {
        return `<script>${asset}</script>`
    }

    assemble(widget, assets = []) {
        return widget + assets.join('');
    }

    minify(html) {
        return html.replace(/\n|\t/g, ' ');
    }
}