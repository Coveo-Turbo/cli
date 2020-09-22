
export default class HtmlParser {
    getElementContents(data, element) {
        const start = data.indexOf(`<${element}>`) + `<${element}>`.length;
        const end = data.indexOf(`</${element}>`);

        return data.substring(start, end);
    }

    appendCode(data, element, code, indentation = '') {
        code = code.replace(/\n/g, `\n${indentation}`);
        return data.replace(element, `${element}\n${indentation}${code}`);
    }
}