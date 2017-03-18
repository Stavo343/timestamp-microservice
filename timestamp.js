var express = require('express');
var path = require('path');
var ejs = require('ejs');
//sugar.js is a great date-translating module
//more information can be found at sugarjs.com
var sugar = require('sugar-date');

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/:id', function (req, res) {
  var naturalDate = {"unix": null, "natural": null};
  var newDate = sugar.Date(req.params.id).medium();
  if (newDate == 'undefined NaN, 0NaN') {
    if (req.params.id.replace(/[\D]/g, '') == req.params.id) {
      naturalDate.unix = req.params.id;
      naturalDate.natural = sugar.Date(new Date(Number(req.params.id)*1000)).medium().raw;
      res.send(JSON.stringify(naturalDate));
    } else {
      res.send(JSON.stringify(naturalDate));
    }
    console.log()
  } else {
    naturalDate.unix = sugar.Date(req.params.id).format('{X}').raw;
    naturalDate.natural = newDate.raw;
    res.send(JSON.stringify(naturalDate));
  }

});

var port = process.env.PORT;

app.listen(port, function() {
  console.log('ready on port 1337');
});
