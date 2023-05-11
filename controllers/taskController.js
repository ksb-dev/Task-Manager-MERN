const { StatusCodes } = require('http-status-codes')

const Task = require('../models/Task')

const handleRequest = async (req, res, findQuery, sortQuery) => {
  const { page = 1, limit = 10 } = req.query

  const tasks = await Task.find(findQuery)
    .sort(sortQuery)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()

  //const count = await Task.countDocuments()

  const length = await Task.find(findQuery)

  res.json({
    tasks,
    totalPages: Math.ceil(length.length / limit),
    currentPage: page
  })
}

// GET Requests
// 1. Get all tasks
const getAllTasks = async (req, res, next) => {
  try {
    handleRequest(req, res, { createdBy: req.user.userId })
  } catch (error) {
    next({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to fetch tasks!'
    })
  }
}

// 2. Get completed tasks
const getCompletedTasks = async (req, res, next) => {
  try {
    handleRequest(req, res, { completed: true })
  } catch (error) {
    next({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to fetch tasks!'
    })
  }
}

// 3. Get incompleted tasks
const getInompletedTasks = async (req, res, next) => {
  try {
    handleRequest(req, res, { completed: false })
  } catch (error) {
    next({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to fetch tasks!'
    })
  }
}

// 4. Get sorted  (a-z) tasks
const getTasksA_Z = async (req, res, next) => {
  try {
    handleRequest(req, res, {}, { name: 1 })
  } catch (error) {
    next({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to fetch tasks!'
    })
  }
}

// 5. Get sorted (z-a) tasks
const getTasksZ_A = async (req, res, next) => {
  try {
    handleRequest(req, res, {}, { name: -1 })
  } catch (error) {
    next({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to fetch tasks!'
    })
  }
}

// 6. Get single task (by "id")
const getSingleTask = async (req, res, next) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })

    if (!task) {
      next({
        statusCode: StatusCodes.NOT_FOUND,
        message: `No task with ID : ${taskID}`
      })
      return
    }

    res.status(201).json({ task })
  } catch (error) {
    next({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Failed to fetch a task'
    })
  }
}

// POST Request (Create ne task)
const createNewTask = async (req, res, next) => {
  const { name } = req.body

  if (name === undefined || name === '') {
    next({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Please provide a task name'
    })
    return
  }

  if (name.length < 3) {
    next({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Task name should be minimum 3 characters'
    })
    return
  }

  if (name.length > 20) {
    next({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Task name can not be more than 20 characters'
    })
    return
  }

  try {
    req.body.createdBy = req.user.userId
    const task = await Task.create(req.body)
    res.status(StatusCodes.CREATED).json({ task })
  } catch (error) {
    next({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Failed to create task'
    })
  }
}

// PATCH Request (Update task)
const updateTask = async (req, res, next) => {
  try {
    const { id: taskID } = req.params

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true
    })

    if (!task) {
      next({
        statusCode: StatusCodes.NOT_FOUND,
        message: `No task with ID : ${taskID}`
      })
      return
    }

    res.status(200).json({ task })
  } catch (error) {
    next({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Failed to update a task'
    })
  }
}

// DELETE Request (Delete task)
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })

    if (!task) {
      next({
        statusCode: StatusCodes.NOT_FOUND,
        message: `No task with ID : ${taskID}`
      })
      return
    }

    res.status(201).json({ msg: 'Deleted Successfully' })
  } catch (error) {
    next({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Failed to delete a task'
    })
  }
}

module.exports = {
  getAllTasks,
  getCompletedTasks,
  getInompletedTasks,
  getTasksA_Z,
  getTasksZ_A,
  createNewTask,
  getSingleTask,
  updateTask,
  deleteTask
}
