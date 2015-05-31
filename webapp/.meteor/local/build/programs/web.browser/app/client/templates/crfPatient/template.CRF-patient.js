(function(){
Template.__checkName("CRFsPatient");
Template["CRFsPatient"] = new Template("Template.CRFsPatient", (function() {
  var view = this;
  return HTML.DIV({
    "class": "page lists-show"
  }, "\n    ", HTML.NAV({
    "class": "js-title-nav"
  }, "\n    ", HTML.H2("Focus on Patient ", Blaze.View("lookup:Current_Patient_ID", function() {
    return Spacebars.mustache(view.lookup("Current_Patient_ID"));
  })), "\n\n    "), "\n\n      ", HTML.DIV({
    "class": "content-scrollable CRF-items",
    style: "margin-left:20px"
  }, "\n\n         ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("collectionsInPreferredTableOrder"));
  }, function() {
    return [ "\n         ", HTML.H2("\n            ", Blaze.View("lookup:..displayName", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "displayName"));
    }), " ", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), " ", Blaze.View("lookup:..count", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "count"));
    }), " ", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), " entries\n         "), "\n             ", Blaze._TemplateWith(function() {
      return {
        showFilter: Spacebars.call(false),
        showNavigation: Spacebars.call("auto"),
        collection: Spacebars.call(Spacebars.dot(view.lookup("."), "docs")),
        "class": Spacebars.call("table table-bordered table-hover"),
        settings: Spacebars.call(view.lookup("reactiveTableSettings"))
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("reactiveTable"));
    }), "\n              ", HTML.BR(), "\n         " ];
  }), "\n\n      "), "\n  ");
}));

})();
