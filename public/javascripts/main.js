window.onload = function() {
  var initFunctions = [];
  initFunctions.push('createTaskBtnEventHandler');
  initFunctions.push('flatpickrInit');
  for (var i in initFunctions) {
    if (typeof(window[initFunctions[i]]) == 'function')
      window[initFunctions[i]]();
  }
};
