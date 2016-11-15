import express from 'express';
import path from 'path';
import mysql from 'mysql';
import bodyParser from 'body-parser';
// import mysql from 'mysql';
// import './login.js';
import axios from 'axios'

import { 
	test, 
	getcall, 
	postcall, 
	google_noToken,
	google_newToken,
	facebook_newToken,
	facebook_noToken 	} from './login.js';

import {
	test_xyzDress,
	test_xyzCoordi 	} from './db_test.js';

const router = express.Router();

// test code.
router.get('/codestates', test);

router.post('/code', postcall); // post 는 url 당연히 안먹지.

router.get('/codes', getcall);


// mysql과 연결
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : ''
});

// mysql 연결 에러 체크.
connection.connect(function(err){
	if(err){
		console.log('mysql connect error', err);
	}
});

connection.query('use test;',function(err){
	if(err){
		console.log(err);
	}
});

var data = {
	'name' : 'minho',
	'email' : 'naver@naver.com',
	'social' : 'g',
	'date' : 'next monday'
}

connection.query('insert into xyzUser (name, email, social, token, date) values (' 
	+ connection.escape(data['name']) + ','
	+ connection.escape(data['email']) + ','
	+ connection.escape(data['social']) + ','
//************ token은 너무 길어서 우선 주석처리
	// + connection.escape(data['token']) + ','
	+ '111111' + ',' 
	+ connection.escape(data['date']) + ');', function(err){
	if(err){
		console.log(err);
	}
})


// client에 데이터 뿌리기.
router.post('/retrieveData', function(request,response){
	console.log('i am server');

	connection.query('use test;', function(err){
		if(err){
			console.log(err);
		}
	});

	connection.query('select * from aaaa;',function(err,rows){
		if(err){
			console.log(err);
		}
		response.send(rows);
	})
})



console.log('!@#$%$#@$%^%$#@!');
// real code.
// Google 로그인.
// fetch call 받는 곳.(token이 없는 첫 방문 유저.)
router.post('/googlenotoken', google_noToken);

// fetch call 받는 곳.(token이 만료된 유저.)
router.post('/googlenewtoken', google_newToken);

// Facebook 로그인.
router.post('/fbnewtoken', facebook_newToken);

router.post('/fbnotoken', facebook_noToken);

router.post('/test_xyzDress', test_xyzDress);

router.post('/test_xyzCoordi', test_xyzCoordi);

// 아래 작업을 하지 않으면, URL을 직접 입력하고 들어갔을때 
// 클라이언트 사이드 라우팅이 제대로 작동하지 않습니다.
// 클라이언트에서 링크를 클릭해서 들어갔을때만 작동한다.
router.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, '../../client/index.html'));
})

export default router;




