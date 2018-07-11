window.createBtnEventHandler = function() {
  var createTaskForm = document.getElementById('create_task');
  if (createTaskForm) {
    createTaskForm.onsubmit = function(event) {
      submitListener(event, taskFormSubmit, createTaskForm, 
        function(responseText) {
          var table = document.getElementsByClassName('tasks')[0];
          var newRow = table.insertRow();
          newRow.innerHTML = responseText;
          newRow.className = newRow.previousElementSibling.className;
          addEventListenersToTaskActions(newRow);
          var closeBtn = createTaskForm.parentElement.getElementsByClassName('modal-close')[0];
          if (closeBtn) {
            closeBtn.click();
          }
        }
      );
    };
  }

  var editTaskForm = document.getElementById('edit_task');
  if (editTaskForm) {
    editTaskForm.onsubmit = function(event) {
      submitListener(event, taskFormSubmit, editTaskForm, 
        function(responseText) {
          var table = document.getElementsByClassName('tasks')[0];
          var rowIndex = editTaskForm.dataset.rowIndex;
          var replacedRow = table.rows[parseInt(rowIndex)];
          replacedRow.innerHTML = responseText;
          addEventListenersToTaskActions(replacedRow);
          var closeBtn = createTaskForm.parentElement.getElementsByClassName('modal-close')[0];
          if (closeBtn) {
            closeBtn.click();
          }
        }
      );
    };
  }

  var createTodolistForm = document.getElementById('create_todolist');
  if (createTodolistForm) {
    createTodolistForm.onsubmit = function(event) {
      submitListener(event, todolistFormSubmit, createTodolistForm, 
        function(responseText) {
          var table = document.getElementsByClassName('todolists')[0].getElementsByTagName('tbody')[0];
          var newRow = table.insertRow();
          newRow.innerHTML = responseText;
          newRow.className = newRow.previousElementSibling.className;
          window.flatpickrInitTableEl(newRow.querySelector('input.todolist-end-time'));
          addEventListenersToTodolistActions(newRow);
          var closeBtn = createTodolistForm.parentElement.getElementsByClassName('modal-close')[0];
          if (closeBtn) {
            closeBtn.click();
          }
        }
      );
    };
  }

  var editTodolistForm = document.getElementById('edit_todolist');
  if (editTodolistForm) {
    editTodolistForm.onsubmit = function(event) {
      submitListener(event, todolistFormSubmit, editTodolistForm,
        function(responseText) {
          var rowIndex = editTodolistForm.dataset.rowIndex;
          var table = document.getElementsByClassName('todolists')[0];
          var replacedRow = table.rows[parseInt(rowIndex)];
          replacedRow.innerHTML = responseText;
          addEventListenersToTodolistActions(replacedRow);
          var closeBtn = editTodolistForm.parentElement.getElementsByClassName('modal-close')[0];
          if (closeBtn) {
            closeBtn.click();
          }
        }
      );
    };
  }
};

function objectToParams(obj) {
  var keys = Object.keys(obj);
  var params = [];
  for (var i in keys) {
    params.push(keys[i] + '=' + obj[keys[i]]);
  }
  return params.join('&');
}

function taskFormSubmit(form, callback) {
  var data = {};
  data['name'] = form.name.value;
  data['id'] = form.todolistId.value;
  data['status'] = form.status.checked ? 1 : 0;
  data['description'] = form.description.value;
  var params = objectToParams(data);
  var ajaxParams = {};
  ajaxParams.url = form.action;
  ajaxParams.params = params;
  ajaxParams.method = form.method;
  sendAJAX(ajaxParams, function(responseText) {
    callback(responseText);
  });
}

function todolistFormSubmit(form, callback) {
  var data = {};
  data['name'] = form.name.value;
  data['end_time'] = form.end_time.value;
  var params = objectToParams(data);
  var ajaxParams = {};
  ajaxParams.url = form.action;
  ajaxParams.params = params;
  ajaxParams.method = form.method;
  form.name.value = null;
  form.end_time._flatpickr.clear();
  sendAJAX(ajaxParams, function(responseText) {
    callback(responseText);
  });
}

function addEventListenersToTaskActions(newRow) {
  var newColumns = newRow.childNodes;
  for (var i in newColumns) {
    if (newColumns[i].className == 'task-actions') {
      for (var j in newColumns[i].childNodes) {
        // Устанавливаем обработчики события на вновь поступившие кнопки
        var link = newColumns[i].childNodes[j];
        if (link.className == 'delete-task-btn') {
          setDeleteActionEventListener(newColumns[i].childNodes[j]);
        } else if (link.className == 'edit-task-btn') {
          setEditTaskEventListener(link);
        }
      }
      break;
    }
  }
}

