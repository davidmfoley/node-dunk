var http = require('http');
var sys = require('sys');
var requests = 0;

module.exports = {
  run: function(specs, options) {
    var requestSpecs = [];
    for (name in specs) {
      requestSpecs.push({
        name: name,
        spec: specs[name]
      });
    }
    makeRequest(requestSpecs, options);
  },
  notify: function(data) {
    process.send(JSON.stringify(data));
  }
}

function makeRequest(requestSpecs, options) {
  var specIndex = requests % requestSpecs.length;
  var spec = requestSpecs[specIndex].spec();
  var name = requestSpecs[specIndex].name;
  var options = {
    host: options.host,
    method : spec.method,
    path : spec.path,
    auth: options.auth,
    headers: spec.headers
  };
  var started = new Date
  requests++;
  var request = http.request(options, function(res) {
    notify(name, started, res.statusCode, spec);
    makeRequest(requestSpecs, options);
  });
  request.on('error', function(err) {
    notify(name, started, 'ERR', spec, err);
  });
  var customize = spec.customize || function(){};
  customize(request);
  request.end();
}

function notify(name, started, statusCode, spec, message) {
  var now = new Date;
  module.exports.notify({
    startedAt: started,
    statusCode: statusCode,
    elapsed: now - started,
    name: name,
    method: spec.method,
    path: spec.path,
    message: message
  });
}


