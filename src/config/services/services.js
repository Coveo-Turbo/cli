import {
    CoveoSearchPageCompiler,
    CoveoClientPageUpdater,
    CoveoSearchPageBundler,
} from '../../services';

export default {
    "service.coveosearchpagecompiler": {
        "class": CoveoSearchPageCompiler,
        "constructor": [
            {"type": "parameter", "key": "searchPageCompiler"},
        ],
    },
    "service.coveoclientpageupdater": {
        "class": CoveoClientPageUpdater,
        "constructor": [],
    },
    "service.coveosearchpagebundler": {
        "class": CoveoSearchPageBundler,
        "constructor": [
            {"type": "service", "key": "service.coveosearchpagecompiler"},
            {"type": "service", "key": "service.coveoclientpageupdater"},
        ],
    }
}
