// Return object with locals for using in templates
exports.partialLocals = function(title, request) {
  return {
    title: title,
    authenticated: request.isAuthenticated()
  };
};
