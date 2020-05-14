import express from 'express';

const app = express();
app.use('/components/:name.js', (req, res, next) => express.static(`node_modules/@coveops/${req.params.name}/dist/index.js`)(req, res, next))
app.use('/component.js', express.static('dist/index.js'));
export default app;