(function(){
Template.__checkName("renderAutoForm");
Template["renderAutoForm"] = new Template("Template.renderAutoForm", (function() {
  var view = this;
  return HTML.DIV({
    "class": "content-scrollable CRF-items",
    style: "margin-left:20px"
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("previousEntries"));
  }, function() {
    return [ "\n      Previous entries:\n        ", Blaze._TemplateWith(function() {
      return {
        collection: Spacebars.call(view.lookup("previousEntries")),
        "class": Spacebars.call("table table-bordered table-hover"),
        settings: Spacebars.call(view.lookup("settings"))
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("reactiveTable"));
    }), "\n      " ];
  }, function() {
    return [ " ", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), "\n        There are no previous entries.\n      " ];
  }), "\n\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("filter"));
  }, function() {
    return [ "\n        Filtering on ", Blaze.View("lookup:filter", function() {
      return Spacebars.mustache(view.lookup("filter"));
    }), "\n      " ];
  }), "\n\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("readOnly"));
  }, function() {
    return "\n        This is a Read Only Table (information comes comes OnCore or other system).\n      ";
  }, function() {
    return [ "\n\n      ", HTML.HR(), "\n\n      ", HTML.Comment(" <span>collectino: {{collection}}</span><br>\n      <span>fields: {{fields}}</span><br>\n      <span>doc: {{doc}}</span><br>\n      <span>update: {{update}}</span><br> "), "\n\n        ", Blaze._TemplateWith(function() {
      return {
        id: Spacebars.call("CRFquickForm"),
        collection: Spacebars.call(view.lookup("collection")),
        fields: Spacebars.call(view.lookup("fields")),
        doc: Spacebars.call(view.lookup("doc")),
        type: Spacebars.call(view.lookup("update")),
        template: Spacebars.call("bootstrap3-horizontal"),
        "label-class": Spacebars.call("col-sm-3"),
        "input-col-class": Spacebars.call("col-sm-9")
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("quickForm"));
    }), "\n      " ];
  }), "\n    ");
}));

})();
