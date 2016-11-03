import express from 'express';
import path from 'path';
import mysql from 'mysql';


const router = express.Router();

router.get('/dd', function(req, res){
	console.log('this page is 111111');
	res.send('this page is dd');
})

router.get('*', function(req, res) {	// 모든 get 요청에 대해 처리한다.
	res.sendFile(path.resolve(__dirname, '../../client/index.html'));
})


export default router;