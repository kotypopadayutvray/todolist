var express = require('express');
var router = express.Router();

var tasksController = require('../application/controllers/TasksController');

router.get('/', tasksController.todolists);
router.put('/task/:id', tasksController.updateTask);
router.post('/task', tasksController.createTask);
router.delete('/task/:id', tasksController.deleteTask);
router.get('/todolist/:id', tasksController.todolist);
router.put('/todolist/:id', tasksController.updateTodolist);
router.post('/todolist/:id', tasksController.createTodolist);
router.delete('/todolist/:id', tasksController.deleteTodolist);

module.exports = router;
