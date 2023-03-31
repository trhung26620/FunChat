import express from 'express';
import {
    testBackground, testPostData, testParamEndpoint, testFile,
    socketIOController, getMessagesController, postMessageController
} from '../controller/test-controller'

const router = express.Router();

const testRoute = (app, io) => {
    router.get('/', (req, res) => {
        res.status(200);
        res.json({ abc: '12345678910' })
    });

    // router.get('/hello', (req, res) => {
    //     res.set('content-type', 'text/html');
    //     res.status(200).send(`<h1>Hello World</h1>`);
    // });

    // router.get('/background', testBackground)
    // router.post('/postData', testPostData)
    // router.get('/testParamEndpoint/:id', testParamEndpoint);
    // router.get('/file', testFile)
    // router.get('/socket', socketIOController)
    // router.get('/messages', getMessagesController)
    // router.post('/messages', postMessageController)
    app.use('/', router);
};
export default testRoute;