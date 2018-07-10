window.createBtnEventHandler = function() {
  var createTaskForm = document.getElementById('create_task');
  if (createTaskForm) {
    createTaskForm.onsubmit = function(event) {
      submitListener(event, function() {
        var data = {};
        data['name'] = createTaskForm.name.value;
        data['id'] = createTaskForm.todolistId.value;
        data['status'] = createTaskForm.status.checked ? 1 : 0;
        data['description'] = createTaskForm.description.value;
        var keys = Object.keys(data);
        var params = [];
        for (var i in keys) {
          params.push(keys[i] + '=' + data[keys[i]]);
        }
        params = params.join('&');
        var ajaxParams = {};
        ajaxParams.url = createTaskForm.action;
        ajaxParams.params = params;
        ajaxParams.method = createTaskForm.method;
        sendAJAX(ajaxParams, function(responseText) {
          var table = document.getElementsByClassName('tasks')[0];
          var newRow = table.insertRow();
          newRow.innerHTML = responseText;
          addEventListenersToTaskActions(newRow);
          var closeBtn = document.getElementById('close_modal');
          if (closeBtn) {
            closeBtn.click();
          }
        });
      });
    };
  }
  var createTodolistForm = document.getElementById('create_todolist');
  if (createTodolistForm) {
    createTodolistForm.onsubmit = function(event) {
      submitListener(event, function() {
        var data = {};
        data['name'] = createTodolistForm.name.value;
        data['end_time'] = createTodolistForm.end_time.value;
        var keys = Object.keys(data);
        var params = [];
        for (var i in keys) {
          params.push(keys[i] + '=' + data[keys[i]]);
        }
        params = params.join('&');
        var ajaxParams = {};
        ajaxParams.url = createTodolistForm.action;
        ajaxParams.params = params;
        ajaxParams.method = createTodolistForm.method;
        sendAJAX(ajaxParams, function(responseText) {
          var table = document.getElementsByClassName('todolists')[0];
          var newRow = table.insertRow();
          newRow.innerHTML = responseText;
          var newColumns = newRow.childNodes;
          addEventListenersToTodolistActions(newRow);
          var closeBtn = document.getElementById('close_modal');
          if (closeBtn) {
            closeBtn.click();
          }
        });
      });
    };
  }
};

function addEventListenersToTaskActions(newRow) {
  var newColumns = newRow.childNodes;
  for (var i in newColumns) {
    if (newColumns[i].className == 'task-actions') {
      for (var j in newColumns[i].childNodes) {
        // Устанавливаем обработчики события на вновь поступившие кнопки
        var link = newColumns[i].childNodes[j];
        if (link.className == 'delete-task') {
          setDeleteActionEventListener(newColumns[i].childNodes[j]);
        } // else if (link.className == 'delete-todolist') {

        // }
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
        if (link.className == 'delete-todolist') {
          setDeleteActionEventListener(newColumns[i].childNodes[j]);
        } // else if (link.className == 'delete-todolist') {

        // }
      }
      break;
    }
  }
}

window.setDeleteActionEventListeners = function() {
  var deleteTaskBtns = Array.from(document.getElementsByClassName('delete-task'));
  var deleteTodolistBtns = Array.from(document.getElementsByClassName('delete-todolist'));
  var btns = deleteTaskBtns.concat(deleteTodolistBtns);
  for (var i in btns) {
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
  var editTaskBtns = document.getElementsByClassName('edit-task');
  for (var i in editTaskBtns) {
    editTaskBtns[i].onclick = function(event) {
      event.preventDefault();
      var form = document.getElementById('edit_task');
      form.action = this.href;
      // form.name.value = ;
      form.todolistId.value = this.dataset.todolist_id;
      // form.description.value = ;
    };
  }
  var editTodolistBtns = document.getElementsByClassName('edit-todolist');
  for (i in editTodolistBtns) {
    editTodolistBtns[i].onclick = function(event) {
      event.preventDefault();
      var form = document.getElementById('edit_todolist');
      // form.name.value = ;
      // form.end_time.value = ;
    };
  }
};

function submitListener(event, callback) {
  event.preventDefault();
  callback();
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
