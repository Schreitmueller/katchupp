/**
 * Created by janschmutz on 22.03.17.
 */
var express  = require('express');
var app      = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

Events = require('./models/events.js');
Places = require('./models/places.js');

//Database

mongoose.connect('mongodb://janschmutz:1495r2d2@ds143030.mlab.com:43030/katchupp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to mlab database');
});

//Express Config + Middleware hier
app.use(express.static(__dirname + '/public')); //statischer link für clientseitige Dateien

app.use(bodyParser.urlencoded({'extended':'true'}));  //Middleware für Node-Module
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

//Express Routen
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

//REST Api
app.get('/api/event', function(req, res) {           //zeigt alle test objekte an
    Events.getEvents(function(err, events){
        if(err){
            throw err;
        }
        res.json(events);
    })
});
app.get('/api/event/:_id', function(req, res) {              //zeigt test objekt einer bestimmten id an
    Events.getEventbyId(req.params._id, function(err, event){
        if(err){
            throw err;
        }
        res.json(event);
    })
});
app.post('/api/event', function(req, res) {           //fügt neues event hinzu
    var event = req.body;
    Events.addEvent(event, function(err, event){
        if(err){
            throw err;
        }
        res.json(event);
    })
});
app.put('/api/event/:_id', function(req, res) {           //findet und updatet event
    var id = req.params._id;
    var event = req.body;
    Events.updateEvent(id, event, {upsert: true,new: true,setDefaultsOnInsert: true}, function(err, event){
        if(err){                    // upsert -> falls das angeforderte event nicht existiert erstellt er ein neues document
            return;
        }
        res.json(event);
    })
});

app.listen(3333); //server starten
console.log("App listening on port 3333");