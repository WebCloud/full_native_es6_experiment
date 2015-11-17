var express = require('express');
var fs = require('fs');
var app = express();

// read the json file stream and return it's data
function readJsonFileSync(filepath, encoding){
  if(typeof (encoding) === 'undefined'){
    encoding = 'utf8';
  }

  return fs.readFileSync(filepath, encoding);
}

// setup usage of a static file server, point it to the webpack dist dir
app.use(express.static('dist'));

// setup the endpoint for the json fetching
app.get('/positions.json', function(req, res){
  var json = readJsonFileSync(__dirname + '/json/positions.json');

  // express automatically sets the header to application/json
  res.send(JSON.parse(json));
});

app.listen(3000);
