window.flatpickrInit = function() {
  var endTimeInput = document.getElementById('end_time_input');
  if (endTimeInput) {
    var flatpickrInput = flatpickr(endTimeInput, {
      enableTime: true,
      altInput: true,
      altFormat: 'F j, Y H:i',
      dateFormat: 'H:i Y-m-d'
    });
  }
  var todolistEndTimes = document.getElementsByClassName('todolist-end-time');
  if (todolistEndTimes.length) {
    flatpickr('.todolist-end-time', {
      enableTime: true,
      altInput: true,
      altFormat: 'F j, Y H:i',
      dateFormat: 'H:i Y-m-d',
      clickOpens: false
    });
  }
};
