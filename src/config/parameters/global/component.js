const TYPE_TYPESCRIPT = 'typescript';
const TYPE_VANILLA = 'vanilla';

const STYLES_TYPE_SASS = 'sass';
const STYLES_TYPE_VANILLA = 'vanilla';

const INIT_STRATEGY_COMPONENT = 'component';
const INIT_STRATEGY_LAZY = 'lazy';
const INIT_STRATEGY_LAZY_DEPENDENT = 'lazy-dependent';

const settings = {
    types: [TYPE_TYPESCRIPT, TYPE_VANILLA],
    defaultType: TYPE_TYPESCRIPT,
    path: 'src',
    destination: 'dist',
    stylesTypes: [STYLES_TYPE_SASS, STYLES_TYPE_VANILLA],
    defaultStylesType: STYLES_TYPE_SASS,
    initStrategies: [INIT_STRATEGY_LAZY, INIT_STRATEGY_LAZY_DEPENDENT, INIT_STRATEGY_COMPONENT],
    defaultInitStrategy: INIT_STRATEGY_LAZY
};

export default settings;