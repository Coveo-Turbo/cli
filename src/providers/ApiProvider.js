import RestApiProvider from 'tramway-connection-rest-api';
import https from 'https';

export default class ApiProvider extends RestApiProvider {
    constructor(options) {
        super(options);
        //Allows for additional properties to be saved since the initial API is restrictive
        this.params = options;
    }

    prepareOptions(opts, method, req) {
        let options = super.prepareOptions(opts, method, req);

        let path = this.preparePath({...this.params.params || {}, ...req.params || {}}, {...this.params.query || {}, ...req.query || {}});
        options.setPath(path);
        
        return options;
    }

    setParam(param, value) {
        this.params[param] = value;
        return this;
    }

    setQueryParameter(param, value) {
        this.params.params[param] = value && value.trim();
        return this;
    }

    setHeader(key, value) {
        this.params.headers[key] = value;
        return this;
    }

    async sendRequest(method, req = {}) {
        let options = this.prepareOptions(this.options, method, req);
        let respondAsText = options.shouldRespondAsText();

        return await new Promise((resolve, reject) => {
            let request = https.request(options, res => {
                let response = "";
                
                res.on("data", function(chunk) {
                    response += chunk;
                });
    
                res.on("end", () => {
                    let reply;

                    try {
                        if (respondAsText) {
                            throw new Error('Should not parse as JSON');
                        }

                        reply = JSON.parse(response);
                    } catch(e) {
                        reply = response;
                    }

                    if (!reply && 200 < res.statusCode && 300 > res.statusCode) {
                        return resolve(res.headers);
                    }

                    if (400 <= res.statusCode) {
                        let err = new Error(response);
                        err.statusCode = res.statusCode;
                        err.data = reply;
                        err.requestOptions = options;
                        return reject(err);
                    }

                    resolve(reply);
                });
            });
    
            if (req.body) {
                request.write(JSON.stringify(req.body));
            }
    
            request.on('error', function(err) {
                return reject(err);
            });
    
            request.end();
        });
    }

}