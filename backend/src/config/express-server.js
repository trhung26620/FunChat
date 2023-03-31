const configExpressServer = (app) => {
    // app.set('view engine', 'ejs');
    app.set('views', './src/view');
    app.set('x-powered-by', false);
    // app.use(express.static('../src/public/'));
}
module.exports = configExpressServer;