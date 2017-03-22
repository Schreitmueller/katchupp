/**
 * Created by janschmutz on 22.03.17.
 */
var express  = require('express');
var app      = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//Express Config + Middleware hier
app.use(express.static(__dirname + '/public')); //statischer link für clientseitige Dateien

app.use(bodyParser.urlencoded({'extended':'true'}));  //Middleware für Node-Module
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.listen(3333); //server starten
console.log("App listening on port 3333");