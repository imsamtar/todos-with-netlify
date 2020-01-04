import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const app = express();
app.use(
	compression({ threshold: 0 }),
	express.static('static'),
	express.json(),
	sapper.middleware()
)
const server = app.listen(PORT, err => {
	if (err) console.log('error', err);
});
