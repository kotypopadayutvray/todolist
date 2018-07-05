window.createTaskBtnEventHandler = function() {
  var createTaskBtn = document.getElementById('create_task');
  if (createTaskBtn) {
    createTaskBtn.onclick = function(event) {
      event.preventDefault();
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/tasks/task', true);
      xhr.send();
      xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
          alert(xhr.responseText);
        }
      };
    };
  }
};