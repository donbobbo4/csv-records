const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')

module.exports = async function createServer () {

  const app = express()

  app.use(errorhandler())

  // Set express server port
  app.set('port', process.env.PORT || 3333)
  app.use(morgan('dev'))
  app.use(bodyParser.urlencoded({ extended: false, inflate: true }))
  app.use(bodyParser.json({ strict: true, inflate: true }))

  /**
   * Routes for the application
   */
  app.use('/', require('./routes/recordsRouter'));

  // Create http server and attach express app on it
 return http.createServer(app).listen(app.get('port'), '0.0.0.0', () => {
   console.log("Server started at http://localhost:" + app.get('port') + "/")
 })

}
