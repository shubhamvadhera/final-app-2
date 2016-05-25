//Lets require/import the HTTP module
var http = require('http'),
express = require('express');

//set port
var app = express();
app.set('port', process.env.PORT || 8080);

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://ec2-52-207-248-189.compute-1.amazonaws.com:27017/test';

//We need a function which handles requests and send response
app.get('/', function (req, res) {
    // Use connect method to connect to the mongo
    MongoClient.connect(url, function (err, db) {
      if (err) {
        res.send(400,'Unable to connect to the mongoDB server. Error:', err);
      } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);

      // Get the documents collection
      var collection = db.collection('gumball');

      // Insert some users
      collection.find( {serialNumber: '1234998871109'}).toArray( function(err, result) {
      if (err) {
        console.log('MongoDB error. Error:', err);
        res.send(404,'MongoDB error. Error:', err);
      } else if (result.length) {
        console.log('Found:', result);
        res.send(200,result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
        res.send(404,'No document(s) found with defined "find" criteria!');
      }
      //Close connection
      db.close();
    });
  }
});
    //response.end('It Works!! Path Hit: ' + request.url);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});