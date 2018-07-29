var express = require('express');
var fs = require('fs');
var request = require('request');
const fetch = require('node-fetch');
var cheerio = require('cheerio');
var app     = express();

//app.get('/scrape', function(req, res){


var url = 'https://data.ca.gov/dataset/drinking-water-%E2%80%93-human-right-water-regulatory-including-enforcement-actions-information';

const getMetaDataFor = async url => {
  try {
    var response = await fetch(url);
    const html = await response.text();
    var $ = cheerio.load(html);
    var title;
    var json = { title : "", json_metadata_url: "", log_message: "?", revision_timestap: "", resources: [] };
    $('a').each( function(i, element){
      var a = $(this);
    });
    var json_metadata_url = $('a[title="json view of content"]')[0].attribs["href"];

    json.json_metadata_url = json_metadata_url;
    json.last_modified = response.headers['last-modified'];

    // follow the metadata URL link an get the meta data.
    response = await fetch(json_metadata_url);
    json_metadata = await response.json();
    result = json_metadata.result[0];
    console.log("JSON_METADATA", result); // .result[0]);
    json.log_message = result.log_message;
    json.revision_timestamp = result.revision_timestamp;
    result.resources.forEach( function(resource) {
      console.log("RESOURCE MESSAGE", [resource.name, resource.last_modified] );
      json.resources.push({ "name": resource.name, "url": resource.url, "last_modified": resource.last_modified });
    });
    json.log_message = json_metadata.log_message;
    return json;
    return "";
  }
  catch (error) {
    console.log("Error with fetch", error);
  }
}

getMetaDataFor(url).then(json => console.log(json));
/*
request(url, function(error, response, html){
  if(!error){
    var $ = cheerio.load(html);
    var title;
    var json = { title : "", json_url: "", log_message: "?", revision_timestap: "" };
    $('a').each( function(i, element){
      var a = $(this);
    });
    var json_url = $('a[title="json view of content"]')[0].attribs["href"];
    console.log("json_url link", json_url);
    json.json_url = json_url;
    json.last_modified = response.headers['last-modified'];

    request(json_url, function(error, response_json, body){
      json_result = JSON.parse(body)["result"][0];
      console.log("json result log message", json_result.log_message);
      json.log_message = json_result.log_message;
      json.revision_timestamp = json_result.revision_timestamp;
      // console.log("RESOURCES", json_result.resources);
      json_result.resources.forEach( function(resource) {
//        console.log("resource", resource.last_modified);
        //console.log("revision timestamp", resource.revision_timestamp);
      });
      // console.log(json_result);
      // console.log("revision_timestamp:", json_result.revision_timestamp);
      // console.log("log-message: ", json_result.log_message);
    });
    } else {
      console.log('error:', error); // Print the error if one occurred
    }

  console.log(json);

  fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

  // console.log('File successfully written! - Check your project directory for the output.json file');

})
//res.send('OK Check your console!')

});
*/
//app.listen('8081');
 //console.log('Magic happens on port 8081'); exports = module.exports = app;
