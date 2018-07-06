window.initModal = function() {
  var btn = document.getElementById('show_modal');
  var span = document.getElementById('close_modal');
  var modal = document.getElementById('form_modal');
  btn.onclick = function() {
    modal.style.display = 'block';
  };
  span.onclick = function() {
    modal.style.display = 'none';
  };
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
};
