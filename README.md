# LambdaCheckEndpoint
Used to check http endpoints, to get the http request endtime, and status code, after that push it to cloudwatch as custom metric.
This can later be invoked by aws eventbridge ,with a cron job. 
I plan on passing args from evenbridge as the endpoint urls , but currently this was a quick script to check endpoints for a domain. 
