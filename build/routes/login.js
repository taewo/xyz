'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.test = test;
exports.postcall = postcall;
exports.getcall = getcall;
exports.google_noToken = google_noToken;
exports.google_newToken = google_newToken;
exports.facebook_newToken = facebook_newToken;
exports.facebook_noToken = facebook_noToken;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// test code.
function test(req, res) {
	console.log('this is test');
	res.send('this is test');
}

function postcall(req, res) {
	console.log('this is post_call');
	res.send('this is post_call');
}

function getcall(req, res) {
	console.log('this is get call');
	res.send('this is get call');
}

// real code.
function google_noToken(req, res) {
	//	로그인할때 유저정보 받아옴.
	console.log('hello googlenotoken');
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

		connection.query('insert into xyzlogin (u_id, device, date) values ( (select u_id from xyzuser where token = "qawsed12"), "iphone", ' + connection.escape(data['date']) + ');'
		// 진짜코드
		// + connection.escape(data['token']) 
		// + ' ) , "iphone" , '
		// + connection.escape(data['date']) +' );'
		, function (err) {
			if (err) {
				console.log(err);
			}
		});
	});

	// Test code. 콘솔창 지져분해서 우선 주석처리.
	// connection.query('select * from xyzUser;',function(err,result,fields){
	// 	if(err){
	// 		console.log(err);
	// 	}
	// 	console.log('result',result);
	// })

	res.send('aaaa');
	// connection.end();	// mysql connection 하는 것이 '/testdata'로 post요청 받는 밖에 있기에 connection을 end하면 더이상 db에 값을 못넣는다.
}

function google_newToken(req, res) {
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
}

function facebook_newToken(req, res) {
	console.log('hello facebook newtoken');
	var data = req.body;

	connection.query('use test;', function (err) {
		if (err) {
			console.log(err);
		}
	});

	connection.query('update xyzUser set token=' + connection.escape(data['new_token']) + ' where token=' + connection.escape(data['old_token']) + ';');

	res.send('cccc');
}

function facebook_noToken(req, res) {
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
}