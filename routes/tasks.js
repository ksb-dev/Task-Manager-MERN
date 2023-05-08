const express = require('express')
const router = express.Router()

const {
  getAllTasks,
  getCompletedTasks,
  getInompletedTasks,
  createNewTask,
  getSingleTask,
  updateTask,
  deleteTask
} = require('../controllers/tasks')

router.get('/', getAllTasks)
router.get('/completed', getCompletedTasks)
router.get('/incompleted', getInompletedTasks)
router.post('/', createNewTask)
router.get('/:id', getSingleTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router
