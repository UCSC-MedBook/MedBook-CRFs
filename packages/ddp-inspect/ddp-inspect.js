// Write your package code here!


  var startDateTime = new Date();

  // log sent messages
  var _send = Meteor.connection._send;
  Meteor.connection._send = function (obj) {
    var message =  "no parse";

    try {
      message = JSON.parse(obj)
    } catch (a) {
      message =  "error parsing JSON object";
    }
    console.log("send", (new Date()) - startDateTime, message);
    _send.call(this, obj);
  };


  // log received messages
  Meteor.connection._stream.on('message', function (message) {
    console.log("receive: ", (new Date()) - startDateTime, message.length, message.substring(0,50));
  });
