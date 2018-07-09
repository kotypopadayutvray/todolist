window.onload = function() {
  var initFunctions = [];
  initFunctions.push('initModal');
  initFunctions.push('flatpickrInit');
  initFunctions.push('createTaskBtnEventHandler');
  for (var i in initFunctions) {
    if (typeof(window[initFunctions[i]]) == 'function')
      window[initFunctions[i]]();
  }
};
