window.initModal = function() {
  var btn = document.getElementById('show_modal');
  var span = document.getElementById('close_modal');
  var modal = document.getElementById('form_modal');
  if (btn) {
    btn.onclick = function() {
      modal.style.display = 'block';
    };
  }
  if (span) {
    span.onclick = function() {
      modal.style.display = 'none';
    };
  }
  if (modal) {
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  }
};
