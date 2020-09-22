const coveo = {
    name: process.env.COVEO_SANDBOX_NAME || process.env.COVEO_PAGE_NAME || 'index',
    restUri: process.env.COVEO_REST_URI || 'https://platform.cloud.coveo.com/rest/search',
    orgId: process.env.COVEO_ORG_ID,
    path: process.env.COVEO_SANDBOX_PATH || process.env.COVEO_PAGE_PATH || 'pages',
    token: process.env.COVEO_TOKEN,
    searchHub: process.env.COVEO_SEARCH_HUB,
    searchUrl: process.env.COVEO_SEARCH_URL,
}

export default coveo;