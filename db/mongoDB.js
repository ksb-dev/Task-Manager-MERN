const mongoose = require('mongoose')

const connectToDataBase = url => {
  return mongoose.connect(url)
}

module.exports = connectToDataBase
