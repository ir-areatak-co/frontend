var express = require('express');
var router = express.Router();
var request = require("request")
//var moment = require('moment');




function doCall2(urlToCall2, callback) {
  request({
    url: urlToCall2,
    method: 'get',
    json: true
  }, function (error, response, body) {
  
    if (!error && response.statusCode === 200) {
        return callback(body);
    }
  })

}




function doCall(urlToCall, callback) {
  request({
    url: urlToCall,
    method: 'POST',
    json: true
  }, function (error, response, body) {
  
    if (!error && response.statusCode === 200) {
        return callback(body);
    }
  })

}


router.get('/usa', function(req, res) {

  var urlToCall = "http://192.99.198.232:3000/calls/0/1000";
  var urlToCall2 = "http://192.99.198.232:3000/calls/stats";

  doCall(urlToCall, function(body){
      doCall2(urlToCall2, function(body2){       
      res.render('system/usa',{ body:body, 
      
        totalUsaCalls:body2.totalUsaCalls,
        totalUsaCallsEnded:body2.totalUsaCallsEnded,
        totalUsaCallsStarted:body2.totalUsaCallsStarted,
        totalUsaCallsStartAccepted:body2.totalUsaCallsStartAccepted,
        totalIndiaCallsStartAccepted:body2.totalIndiaCallsStartAccepted,
        avgDuration:body2.totalUsaCallsEnded/body2.usaDuration,
      
      });

    }) 
  })

  

})

router.get('/india', function(req, res) {

  var urlToCall = "http://192.99.198.232:3001/calls/0/1000";
  var urlToCall2 = "http://192.99.198.232:3000/calls/stats";
  doCall(urlToCall, function(body){
      doCall2(urlToCall2, function(body2){
      res.render('system/india',{ body:body, 
      
        totalIndiaCalls:body2.totalIndiaCalls,
        totalIndiaCallsStartAccepted:body2.totalIndiaCallsStartAccepted,
        totalUsaCallsStartAccepted:body2.totalUsaCallsStartAccepted,
        totalIndiaCallsStarted:body2.totalIndiaCallsStarted,
        avgDuration:body2.totalIndiaCallsStartAccepted / body2.indiaDuration,
      
      });

    }) 
  })

    

})

module.exports = router

/*

        */