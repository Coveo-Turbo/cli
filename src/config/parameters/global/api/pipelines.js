export default {
    "host": new URL(process.env.COVEO_REST_URI || 'https://platform.cloud.coveo.com/rest/search').host,
    "path": "rest/search/v1/admin/pipelines",
    "port": 443,
    "headers": {
        "content-type": "application/json",
        "authorization": `Bearer ${process.env.COVEO_TOKEN}`
    },
    "query": {
        "organizationId": process.env.COVEO_ORG_ID,
    }
}