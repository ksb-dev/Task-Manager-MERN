const express = require('express')
const router = express.Router()

const {
  getAllTasks,
  getCompletedTasks,
  getInompletedTasks,
  getTasksA_Z,
  getTasksZ_A,
  createNewTask,
  getSingleTask,
  updateTask,
  deleteTask
} = require('../controllers/tasks')

router.get('/', getAllTasks)
router.get('/completed', getCompletedTasks)
router.get('/incompleted', getInompletedTasks)
router.get('/name/asc', getTasksA_Z)
router.get('/name/desc', getTasksZ_A)
router.post('/', createNewTask)
router.get('/:id', getSingleTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router
