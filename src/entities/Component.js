import CodeBlock from "./CodeBlock";

export default class Component extends CodeBlock {
    installed = false;
    exportAsAlias = false;

    isInstalled() {
        return this.installed;
    }

    setInstalled(installed) {
        this.installed = installed;
        return this;
    }

    getAlias() {
        return this.alias;
    }

    setAlias(alias) {
        this.alias = alias;
        return this;
    }
}