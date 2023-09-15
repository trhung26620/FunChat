// import { getUser, getUserPromises, getMessages, saveMessageService } from '../service/testService'

// const testBackground = (req, res) => {
//     console.log(req.query.Abc)
//     return res.status(200).render('test.ejs', { test: 'Hello world' });
// }

// const testPostData = (req, res) => {
//     console.log(req.body);
//     return res.status(200).render('test.ejs', { test: 'Hello world' });
// }

// const testParamEndpoint = async (req, res) => {
//     // let data = await getUser(req.params.id);
//     let data = await getUserPromises(req.params.id);
//     console.log("debug 1");
//     return res.status(200).json(data);
// }

// const testFile = (req, res) => {
//     res.sendFile('F:/Pentest Document/Development/Node.js/Practice/src/public/image/myImage.jpg');
//     // res.sendFile('F:/Pentest Document/Development/Node.js/Practice/src/view/test.ejs')
// }

// const socketIOController = async (req, res) => {
//     return res.status(200).render('socket.ejs');
// }

// const getMessagesController = async (req, res) => {
//     let messages = await getMessages();
//     return res.send(messages);
// }

// const postMessageController = async (req, res) => {
//     await saveMessageService(req.body, req.app.get('socketio'));
//     return res.status(200);
// }

// module.exports = {
//     testBackground, testPostData, testParamEndpoint, testFile,
//     socketIOController, getMessagesController, postMessageController
// }