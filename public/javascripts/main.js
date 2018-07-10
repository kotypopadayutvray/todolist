window.onload = function() {
  var initFunctions = [];
  initFunctions.push('initModal');
  initFunctions.push('flatpickrInit');
  initFunctions.push('createBtnEventHandler');
  initFunctions.push('setEditActionEventListeners');
  initFunctions.push('setDeleteActionEventListeners');
  for (var i in initFunctions) {
    if (typeof(window[initFunctions[i]]) == 'function')
      window[initFunctions[i]]();
  }
};
