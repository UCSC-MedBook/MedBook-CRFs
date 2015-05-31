(function(){
Template.__checkName("appBody");
Template["appBody"] = new Template("Template.appBody", (function() {
  var view = this;
  return HTML.DIV({
    id: "container",
    "class": function() {
      return [ Spacebars.mustache(view.lookup("menuOpen")), " ", Spacebars.mustache(view.lookup("cordova")) ];
    }
  }, "\n\n\n    ", Spacebars.include(view.lookupTemplate("sidebarMenu")), "\n\n\n    ", Blaze.Unless(function() {
    return Spacebars.call(view.lookup("connected"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      "class": "notifications"
    }, "\n        ", HTML.DIV({
      "class": "notification"
    }, "\n          ", HTML.SPAN({
      "class": "icon-sync"
    }), "\n          ", HTML.DIV({
      "class": "meta"
    }, "\n            ", HTML.DIV({
      "class": "title-notification"
    }, "Trying to connect"), "\n            ", HTML.DIV({
      "class": "description"
    }, "There seems to be a connection issue"), "\n          "), "\n        "), "\n      "), "\n    " ];
  }), HTML.Raw('\n\n    <div class="content-overlay"></div>\n\n    '), HTML.DIV({
    id: "content-container"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("thisArray"));
  }, function() {
    return [ "\n        ", Spacebars.include(view.lookupTemplate("yield")), "\n      " ];
  }), "\n    "), "\n  ");
}));

})();
