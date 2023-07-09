const express = require('express')
const router = express.Router()

const {
  getAllTasks,
  getCompletedTasks,
  getIncompletedTasks,
  getTasksA_Z,
  getTasksZ_A,
  createNewTask,
  getSingleTask,
  updateTask,
  deleteTask,
  getAllTaskaByName,
  getCompletedTaskaByName,
  getIncompletedTaskaByName
} = require('../controllers/taskController')

router.get('/', getAllTasks)
router.get('/completed', getCompletedTasks)
router.get('/incompleted', getIncompletedTasks)
router.get('/name/asc', getTasksA_Z)
router.get('/name/desc', getTasksZ_A)
router.get('/:id', getSingleTask)
router.get('/search/title', getAllTaskaByName)
router.get('/search/complete/title', getCompletedTaskaByName)
router.get('/search/incomplete/title', getIncompletedTaskaByName)

router.post('/', createNewTask)

router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router
