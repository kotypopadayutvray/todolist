window.createTaskBtnEventHandler = function() {
  var createTaskBtn = document.getElementById('create_task');
  if (createTaskBtn) {
    createTaskBtn.onclick = function(event) {
      event.preventDefault();
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/tasks/task', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
          console.log(xhr);
          alert(xhr.responseText);
        }
      };
      var form = document.forms[0];
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
      console.log(data);
      xhr.send(params);
    };
  }
};