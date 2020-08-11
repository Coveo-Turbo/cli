export default class TranslationAlreadyExistsError extends Error {
    constructor(word, value) {
        super(`The translation "${value}" already exists for this word: ${word}`)
    }
}