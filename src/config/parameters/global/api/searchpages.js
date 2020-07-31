export default {
    "host": process.env.COVEO_SEARCH_PAGE_HOST || 'search.cloud.coveo.com',
    "path": "pages/:orgId",
    "port": 443,
    "headers": {
        "content-type": "application/json",
        "authorization": `Bearer ${process.env.COVEO_TOKEN}`
    },
    "params": {
        "orgId": process.env.COVEO_ORG_ID,
    },
    "respondAsText": true,
}