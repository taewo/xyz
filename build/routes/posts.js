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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// test code.

// import mysql from 'mysql';
// import './login.js';

router.get('/codestates', _login.test);

router.post('/code', _login.postcall); // post 는 url 당연히 안먹지.

router.get('/codes', _login.getcall);

// real code.
// Google 로그인.
// fetch call 받는 곳.(token이 없는 첫 방문 유저.)
router.post('/googlenotoken', _login.google_noToken);

// fetch call 받는 곳.(token이 만료된 유저.)
router.post('/googlenewtoken', _login.google_newToken);

// Facebook 로그인.
router.post('/fbnewtoken', _login.facebook_newToken);

router.post('/fbnotoken', _login.facebook_noToken);

// 아래 작업을 하지 않으면, URL을 직접 입력하고 들어갔을때 
// 클라이언트 사이드 라우팅이 제대로 작동하지 않습니다.
// 클라이언트에서 링크를 클릭해서 들어갔을때만 작동한다.
router.get('*', function (req, res) {
	res.sendFile(_path2.default.resolve(__dirname, '../../client/index.html'));
});

exports.default = router;