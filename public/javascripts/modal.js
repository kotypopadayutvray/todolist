window.initModal = function() {
  var btn = document.getElementById('show_modal');
  var spans = document.getElementsByClassName('modal-close');
  var modals = document.getElementsByClassName('form-modal');
  var create_modal = document.getElementById('create_modal');
  if (btn) {
    btn.onclick = function() {
      create_modal.style.display = 'block';
    };
  }
  if (spans.length) {
    for (var i = spans.length - 1; i >= 0; i--) {
      spans[i].onclick = function() {
        create_modal.style.display = 'none';
      };
    }
  }
  if (modals.length) {
    window.onclick = function(event) {
      for (var i in modals) {
        if (event.target == modals[i]) {
          modals[i].style.display = 'none';
        }
      }
    };
  }
};
