require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const connectToDataBase = require('./db/mongoDB')

// Routers
const authenticationRouter = require('./routes/authenticationRouter')
const taskRouter = require('./routes/taskRouter')

//  Middleware
const authenticationMiddleware = require('./middlewares/authenticationMiddleware')
const notFoundMiddleware = require('./middlewares/notFoundMiddleware')
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware')

app.use(express.json())

app.use('/api/v1/tasks/auth', authenticationRouter)
app.use('/api/v1/tasks', taskRouter)
//app.use('/api/v1/tasks', authenticationMiddleware, taskRouter)

app.use(notFoundMiddleware)
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