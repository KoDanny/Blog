require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const path = require('path');

const port = 3001;
const buildPath = path.resolve(__dirname, '..', '..', 'frontend', 'build');

const app = express();

app.use(express.static(buildPath));
app.use(cookieParser());
app.use(express.json());
app.use('/', routes);

app.get('/', (req, res) => {
	res.send({ data: 'data-blog' });
});

https: mongoose
	.connect(process.env.DB_CONNECTION_STRING)
	.then(() =>
		app.listen(port, () => console.log(`Server started on port ${port}`))
	);
