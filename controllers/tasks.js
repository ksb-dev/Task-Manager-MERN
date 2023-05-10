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
    handleRequest(req, res)
  } catch (error) {
    next({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      msg: 'Failed to fetch tasks!'
    })
  }
}

// 2. Get completed tasks
const getCompletedTasks = async (req, res, next) => {
  try {
    handleRequest(req, res, { completed: true })
  } catch (error) {
    next({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      msg: 'Failed to fetch tasks!'
    })
  }
}

// 3. Get incompleted tasks
const getInompletedTasks = async (req, res, next) => {
  try {
    handleRequest(req, res, { completed: false })
  } catch (error) {
    next({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      msg: 'Failed to fetch tasks!'
    })
  }
}

// 4. Get sorted (a-z) tasks
const getTasksA_Z = async (req, res, next) => {
  try {
    handleRequest(req, res, {}, { name: 1 })
  } catch (error) {
    next({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      msg: 'Failed to fetch tasks!'
    })
  }
}

// 5. Get sorted (z-a) tasks
const getTasksZ_A = async (req, res, next) => {
  try {
    handleRequest(req, res, {}, { name: -1 })
  } catch (error) {
    next({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      msg: 'Failed to fetch tasks!'
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
        status: StatusCodes.NOT_FOUND,
        msg: `No task with ID : ${taskID}`
      })
      return
    }

    res.status(201).json({ task })
  } catch (error) {
    next({ status: StatusCodes.BAD_REQUEST, msg: 'Failed to fetch a task' })
  }
}

// POST Request
const createNewTask = async (req, res, next) => {
  const { name } = req.body

  if (name === undefined || name === '') {
    next({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      msg: 'Please provide a task name'
    })
    return
  }

  if (name.length > 20) {
    next({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      msg: 'Task name can not be more than 20 characters'
    })
    return
  }

  try {
    const task = await Task.create(req.body)
    res.status(StatusCodes.CREATED).json({ task })
  } catch (error) {
    next({ status: StatusCodes.BAD_REQUEST, msg: 'Failed to create task' })
  }
}

// PATCH Request
const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true
    })

    if (!task) {
      next({
        status: StatusCodes.NOT_FOUND,
        msg: `No task with ID : ${taskID}`
      })
      return
    }

    res.status(200).json({ task })
  } catch (error) {
    next({ status: StatusCodes.BAD_REQUEST, msg: 'Failed to update a task' })
  }
}

// DELETE Request
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })

    if (!task) {
      next({
        status: StatusCodes.NOT_FOUND,
        msg: `No task with ID : ${taskID}`
      })
      return
    }

    res.status(201).json({ msg: 'Deleted Successfully' })
  } catch (error) {
    next({ status: StatusCodes.BAD_REQUEST, msg: 'Failed to delete a task' })
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