function addEventListenersToTodolistActions(newRow) {
  var newColumns = newRow.childNodes;
  for (var i in newColumns) {
    if (newColumns[i].className == 'todolist-actions') {
      for (var j in newColumns[i].childNodes) {
        // Устанавливаем обработчики события на вновь поступившие кнопки
        var link = newColumns[i].childNodes[j];
        if (link.className == 'delete-todolist-btn') {
          setDeleteActionEventListener(newColumns[i].childNodes[j]);
        } else if (link.className == 'edit-todolist-btn') {
          setEditTodolistEventListener(link);
        }
      }
      break;
    }
  }
}

window.setDeleteActionEventListeners = function() {
  var deleteTaskBtns = Array.from(document.getElementsByClassName('delete-task-btn'));
  var deleteTodolistBtns = Array.from(document.getElementsByClassName('delete-todolist-btn'));
  var btns = deleteTaskBtns.concat(deleteTodolistBtns);
  for (var i = 0; i < btns.length; i++) {
    setDeleteActionEventListener(btns[i]);
  }
};

function setDeleteActionEventListener(btn) {
  btn.onclick = function(event) {
    event.preventDefault();
    var ajaxParams = {};
    ajaxParams.url = this.href;
    ajaxParams.params = null;
    ajaxParams.method = this.dataset.method;
    ajaxParams.responseType = 'json';
    var _this = this;
    sendAJAX(ajaxParams, function(response) {
      if (response.msg == 'ok') {
        var row = _this.parentElement.parentElement;
        row.parentNode.removeChild(row);
      }
    });
  };
}

window.setEditActionEventListeners = function() {
  var editTodolistBtns = document.querySelectorAll('a.edit-todolist-btn');
  for (var i = 0; i < editTodolistBtns.length; i++) {
    setEditTodolistEventListener(editTodolistBtns[i]);
  }
  var editTaskBtns = document.querySelectorAll('a.edit-task-btn');
  for (i = 0; i < editTaskBtns.length; i++) {
    setEditTaskEventListener(editTaskBtns[i]);
  }
};

function setEditTodolistEventListener(btn) {
  btn.onclick = function(event) {
    event.preventDefault();
    var parentRow = this.parentElement.parentElement;
    var timeValue = parentRow.getElementsByTagName('input')[0].value;
    var nameValue = parentRow.getElementsByClassName('todolist-name')[0].innerText;
    var form = document.getElementById('edit_todolist');
    form.name.value = nameValue;
    form.end_time.value = timeValue;
    if(!form.end_time._flatpickr) {
      flatpickr(form.end_time, {
        enableTime: true,
        altInput: true,
        altFormat: 'F j, Y H:i',
        dateFormat: 'H:i Y-m-d'
      });
    }
    form.action = this.href;
    form.method = this.dataset.method;
    form.dataset.rowIndex = parentRow.rowIndex;
    document.getElementById('edit_modal').style.display = 'block';
  };
}

function setEditTaskEventListener(btn) {
  btn.onclick = function(event) {
    event.preventDefault();
    var parentRow = this.parentElement.parentElement;
    var nameValue = parentRow.getElementsByClassName('task-name')[0].innerText;
    var statusValue = parentRow.getElementsByClassName('task-status')[0].innerText;
    var descriptionValue = parentRow.getElementsByClassName('task-description')[0].innerText;
    var form = document.getElementById('edit_task');
    form.name.value = nameValue;
    form.status.checked = statusValue === 'true';
    form.description.value = descriptionValue;
    form.action = this.href;
    form.method = this.dataset.method;
    form.dataset.rowIndex = parentRow.rowIndex;
    document.getElementById('edit_modal').style.display = 'block';
  };
}

function submitListener(event, callback) {
  event.preventDefault();
  callback(arguments[2], arguments[3]);
}

function sendAJAX(ajaxParams = {}, callback) {
  if (ajaxParams === {}) {
    return false;
  }
  var xhr = new XMLHttpRequest();
  if (ajaxParams.responseType) {
    xhr.responseType = ajaxParams.responseType;
  }
  xhr.open(ajaxParams.method.toUpperCase(),
    ajaxParams.url,
    true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      if (callback) {
        if (ajaxParams.responseType === 'json') {
          callback(xhr.response);
        } else {
          callback(xhr.responseText);
        }
      }
    }
  };
  xhr.send(ajaxParams.params);
}
