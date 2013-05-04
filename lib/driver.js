var requestRunner = require('./requestRunner');

process.on('message', function(message) {
  var data = JSON.parse(message);
  if (data.command == 'start') {
    console.log(data.specs);
    var requestSpecs = require(data.specs);
    requestRunner.run(requestSpecs, data.options);
  }
});
