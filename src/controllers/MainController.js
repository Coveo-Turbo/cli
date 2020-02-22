import {Controller} from 'tramway-core-router'; 

export default class MainController extends Controller {
    async index(req, res, next) {
        return res.send('Welcome to TramwayJS, this is the index action');
    }
}