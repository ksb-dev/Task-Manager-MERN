require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

const fileUpload = require('express-fileupload')

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const connectToDataBase = require('./db/mongoDB')

// Routers
const authenticationRouter = require('./routes/authenticationRouter')
const taskRouter = require('./routes/taskRouter')
const deleteAccountRouter = require('./routes/deleteAccountRouter')
const uploadImageRouter = require('./routes/uploadImageRouter')

//  Middleware
const authenticationMiddleware = require('./middlewares/authenticationMiddleware')
const notFoundMiddleware = require('./middlewares/notFoundMiddleware')
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware')

app.use(express.static('./public'))

app.use(express.json())
app.use(fileUpload({ useTempFiles: true }))

app.use('/api/v1/tasks/auth', authenticationRouter)
app.use('/api/v1/tasks', authenticationMiddleware, taskRouter)
app.use(
  '/api/v1/tasks/delete/account',
  authenticationMiddleware,
  deleteAccountRouter
)
app.use('/api/v1/profile/upload', uploadImageRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

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
