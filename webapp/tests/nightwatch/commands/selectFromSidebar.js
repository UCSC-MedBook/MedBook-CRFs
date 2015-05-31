exports.command = function(sidebarButtonElement) {

  this
    .verify.elementPresent(sidebarButtonElement)
    .click(sidebarButtonElement).pause(1000)

  return this; // allows the command to be chained.
};
