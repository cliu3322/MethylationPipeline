import express from 'express';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import cors from 'cors';
import Config from './config';
import { authenticate, authError } from './middleware';
import logger from 'morgan';
import multer from 'multer';
import fs from 'fs';
const fileUpload = require('express-fileupload');


const { port, secretKey, expiredAfter } = Config;
const app = express();

function doesUserExists(username, password) {
	const user = {
		id: 1,
		username: 'demo@gmail.com',
		password: 'demodemo',
	};
	if (username === user.username && password === user.password) {
		return true;
	}
	return false;
}

app
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
	.use(cors());
app.use(fileUpload());
app.use(logger('dev')); // Log requests to API using morgan

	// Enable CORS from client-side
app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');//well 这不应该是*的  我比较懒  以后在换吧
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/', (req, res) => {
	res.json({ status: 'OK' });
});

app.post('/api/login', (req, res) => {
	const { username, password } = req.body;
	const response = {};
	// You can use DB checking here

	if (doesUserExists(username, password)) {
		response.token = jsonwebtoken.sign(
			{
				expiredAt: new Date().getTime() + expiredAfter,
				username,
				id: 1,
			},
			secretKey
		);
	} else {
		response.error = 'Not found';
	}
	res.json(response);
});
app.use('/api/secret', [authenticate, authError]);
app.post('/api/secret/test', (req, res) => {
	res.json({
		status: 200,
		message: 'succcesful',
	});
});

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
})

// var upload = multer({ storage: storage })

var upload = multer({
	storage: storage,
	onError : function(err, next) {
		console.log('error', err);
		next(err);
	}
});

app.post('/api/uploadfile',upload.array('files[]'), (req, res) => {
	console.log(req.file)
	res.json({
		status: 200,
		message: 'succcesful1111',
	});
});

app.post('/api/uploadfiletypescript1', (req, res, next) => {

  let fastqFile = req.files.file;

	fastqFile.mv(`./uploads/test1.fastq`, function(err) {
		if (err) {
			console.log(err)
			return res.status(500).send(err);
		}

		res.json({file: `public/${req.body.filename}.jpg`});
	});


})

app.post('/api/uploadfiletypescript2', (req, res, next) => {

  let fastqFile = req.files.file;

	fastqFile.mv(`./uploads/test2.fastq`, function(err) {
		if (err) {
			console.log(err)
			return res.status(500).send(err);
		}

		res.json({file: `public/${req.body.filename}.jpg`});
	});


})

app.get('/api/allUploadFiles', (req, res) => {

	fs.readdir('./uploads', (err, files) => {
		res.json({
			status: 200,
			files: files,
		});
	});

});

app.get('/api/trim', (req, res) => {

	fs.readdir('./uploads', (err, files) => {
		res.json({
			status: 200,
			files: files,
		});
	});

});


app.listen(port, () => {
	console.log('Isomorphic JWT login ' + port);
});
