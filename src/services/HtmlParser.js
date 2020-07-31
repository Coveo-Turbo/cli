
export default class HtmlParser {
    getElementContents(data, element) {
        const start = data.indexOf(`<${element}>`) + `<${element}>`.length;
        const end = data.indexOf(`</${element}>`);

        return data.substring(start, end);
    }
}