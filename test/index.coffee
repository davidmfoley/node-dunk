# Set up chai assertions
http = require 'http'
require('chai').should()
server = null

before ->
  console.log '\nstarting test http server'
  server ||= http.createServer(handleRequest)
  server.listen(3003)

after ->
  console.log '\nshutting down test http server'
  server && server.close()
  server = null

handleRequest = (req, res) ->
  req.end()

require './get'
