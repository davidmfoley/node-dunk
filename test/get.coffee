runner = require '../lib/requestRunner.js'
specs =
  root: -> {
    method: 'GET'
    path: '/'
  }

options:
  rounds: 1
  host: 'localhost'
  port: '3003'


options =
describe 'simple test', ->
  it 'works', (done)->
    runner.notify = (data) ->
      data.statusCode.should.equal(200)
      done()
    runner.run(specs, options)

