const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// body-parser: used to parse requests & responses.
app.use(bodyParser.urlencoded({extended:true}))

// initialize DB
MongoClient.connect('mongodb://username:password@ds111565.mlab.com:11565/time-announcer', function (err, database) {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function () {
    console.log('listening on 3000')
  })
})


// Routes ///////////////////////////////////////////////////////////

// GETs //////////////////////////////////

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
})

// POSTs //////////////////////////////////

app.post('/quotes', function (req, res) {
    db.collection('quotes').save(req.body, function (err, result) {
    if (err) return console.log(err);

    console.log('saved to database');
    res.redirect('/');
  })
})