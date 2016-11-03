import express from 'express';
import routes from './routes/posts';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import $ from 'jquery';

const app = express();
let port = 3030;

// fetch의 body에 담긴 data를 받기위해 bodyParser 세팅.
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// mysql과 연결
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : ''
});

// mysql 연결 에러 체크.
connection.connect(function(err){
	if(err){
		console.log('mysql connect error',err);
	}
});

// test
app.get('/test', function(req, res){
  res.send('test');
});

// hello
app.get('/hello', (req, res) => {
  return res.send("Can you hear me?");
});

// taewoong
app.get('/taewoong', (req,res) =>{
	res.send('taewoong handsome');
})



// fetch call 받는 곳.(token이 없는 첫 방문 유저.)
app.post('/googlenotoken', function(req, res){	//	로그인할때 유저정보 받아옴.
	console.log('hello googlenotoken');
	console.log('this is data',req.body);
	console.log('this is typeof data', typeof req.body);
	var data = req.body;
	
	window.localStorage.setItem('taewoong','funny');

	connection.query('use test;',function(err){
		if(err){
			console.log(err);
		}
	});

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

	// 콘솔창 지져분해서 우선 주석처리.
	// connection.query('select * from xyzUser;',function(err,result,fields){
	// 	if(err){
	// 		console.log(err);
	// 	}
	// 	console.log('result',result);
	// })

	res.send('aaaa');
	// connection.end();	// mysql connection 하는 것이 '/testdata'로 post요청 받는 밖에 있기에 connection을 end하면 더이상 db에 값을 못넣는다.
})

// fetch call 받는 곳.(token이 만료된 유저.)
app.post('/googlenewtoken', function(req,res){
	console.log('hello googlenewtoken');
	var data = req.body;

	// dummy data
	var dummyData = {a: 'jongmin', b: '3333333'};
	
	connection.query('use test;', function(err){
		if(err){
			console.log(err);
		}
	});

	// test code. 지워도된다.
	connection.query('update xyzUser set token='
		+ connection.escape(dummyData['b']) 
		+ ' where token='
		+ connection.escape(dummyData['a'])
		+ ';')

	//	진짜 코드, 우선 test를 위해 주석처리.
	// connection.query('update xyzUser set token='
	// 	+ connection.escape(data['new_token']) 
	// 	+ ' where token='
	// 	+ connection.escape(data['old_token'])
	// 	+ ';')

	res.send('bbbb');
})

app.post('/fbnewtoken', function(req, res){
	console.log('hello facebook newtoken');
	var data = req.body;

	connection.query('use test;', function(err){
		if(err){
			console.log(err);
		}
	})

	connection.query('update xyzUser set token='
		+ connection.escape(data['new_token']) 
		+ ' where token='
		+ connection.escape(data['old_token'])
		+ ';')

	res.send('cccc');
})

app.post('/fbnotoken', function(req, res){
	console.log('hello facebook notoken');
	var data = req.body;

	connection.query('use test;', function(err){
		if(err){
			console.log(err);
		}
	})

	connection.query('insert into xyzUser (name, email, social, token, date) values (' 
		+ connection.escape(data['name']) + ','
		+ connection.escape(data['email']) + ','
		+ connection.escape(data['social']) + ','
//************ token은 너무 길어서 우선 주석처리
		// + connection.escape(data['token']) + ','
		+ '111111' + ',' 
		+ connection.escape(data['date']) + ');', 
		function(err){
			if(err){
				console.log(err);
			}
		}
	)

	res.send('dddd');	
})


app.use('/', express.static(__dirname + './../client'));
//	'/' 로 들어오는 것은 routes로 보낸다.
app.use('/', routes);	

const server = app.listen(port, () => {
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
