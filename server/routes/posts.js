import express from 'express';
import path from 'path';
import mysql from 'mysql';
import bodyParser from 'body-parser';
// import mysql from 'mysql';
// import './login.js';

import { 
	test, 
	getcall, 
	postcall, 
	google_noToken,
	google_newToken,
	facebook_newToken,
	facebook_noToken 	} from './login.js';

const router = express.Router();

// test code.
router.get('/codestates', test);

router.post('/code', postcall); // post 는 url 당연히 안먹지.

router.get('/codes', getcall);



// real code.
// Google 로그인.
// fetch call 받는 곳.(token이 없는 첫 방문 유저.)
router.post('/googlenotoken', google_noToken);

// fetch call 받는 곳.(token이 만료된 유저.)
router.post('/googlenewtoken', google_newToken);

// Facebook 로그인.
router.post('/fbnewtoken', facebook_newToken);

router.post('/fbnotoken', facebook_noToken);


// 아래 작업을 하지 않으면, URL을 직접 입력하고 들어갔을때 
// 클라이언트 사이드 라우팅이 제대로 작동하지 않습니다.
// 클라이언트에서 링크를 클릭해서 들어갔을때만 작동한다.
router.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, '../../client/index.html'));
})











export default router;