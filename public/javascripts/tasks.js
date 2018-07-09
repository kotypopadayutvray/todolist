window.createTaskBtnEventHandler = function() {
  var form = document.getElementById('create_task');
  if (form) {
    form.onsubmit = function(event) {
      event.preventDefault();
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/tasks/task', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
          var table = document.getElementsByClassName('tasks')[0];
          var newRow = table.insertRow();
          newRow.innerHTML = xhr.responseText;
          // Do checking if modal window is open
          var closeBtn = document.getElementById('close_modal');
          if (closeBtn) {
            closeBtn.click();
          }
        }
      };
      var data = {};
      data['name'] = form.name.value;
      data['id'] = form.todolistId.value;
      data['status'] = form.status.checked ? 1 : 0;
      data['description'] = form.description.value;
      var keys = Object.keys(data);
      var params = [];
      for (var i in keys) {
        params.push(keys[i] + '=' + data[keys[i]]);
      }
      params = params.join('&');
      xhr.send(params);
    };
  }
};
