const STYLES_TYPE_SASS = 'sass';
const STYLES_TYPE_VANILLA = 'vanilla';

const settings = {
    types: [STYLES_TYPE_SASS, STYLES_TYPE_VANILLA],
    defaultType: STYLES_TYPE_SASS,
    path: 'src/stylesheets',
    destination: 'dist/css',
    defaultWithStyles: false,
};

export default settings;