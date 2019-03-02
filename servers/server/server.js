import express from 'express';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import cors from 'cors';
import Config from './config';
import { authenticate, authError } from './middleware';
import logger from 'morgan';
import multer from 'multer';


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
		console.log('req.body')
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
	res.json({
		status: 200,
		message: 'succcesful1111',
	});
});

app.listen(port, () => {
	console.log('Isomorphic JWT login ' + port);
});
