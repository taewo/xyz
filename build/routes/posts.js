'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _login = require('./login.js');

var _db_test = require('./db_test.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import mysql from 'mysql';
// import './login.js';

var router = _express2.default.Router();

// test code.
router.get('/codestates', _login.test);

router.post('/code', _login.postcall); // post 는 url 당연히 안먹지.

router.get('/codes', _login.getcall);

// mysql과 연결
var connection = _mysql2.default.createConnection({
	host: 'localhost',
	user: 'root',
	password: ''
});

// mysql 연결 에러 체크.
connection.connect(function (err) {
	if (err) {
		console.log('mysql connect error', err);
	}
});

connection.query('use test;', function (err) {
	if (err) {
		console.log(err);
	}
});

var data = {
	'name': 'minho',
	'email': 'naver@naver.com',
	'social': 'g',
	'date': 'next monday'
};

connection.query('insert into xyzUser (name, email, social, token, date) values (' + connection.escape(data['name']) + ',' + connection.escape(data['email']) + ',' + connection.escape(data['social']) + ','
//************ token은 너무 길어서 우선 주석처리
// + connection.escape(data['token']) + ','
+ '111111' + ',' + connection.escape(data['date']) + ');', function (err) {
	if (err) {
		console.log(err);
	}
});

// client에 데이터 뿌리기.
router.get('/retrieveData', function (req, res) {
	console.log('i am server');

	var data = [];
	connection.query('use test;', function (err) {
		if (err) {
			console.log(err);
		}
	});

	connection.query('select * from aaaa;', function (err, rows) {
		if (err) {
			console.log(err);
		}
		// console.log('!@#$%^&*(',rows);
		// var a = JSON.stringify(rows);
		// console.log('aaaa',a);
		// res.write('taewoong taweoong', rows);
		// res.status(200).send('taewoong taweoong',rows);	
		data = rows;
		console.log('in', data);
	});
	console.log('out', data);
	res. /*status(200).*/write(JSON.stringify(data));
});

console.log('!@#$%$#@$%^%$#@!');
// real code.
// Google 로그인.
// fetch call 받는 곳.(token이 없는 첫 방문 유저.)
router.post('/googlenotoken', _login.google_noToken);

// fetch call 받는 곳.(token이 만료된 유저.)
router.post('/googlenewtoken', _login.google_newToken);

// Facebook 로그인.
router.post('/fbnewtoken', _login.facebook_newToken);

router.post('/fbnotoken', _login.facebook_noToken);

router.post('/test_xyzDress', _db_test.test_xyzDress);

router.post('/test_xyzCoordi', _db_test.test_xyzCoordi);

// 아래 작업을 하지 않으면, URL을 직접 입력하고 들어갔을때 
// 클라이언트 사이드 라우팅이 제대로 작동하지 않습니다.
// 클라이언트에서 링크를 클릭해서 들어갔을때만 작동한다.
router.get('*', function (req, res) {
	res.sendFile(_path2.default.resolve(__dirname, '../../client/index.html'));
});

exports.default = router;