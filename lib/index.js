#! /usr/bin/env node
var sys = require('sys');
var summarizer = require('./summarizer');
var child_process = require('child_process');
var argv = require('optimist');
var path = require('path');

var processCount = argv.processes || argv.p || 1;
var specsLocation = argv.requests || argv.r || path.resolve(__dirname + '/../examples/requestSpecs');

var options = {
  host: argv.host || argv.h || 'localhost',
  port: argv.port || argv.p || 3000
};

for (var i = 0; i < processCount; i++) {
  var pathToDriver = path.resolve(__dirname + '/driver');
  console.log(pathToDriver);
  var p = child_process.fork(pathToDriver);
  p.on('message', function(message) {
    summarizer.digest(JSON.parse(message));
    sys.puts(message);
  });
  p.send(JSON.stringify({
    command: 'start',
    specs: specsLocation,
    options: options
  }));
}

setInterval(function() {
  sys.puts("// Progress:" + summarizer.report());
}, 5000);
