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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/dd', function (req, res) {
	console.log('this page is 111111');
	res.send('this page is dd');
});

router.get('*', function (req, res) {
	// 모든 get 요청에 대해 처리한다.
	res.sendFile(_path2.default.resolve(__dirname, '../../client/index.html'));
});

exports.default = router;