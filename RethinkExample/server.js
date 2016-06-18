const express = require('express');
const app = express();
const r = require('rethinkdb');
var config=require("./config.js");
app.get('/', function (req, res) {
   res.send('Hello Nodejs');
});

// Enable cors request for nodejs
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// get_all route to send all request
app.get('/get_all.json', function (req, res) {
	// establish connection to rethink db
	r.connect( config.rethinkdb, function(err, connection) {
	    if (err){
	    	throw err;
	    }else{
	      r.db('test').tableList().contains('authors').run(connection).then(function(table_exist) {
	      	// check table exist in test db
			  	if(table_exist){
			  		// send random data from authors table with limit 20
			  			r.table('authors').sample(20).run(connection, function(err, cursor) {
					    if (err) throw err;
					    	cursor.toArray(function(err, result) {
					        if (err){
					        	console.log(err);
					        	throw err
					        }else{
					        	res.json(result);
					    	}
					    });
			  		});
				}else{
					// if table does not exist create table
					r.db('test').tableCreate('authors').run(connection, function(err, result) {
					    if (err){
					    	throw err;
					    }else{
					    	// insert some dummy data to table
							r.table('authors').insert(insert_mock_data()).run(connection, function(err, result) {
							    if (err){
							    	throw err;
							    }else{
							    	   res.send('Table authors created and inserted fake data');
							    }
							});
					    }
					})
				}
			});
	    }
	});
});

//  fake data
function insert_mock_data(){
	var data=[
				{
				  "id": 1,
				  "Title": "Bluezoom",
				  "Description": "Pellentesque eget nunc."
				}, {
				  "id": 2,
				  "Title": "Mydeo",
				  "Description": "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim."
				}, {
				  "id": 3,
				  "Title": "Meevee",
				  "Description": "Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique."
				}, {
				  "id": 4,
				  "Title": "Browsebug",
				  "Description": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc."
				}, {
				  "id": 5,
				  "Title": "Riffwire",
				  "Description": "In sagittis dui vel nisl. Duis ac nibh."
				}, {
				  "id": 6,
				  "Title": "Gabtype",
				  "Description": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum."
				}, {
				  "id": 7,
				  "Title": "Edgeblab",
				  "Description": "Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat."
				}, {
				  "id": 8,
				  "Title": "Realbuzz",
				  "Description": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo."
				}, {
				  "id": 9,
				  "Title": "Eire",
				  "Description": "In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh."
				}, {
				  "id": 10,
				  "Title": "Jayo",
				  "Description": "Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum."
				},
				{
				  "id": 11,
				  "Title": "mboyd0",
				  "Description": "Vestibulum rutrum rutrum neque. Aenean auctor gravida sem."
				}, {
				  "id": 12,
				  "Title": "mjones1",
				  "Description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa."
				}, {
				  "id": 13,
				  "Title": "pdean2",
				  "Description": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla."
				}, {
				  "id": 14,
				  "Title": "rtorres3",
				  "Description": "Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl."
				}, {
				  "id": 15,
				  "Title": "jpeters4",
				  "Description": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi."
				}, {
				  "id": 16,
				  "Title": "lgrant5",
				  "Description": "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante."
				}, {
				  "id": 17,
				  "Title": "jaustin6",
				  "Description": "Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
				}, {
				  "id": 18,
				  "Title": "kperkins7",
				  "Description": "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia."
				}, {
				  "id": 19,
				  "Title": "hramirez8",
				  "Description": "Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi."
				}, {
				  "id": 20,
				  "Title": "gandrews9",
				  "Description": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui."
				}
			];
			return data;
}
// start server
var server = app.listen(config.express.port, function () {
  console.log("Server Started");
});