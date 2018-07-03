var express = require('express');
var router = express.Router();

var tasksController = require('../application/controllers/UserController');

router.get('/', tasksController.todolists);
router.post('/task', tasksController.createTask);
router.update('/task/:id', tasksController.updateTask);
router.delete('/task/:id', tasksController.deleteTask);
router.get('/todolist/:id', tasksController.todolist);
router.post('/todolist/:id', tasksController.createTodolist);
router.update('/todolist/:id', tasksController.updateTodolist);
router.delete('/todolist/:id', tasksController.deleteTodolist);

module.exports = router;
