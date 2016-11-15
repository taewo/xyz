import express from 'express';
import routes from './routes/posts';
import bodyParser from 'body-parser';
import mysql from 'mysql';

const app = express();
let port = 3030;

// fetch의 body에 담긴 data를 받기위해 bodyParser 세팅.
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + './../client'));
//	'/' 로 들어오는 것은 routes로 보낸다.
app.use('/', routes);	


const server = app.listen(port, () => {
  console.log("Express listening on port", port);
});
