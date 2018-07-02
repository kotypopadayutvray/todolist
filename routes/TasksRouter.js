var express = require('express');
var router = express.Router();

var tasksController = require('../application/controllers/TasksController');

router.get('/', isAuthenticated, tasksController.todolists);
router.post('/task/update/:id', isAuthenticated, tasksController.updateTask);
router.post('/task', isAuthenticated, tasksController.createTask);
router.delete('/task/:id', isAuthenticated, tasksController.deleteTask);
router.get('/todolist/:id', isAuthenticated, tasksController.todolist);
router.post('/todolist/update/:id', isAuthenticated, tasksController.updateTodolist);
router.post('/todolist', isAuthenticated, tasksController.createTodolist);
router.delete('/todolist/:id', isAuthenticated, tasksController.deleteTodolist);

function isAuthenticated(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  response.redirect('/');
}

module.exports = router;
