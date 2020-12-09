const request = require('request');
const AWS = require('aws-sdk');


//the hostanme
let mainhost = 'example.com';
// choose the path to test empty for / root
let paths = ['', 'test1']
// set AWS region
AWS.config.update({region: 'eu-west-1'});


exports.handler =  function(event, context, callback) {


  for (let patha of paths)
  {

    request({
      uri: 'http://' + mainhost + '/' + patha,
      method: 'GET',
      time: true

    }, (err, resp) => {
      logit(patha,'StatusCode',resp.statusCode,'EndpointRequestStatusCode','None');
      logit(patha,'Timing',resp.timings.end,'EndpointRequestTime','Milliseconds');

      });

  }

}

function logit(tpatha, logname , logvalue , metricname,tunit)
{

var cw = new AWS.CloudWatch({apiVersion: '2010-08-01'});

// Create parameters JSON for putMetricData
var params = {
  MetricData: [
    {
      MetricName: metricname,
      Dimensions: [
        {
          Name: 'Endpoint',
          Value: tpatha.toString()
        },

      ],
      Unit: tunit,
      Value: logvalue
    },
  ],
  Namespace: 'EndpointHealth/' + logname
};

cw.putMetricData(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", JSON.stringify(data));
  }
});
}