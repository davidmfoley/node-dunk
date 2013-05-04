var requests = 0;
var completedRequests = 0;
var lastMessages = 0 ;
var errors = 0;
var lastCheck = +(new Date);
var start = new Date()
module.exports = {
  digest: function(result) {
    requests++;
    if (! /^[23][0-9][0-9]$/.test('' + result.statusCode)) {
      errors++;
    }
    else {
      completedRequests++;
    }
    lastMessages++;
  },
  report: function() {
    var now = new Date();
    var elapsed = ((+ now) - start) /1000;
    var duration = ((+(new Date) - lastCheck) / 1000);
    var data = {
      requestsSoFar: requests,
      currentRps: (lastMessages / duration).toFixed(0),
      overallRps: (requests/elapsed).toFixed(1),
      errors: errors
    };
    lastMessages = 0;
    lastCheck = +(new Date);
    return JSON.stringify(data);
  }
};
