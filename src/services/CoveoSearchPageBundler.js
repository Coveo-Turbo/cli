export default class CoveoSearchPageBundler {
    constructor(compiler, clientPageUpdater) {
        this.compiler = compiler;
        this.clientPageUpdater = clientPageUpdater;
    }

    bundle(pageName, options = {}) {
        const {
            cssExclusions = [],
            jsExclusions = [],
            cssPath,
            jsPath,
            htmlFilePath,
            pagesFilePath,
            startDelimeter,
            endDelimeter,
        } = options;

        const cssBlocks = this.compiler.getAssets(cssPath, cssExclusions).map(asset => this.compiler.buildCSS(asset));
        const jsBlocks = this.compiler.getAssets(jsPath, jsExclusions).map(asset => this.compiler.buildJS(asset));

        const widget = this.compiler.getWidget(htmlFilePath, {startDelimeter, endDelimeter});

        const coveoPage = this.compiler.assemble(widget, [...cssBlocks, ...jsBlocks]);

        this.clientPageUpdater.updatePage(pageName, coveoPage, {pagesFilePath});
    }
}