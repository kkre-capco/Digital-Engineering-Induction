const express = require('express')
const app = express()
const mongoose = require('mongoose')

const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const port = 8080
const host = '0.0.0.0'
const dbURI = "mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=GitHub+Training&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true"

const log4js = require("log4js")
const logger = log4js.getLogger()
// const configure = log4js.configure()

log4js.configure({
  appenders: {
    app: {type: "file", filename: "app.log"}
  },
  categories: {
    default: {
      appenders: ["app"],
      level: 'all'
    }
  }
})



const routes = require('./src/routes/all')

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "0.1.0",
      description:
        `[ Base URL: ${host}:${port}/ ]`,
    },
    servers: [
      {
        url: `http://${host}:${port}/api-docs`,
      },
    ],
  },
  apis: ["./routes/all.js"],
};

const specs = swaggerJsdoc(options)

const startServer = async () => {
  try {
      await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
      console.log(`Database has connected successfully`)


      app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs)
      )

      //! Body parser
      app.use(express.json())

      //! Middleware
      app.use((req, _res, next) => {
        console.log(`🚨 Incoming request: ${req.method} - ${req.url}`)
        next()
      })

      routes.setup(app)


      logger.info(`${new Date().toJSON()}  connection successful`)

      app.listen(port, () => {
        console.log(`Example app listening at http://${host}:${port}`)
      })

  } catch (err) {
    console.log('🚨 Something went wrong starting the app')
    console.log(err)
  }
}

startServer()

module.exports = { app }

