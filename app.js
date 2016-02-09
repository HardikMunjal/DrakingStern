var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var server = require('http').createServer(app);


//***************MYSQL CONNECTION CONFIGURATION***************************
var connection  = require('express-myconnection'); 
var mysql = require('mysql');


server.listen(5000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});



	
app.use(require('./safegaurd/corsheaders'));


//*****************************CRON Execution Code*******************************************
//var cron = require('./crons/mailSender');
//cron();

//add body parser thing before router to parse data in req body.
app.use(bodyParser.json({
	limit: '10mb'
}));
app.use(router);
require('./routes')(router);

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
