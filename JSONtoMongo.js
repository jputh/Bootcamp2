'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */



var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

var uri = config.db.uri;
var listingData;  



//Example instance of Listing Model
/*
var building1 = new Listing({

  code: 'FAC',
  name: 'Fine Arts C',
  latitude: 1.001,
  longitude: 0.3565

});

console.log(building1.name);
*/



/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/


//Connect to mongodb with mongoose
mongoose.connect(uri, { useNewUrlParser: true });


/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */


//read file
fs.readFile('listings.json', 'utf8', function(err, data){

  if(err) throw err;


  var entryCount = 0;

  //parse JSON file
  listingData = JSON.parse(data);



  //loop through entries in listings.js and add schema to new Listing object
  listingData.entries.forEach(function(element){
    
    
    var newEntry = new Listing;

    newEntry.code = element.code;
    newEntry.name = element.name;

    if(element.coordinates){
      if(element.coordinates.longitude){
        newEntry.coordinates.longitude = element.coordinates.longitude;
      }

      if(element.coordinates.latitude){
        newEntry.coordinates.latitude = element.coordinates.latitude;
      }
    }

    if(element.address){
      newEntry.address = element.address;
    }




    newEntry.save(function(err){
      if(err) throw err;

      entryCount++;
      console.log('Entries logged: ' + entryCount);

    });


  });


});




/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */