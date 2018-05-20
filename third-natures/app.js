// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for terminating workers
    cluster.on('exit', function (worker) {

        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

// Code to run if we're in a worker process
} else {
    var AWS = require('aws-sdk');
    var express = require('express');
    var bodyParser = require('body-parser');
    var path = require('path');

    console.log()

    AWS.config.region = process.env.REGION

    //var sns = new AWS.SNS();
    //var ddb = new AWS.DynamoDB();

    //var ddbTable =  process.env.STARTUP_SIGNUP_TABLE;
    //var snsTopic =  process.env.NEW_SIGNUP_TOPIC;
    var app = express();

    // app.set('view engine', 'ejs');
    // app.set('views', __dirname + '/views');
    // app.use(bodyParser.urlencoded({extended:false}));
    app.use(express.static(path.join(__dirname +'/public')));

    app.all('/', (req, res) => {
        console.log('got here');
        res.sendFile(path.join(__dirname+'/public/index.html'));
        res.end();
    });

    //-----------ERROR HANDLING-------------------

    app.use('/', function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    app.use('/', (err, req, res, next) =>{
        console.log(err);
        var error={
            'message': err.message,
            'status':err.status,
            'stack':err.stack,
        }
        res.send(error);
        //res.render('error.html', {error:error});
    });

//--------------AWS OLD SETUP DB ROUTING LATER----------------------------
/*
    app.get('/', function(req, res) {
        res.render('index', {
            static_path: 'static',
            theme: process.env.THEME || 'flatly',
            flask_debug: process.env.FLASK_DEBUG || 'false'
        });
    });

    app.post('/signup', function(req, res) {
        var item = {
            'email': {'S': req.body.email},
            'name': {'S': req.body.name},
            'preview': {'S': req.body.previewAccess},
            'theme': {'S': req.body.theme}
        };

        ddb.putItem({
            'TableName': ddbTable,
            'Item': item,
            'Expected': { email: { Exists: false } }
        }, function(err, data) {
            if (err) {
                var returnStatus = 500;

                if (err.code === 'ConditionalCheckFailedException') {
                    returnStatus = 409;
                }

                res.status(returnStatus).end();
                console.log('DDB Error: ' + err);
            } else {
                sns.publish({
                    'Message': 'Name: ' + req.body.name + "\r\nEmail: " + req.body.email
                                        + "\r\nPreviewAccess: " + req.body.previewAccess
                                        + "\r\nTheme: " + req.body.theme,
                    'Subject': 'New user sign up!!!',
                    'TopicArn': snsTopic
                }, function(err, data) {
                    if (err) {
                        res.status(500).end();
                        console.log('SNS Error: ' + err);
                    } else {
                        res.status(201).end();
                    }
                });
            }
        });
    });

*/

    var port = process.env.PORT || 3000;

    var server = app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
    });
}

/*

//-----------ONLY FOR SEEDING!-------------------
//const seed = require('./db/seed.js');

//-----------ALL OTHER-------------------
const db = require('./db/index.js').db;
const Sequelize = require('sequelize');

const express = require('express');
const fs = require('fs');
const Promise = require('bluebird');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./routes/index.js');

const fsP = Promise.promisify(fs.readFile);

//const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./browser/'));
app.use(express.static('./public/'));
app.use(express.static('./public/stylesheets/'));
app.use(express.static('./public/img/'));
//app.use(express.static('./public/geojson/'));
app.use('/jquery', express.static('./node_modules/jquery/dist'));
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

//add more routes/router later....

app.use('/api', router);
app.use('/geojson/:file', (req, res, next) => {
      fsP(`./public/geojson/${req.params.file}`)
        .then(geojson =>{
          res.send(geojson);
        })
        .catch(err=>{
          next(err);
        });
});


//-----------ERROR HANDLING-------------------

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use('/', (err, req, res, next) =>{
    console.log(err);
    var error={
        'message': err.message,
        'status':err.status,
        'stack':err.stack,
    }
    res.send(error);
    //res.render('error.html', {error:error});
});

//-----------DATABASE & CONNECTION SYNC-------------------

var database = db.sync() // for queries only...
.then(()=> {

    app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
});

*/
