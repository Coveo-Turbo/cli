import express from 'express';

const app = express();
app.use('/components/:name.:extension', (req, res, next) => express.static(`node_modules/@coveops/${req.params.name}/dist/${req.params.extension == 'css' ? `css/index.css` : 'index.js'}`)(req, res, next))
app.use('/component.:extension', (req, res, next) => express.static(`dist/${req.params.extension == 'css' ? `css/index.css` : 'index.js'}`)(req, res, next));
app.use('/locales/:name.js', (req, res, next) => express.static(`dist/locales/${req.params.name}.js`)(req, res, next));
export default app;