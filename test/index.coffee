# Set up chai assertions
http = require 'http'
require('chai').should()
server = null

before ->
  server ||= http.createServer(handleRequest)
  server.listen(3003)

after ->
  server && server.close()
  server = null

handleRequest = (req, res) ->
  req.end()

require './get'
