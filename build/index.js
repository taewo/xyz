'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _posts = require('./routes/posts');

var _posts2 = _interopRequireDefault(_posts);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 3030;

// fetch의 body에 담긴 data를 받기위해 bodyParser 세팅.
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

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

// test
app.get('/test', function (req, res) {
	res.send('test');
});

// hello
app.get('/hello', function (req, res) {
	return res.send("Can you hear me?");
});

// taewoong
app.get('/taewoong', function (req, res) {
	res.send('taewoong handsome');
});

// fetch call 받는 곳.(token이 없는 첫 방문 유저.)
app.post('/googlenotoken', function (req, res) {
	//	로그인할때 유저정보 받아옴.
	console.log('hello googlenotoken');
	console.log('this is data', req.body);
	console.log('this is typeof data', _typeof(req.body));
	var data = req.body;

	window.localStorage.setItem('taewoong', 'funny');

	connection.query('use test;', function (err) {
		if (err) {
			console.log(err);
		}
	});

	connection.query('insert into xyzUser (name, email, social, token, date) values (' + connection.escape(data['name']) + ',' + connection.escape(data['email']) + ',' + connection.escape(data['social']) + ','
	//************ token은 너무 길어서 우선 주석처리
	// + connection.escape(data['token']) + ','
	+ '111111' + ',' + connection.escape(data['date']) + ');', function (err) {
		if (err) {
			console.log(err);
		}
	});

	// connection.query('select * from xyzUser;',function(err,result,fields){
	// 	if(err){
	// 		console.log(err);
	// 	}
	// 	console.log('result',result);
	// })

	res.send('aaaa');
	// connection.end();	// mysql connection 하는 것이 '/testdata'로 post요청 받는 밖에 있기에 connection을 end하면 더이상 db에 값을 못넣는다.
});

// fetch call 받는 곳.(token이 만료된 유저.)
app.post('/googlenewtoken', function (req, res) {
	console.log('hello googlenewtoken');
	var data = req.body;

	// dummy data
	var dummyData = { a: 'jongmin', b: '3333333' };

	connection.query('use test;', function (err) {
		if (err) {
			console.log(err);
		}
	});

	// test code. 지워도된다.
	connection.query('update xyzUser set token=' + connection.escape(dummyData['b']) + ' where token=' + connection.escape(dummyData['a']) + ';');

	//	진짜 코드, 우선 test를 위해 주석처리.
	// connection.query('update xyzUser set token='
	// 	+ connection.escape(data['new_token']) 
	// 	+ ' where token='
	// 	+ connection.escape(data['old_token'])
	// 	+ ';')

	res.send('bbbb');
});

app.post('/fbnewtoken', function (req, res) {
	console.log('hello facebook newtoken');
	var data = req.body;

	connection.query('use test;', function (err) {
		if (err) {
			console.log(err);
		}
	});

	connection.query('update xyzUser set token=' + connection.escape(data['new_token']) + ' where token=' + connection.escape(data['old_token']) + ';');

	res.send('cccc');
});

app.post('/fbnotoken', function (req, res) {
	console.log('hello facebook notoken');
	var data = req.body;

	connection.query('use test;', function (err) {
		if (err) {
			console.log(err);
		}
	});

	connection.query('insert into xyzUser (name, email, social, token, date) values (' + connection.escape(data['name']) + ',' + connection.escape(data['email']) + ',' + connection.escape(data['social']) + ','
	//************ token은 너무 길어서 우선 주석처리
	// + connection.escape(data['token']) + ','
	+ '111111' + ',' + connection.escape(data['date']) + ');', function (err) {
		if (err) {
			console.log(err);
		}
	});

	res.send('dddd');
});

app.use('/', _express2.default.static(__dirname + './../client'));
//	'/' 로 들어오는 것은 routes로 보낸다.
app.use('/', _posts2.default);

var server = app.listen(port, function () {
	console.log("Express listening on port", port);
});

/*

	mysql connection

*/

// var connection = mysql.createConnection({
// 	host : 'localhost',
// 	user : 'root',
// 	password : ''
// });

// connection.connect(function(err){
// 	if(err){
// 		console.log(err);
// 	}
// });

// connection.query('use test;',function(err){
// 	if(err){
// 		console.log(err);
// 	}
// });

// connection.query('insert into cats (name, owner, birth) values (1,2,3);', function(err){
// 	if(err){
// 		console.log(err);
// 	}
// })

// connection.query('select * from cats;',function(err,result,fields){
// 	if(err){
// 		console.log(err);
// 	}
// 	console.log('result',result);
// })

// connection.end();