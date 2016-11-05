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

app.use('/', express.static(__dirname + './../client'));
//	'/' 로 들어오는 것은 routes로 보낸다.
app.use('/', routes);	

const server = app.listen(port, () => {
  console.log("Express listening on port", port);
});
