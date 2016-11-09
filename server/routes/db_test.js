import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';



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


export function test_xyzDress(req,res){
	console.log('this is taewoong123123');

	var tokenGG = req.body.tokenGG;
	var tokenFB = req.body.tokenFB;
	var dressCategory = req.body.selectpicker;

	var dressName = req.body.dressName;
	var fileName = req.body.fileName;
	var fileSize = req.body.fileSize;
	var fileFormat = req.body.fileFormat;
	var date = new Date();

	console.log('tokenGG',tokenGG);
	console.log('tokenFB',tokenFB);
	console.log('typeof tokenGG',typeof tokenGG);	
	console.log('dressname',dressName);
	
	if(tokenGG){
		connection.query('use test;', function(err){
			console.log(err);
		});

		connection.query('insert into xyzdress (u_id, c_id, dressname, filename, filesize ,fileformat, date) values ((select u_id from xyzuser where token = ' 
			// 실제코드(실제 진행시 주석 지우기)
			// + connection.escape(tokenGG)

			// 임시코드. 
			+ 12345
			+ '), (select c_id from xyzcategory where category_name = ' 
			+ connection.escape(dressCategory) 
			+ '),' 
			+ connection.escape(dressName) + ','
			+ connection.escape(fileName) + ','
			+ connection.escape(fileSize) + ','
			+ connection.escape(fileFormat) + ','
			+ connection.escape(date) + ');', 
			function(err){
				if(err){
					console.log(err);
				}
			}
		)
	} 
	else if(tokenFB){
		connection.query('use test;', function(err){
			console.log(err);
		});

		connection.query('insert into xyzdress (u_id, c_id, dressname, filename, filesize ,fileformat, date) values ((select u_id from xyzuser where token = ' 
			// 실제코드(실제 진행시 주석 지우기)
			// + connection.escape(tokenFB) 

			// 임시코드.
			+ 54321
			+ '), (select c_id from xyzcategory where category_name = ' 
			+ connection.escape(dressCategory) 
			+ '),' 
			+ connection.escape(dressName) + ','
			+ connection.escape(fileName) + ','
			+ connection.escape(fileSize) + ','
			+ connection.escape(fileFormat) + ','
			+ connection.escape(date) + ');', 
			function(err){
				if(err){
					console.log(err);
				}
			}
		)
	} 
	else {
		console.log('no token');
	}
}

export function test_xyzCoordi(req,res){
	console.log('enter the test_xyzCoordi');

	var tokenGG = req.body.tokenGG;
	var tokenFB = req.body.tokenFB;
	var setName = req.body.dressCoordiSetName;
	var coordi1 = req.body.coordi1;
	var coordi2 = req.body.coordi2;
	var coordi3 = req.body.coordi3;
	var date = new Date();

	console.log(1,setName);
	console.log(2, coordi1);
	console.log(3, coordi2);
	console.log(4, coordi3);
	
	// *********************
	//	Trasaction start!!!
	connection.beginTransaction(function(err){
		if(err){
			console.log(1);
			throw err;
		}

		connection.query('use test;', function(err){
			if(err){
				connection.rollback(function(){
					console.log(2);
					throw err;
				});
			}	

			connection.query('insert into xyzdresscoordi (setname, date) values ( '
				+ connection.escape(setName) +' , '
				+ connection.escape(date) +' );', function(err){
				if(err){
					connection.rollback(function(){
						console.log(3);
						throw err;
					})
				}


				connection.query('insert into xyzcoordidresset (dc_id , d_id) values (  (select dc_id from xyzDressCoordi order by dc_id desc limit 1)  , '
					+ connection.escape(coordi1) +' );',function(err){
					if(err){
						connection.rollback(function(){
							console.log(4);
							throw err;
						})
					}

					connection.query('insert into xyzCoordiDresset (dc_id , d_id) values (  (select dc_id from xyzDressCoordi order by dc_id desc limit 1)  , '
						+ connection.escape(coordi2) +' );',function(err){
						if(err){
							connection.rollback(function(){
								console.log(5);
								throw err;
							})
						}


						connection.query('insert into xyzCoordiDresset (dc_id , d_id) values (  (select dc_id from xyzDressCoordi order by dc_id desc limit 1 ) , '
							+ connection.escape(coordi3) +' );',function(err){
							if(err){
								connection.rollback(function(){
									console.log(6);
									throw err;
								})
							}

							connection.commit(function(err){
								if(err){
									connection.rollback(function(){
										console.log(4);
										throw err;
									})
								}
								res.send('success Trasaction');
							})
						})
					})
				})
			});
		});
	})
}









