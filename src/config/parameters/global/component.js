const TYPE_TYPESCRIPT = 'typescript';
const TYPE_VANILLA = 'vanilla';

const STYLES_TYPE_SASS = 'sass';
const STYLES_TYPE_VANILLA = 'vanilla';

const settings = {
    types: [TYPE_TYPESCRIPT, TYPE_VANILLA],
    defaultType: TYPE_TYPESCRIPT,
    path: 'src',
    destination: 'dist',
    stylesTypes: [STYLES_TYPE_SASS, STYLES_TYPE_VANILLA],
    defaultStylesType: STYLES_TYPE_SASS,
};

export default settings;