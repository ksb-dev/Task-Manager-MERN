// REST --> Representational state transfer

const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectToDataBase = require('./db/mongoDB')
require('dotenv').config()
const notFound = require('./middlewares/notFound')
const errorHandlerMiddleware = require('./middlewares/errorHandler')

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)

app.use(notFound)

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectToDataBase(process.env.MONGO_DB_CONNECTION_STRING)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
