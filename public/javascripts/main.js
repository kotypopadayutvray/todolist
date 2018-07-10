window.onload = function() {
  var initFunctions = [];
  initFunctions.push('initModal');
  initFunctions.push('flatpickrInit');
  initFunctions.push('createBtnEventHandler');
  for (var i in initFunctions) {
    if (typeof(window[initFunctions[i]]) == 'function')
      window[initFunctions[i]]();
  }
};
