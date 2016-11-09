'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _posts = require('./routes/posts');

var _posts2 = _interopRequireDefault(_posts);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 3030;

// fetch의 body에 담긴 data를 받기위해 bodyParser 세팅.
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use('/', _express2.default.static(__dirname + './../client'));
//	'/' 로 들어오는 것은 routes로 보낸다.
app.use('/', _posts2.default);

var server = app.listen(port, function () {
  console.log("Express listening on port", port);
});