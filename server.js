var express = require('express'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  app= express(),
  mongoose = require('mongoose'),
  routes = require('./routes');
  port = process.env.PORT || 1337;


mongoose.connect('mongodb://localhost/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.use('/', routes);

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send({message: err.message});
});

app.listen(port, function(){
  console.log('express app started on %d', port);
});
