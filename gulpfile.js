var gulp = require('gulp'),
    fs = require('fs'),
    tasksdir = __dirname + '/gulp/';

// load all the gulp task files in ./gulp

fs.readdirSync(tasksdir).forEach(function(filename){
    console.log('loading task file: ' + filename);
    require(tasksdir + filename);
});
