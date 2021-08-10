if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

app.use('/', indexRouter);

//? Mongoose Connection
mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => {
// 		app.listen(process.env.PORT || 5000, () =>
// 			console.log(`Listening In Port: ${process.env.PORT}`)
// 		);
		console.log('Connected To Database');
	})
	.catch((err) => console.log(err));

app.listen(process.env.PORT || 3000)
