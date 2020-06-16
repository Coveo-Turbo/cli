import path from 'path';

export default function injectSwapVar(content, map, meta) {
    if (!this.resourcePath.includes(path.resolve('src/index.'))) {
        return content;
    }

    const swapVarBlock = `
        import { swapVar } from '@coveops/turbo-core';
        swapVar(this);
    `;

    return content + swapVarBlock;
}