export default {
    "host": new URL(process.env.COVEO_REST_URI || 'https://platform.cloud.coveo.com/rest/search').host,
    "path": "rest/organizations/:orgId/pages/:pageId/header/:type",
    "port": 443,
    "headers": {
        "content-type": "application/json",
        "authorization": `Bearer ${process.env.COVEO_TOKEN}`
    },
    "params": {
        "orgId": process.env.COVEO_ORG_ID,
    }
}