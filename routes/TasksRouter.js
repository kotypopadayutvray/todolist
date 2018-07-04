var express = require('express');
var router = express.Router();

var tasksController = require('../application/controllers/TasksController');

router.get('/', isAuthenticated, tasksController.todolists);
router.put('/task/:id', isAuthenticated, tasksController.updateTask);
router.post('/task', isAuthenticated, tasksController.createTask);
router.delete('/task/:id', isAuthenticated, tasksController.deleteTask);
router.get('/todolist/:id', isAuthenticated, tasksController.todolist);
router.put('/todolist/:id', isAuthenticated, tasksController.updateTodolist);
router.post('/todolist', isAuthenticated, tasksController.createTodolist);
router.delete('/todolist/:id', isAuthenticated, tasksController.deleteTodolist);

function isAuthenticated(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  response.redirect('/');
}

module.exports = router;
