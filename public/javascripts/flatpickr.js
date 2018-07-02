window.flatpickrInit = function() {
  var endTimeInput = document.getElementById('end_time_input');
  if (endTimeInput) {
    if (endTimeInput.value && endTimeInput.value != '') {
      endTimeInput.value = formatDate(new Date(endTimeInput.value));
    }
    flatpickr(endTimeInput, {
      enableTime: true,
      altInput: true,
      altFormat: 'F j, Y H:i',
      dateFormat: 'H:i Y-m-d'
    });
  }
  var todolistEndTimes = document.querySelectorAll('input.todolist-end-time');
  if (todolistEndTimes.length) {
    for (var i = todolistEndTimes.length - 1; i >= 0; i--) {
      window.flatpickrInitTableEl(todolistEndTimes[i]);
    }
  }
};

window.flatpickrInitTableEl = function(el) {
  el.value = formatDate(new Date(el.value));
  flatpickr(el, {
    enableTime: true,
    altInput: true,
    altFormat: 'F j, Y H:i',
    dateFormat: 'H:i Y-m-d',
    clickOpens: false
  });
};

function formatDate(dateTime) {
  var time = dateTime.getHours() + ':' + dateTime.getMinutes();
  var month = parseInt(dateTime.getMonth()) + 1;
  var date = dateTime.getFullYear() + '-' + month + '-' + dateTime.getDate();
  return time + ' ' + date;
}
