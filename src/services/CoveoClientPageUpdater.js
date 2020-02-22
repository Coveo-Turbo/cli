import fs from 'fs';

export default class CoveoClientPageUpdater {
    openFile(filePath) {
        const contents = fs.readFileSync(filePath).toString();
        return JSON.parse(contents);
    }

    writeFile(filePath, contents) {
        fs.writeFileSync(filePath, JSON.stringify(contents, null, 2));
    }

    updatePage(pageName, contents, {pagesFilePath}) {
        let pages = this.openFile(pagesFilePath);

        let pageIndex = pages.findIndex(({name}) => pageName === name);

        if (isNaN(pageIndex)) {
            throw new Error(`Page ${pageName} doesn't exist`);
        }

        pages[pageIndex].html = contents;

        this.writeFile(pagesFilePath, pages);     
    }
}