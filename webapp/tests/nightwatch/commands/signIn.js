exports.command = function(username, password) {

  this
    .waitForElementVisible('#entrySignIn', 1000)
    
      .verify.elementPresent("#emailInput")
      .verify.elementPresent("#passwordInput")

      .setValue("#emailInput", username)
      .setValue("#passwordInput", password)

    .click("#signInToAppButton").pause(1000)

  return this; // allows the command to be chained.
};
