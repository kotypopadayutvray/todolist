window.createTaskBtnEventHandler = function() {
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
          var closeBtn = document.getElementById('close_modal');
          if (closeBtn) {
            closeBtn.click();
          }
        });
      });
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
        callback(xhr.responseText);
      }
    }
  };
  xhr.send(ajaxParams.params);
}
