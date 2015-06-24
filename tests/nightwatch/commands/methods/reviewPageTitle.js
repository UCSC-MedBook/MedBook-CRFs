exports.command = function(pageTitle) {
  this
    .verify.elementPresent(".title-wrapper")
    .verify.containsText(".title-wrapper", pageTitle)

  return this;
};
