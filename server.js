var express = require('express');
var http = require('http');
var path = require('path');
var fs = require("fs");

var cars = require('./routes/cars'); 
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');


app.set('port', process.env.PORT || 4300);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

app.use("/node_modules", express.static(__dirname + "/node_modules"));


if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.use(
        connection(mysql,{
        host: 'localhost', //'localhost',
        user: 'root',
        password : 'root',
        port : 3306, //port mysql
        database:'cars'
    },'request') //or single

);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + './index.html'));
});

app.get('/cars', cars.list);
app.get('/cars/delete/:id', cars.delete);
app.get('/car_repairs/show/:id', cars.repairs_list);
app.post('/cars/add', cars.add);
app.post('/car_repair/add/', cars.repair_add);
app.post('/car_repair/update/:repair_id', cars.repair_update);
app.post('/car_repair/delete/:repair_id', cars.repair_delete);
app.get('/cars/check/:id', cars.check_car_plateid);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
