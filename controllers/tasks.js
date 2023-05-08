const Task = require('../models/Task')

const getAllTasks = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query

  try {
    const tasks = await Task.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Task.countDocuments()

    res.json({
      tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })
  } catch (error) {
    next({ status: 500, msg: 'Failed to fetch tasks!' })
  }
}

const getCompletedTasks = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query

  try {
    const tasks = await Task.find({ completed: true })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Task.countDocuments()

    res.json({
      tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })
  } catch (error) {
    next({ status: 500, msg: 'Failed to fetch tasks!' })
  }
}

const getInompletedTasks = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query

  try {
    const tasks = await Task.find({ completed: false })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Task.countDocuments()

    res.json({
      tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })
  } catch (error) {
    next({ status: 500, msg: 'Failed to fetch tasks!' })
  }
}

const createNewTask = async (req, res, next) => {
  const { name } = req.body

  if (name === undefined || name === '') {
    next({ status: 500, msg: 'Please provide a task name' })
    return
  }

  if (name.length > 20) {
    next({ status: 500, msg: 'Task name can not be more than 20 characters' })
    return
  }

  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (error) {
    next({ status: 400, msg: 'Failed to create task' })
  }
}

const getSingleTask = async (req, res, next) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })

    if (!task) {
      next({ status: 404, msg: `No task with ID : ${taskID}` })
      return
    }

    res.status(201).json({ task })
  } catch (error) {
    next({ status: 400, msg: 'Failed to fetch a task' })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true
    })

    if (!task) {
      next({ status: 404, msg: `No task with ID : ${taskID}` })
      return
    }

    res.status(200).json({ task })
  } catch (error) {
    next({ status: 400, msg: 'Failed to update a task' })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })

    if (!task) {
      next({ status: 404, msg: `No task with ID : ${taskID}` })
      return
    }

    res.status(201).json({ msg: 'Deleted Successfully' })
  } catch (error) {
    next({ status: 400, msg: 'Failed to delete a task' })
  }
}

module.exports = {
  getAllTasks,
  getCompletedTasks,
  getInompletedTasks,
  createNewTask,
  getSingleTask,
  updateTask,
  deleteTask
}
