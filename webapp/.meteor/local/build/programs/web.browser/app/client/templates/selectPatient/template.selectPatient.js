(function(){
Template.__checkName("selectPatient");
Template["selectPatient"] = new Template("Template.selectPatient", (function() {
  var view = this;
  return HTML.DIV({
    id: "selectPatient"
  }, "\n    ", HTML.SELECT(HTML.Attrs({
    id: "patientSelectMenu",
    "class": "Patient_ID form-control",
    type: "text",
    name: "Patient_ID"
  }, function() {
    return Spacebars.attrMustache(view.lookup("atts"));
  }), "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("patients"));
  }, function() {
    return [ "\n        ", HTML.OPTION({
      value: function() {
        return Spacebars.mustache(view.lookup("patient"));
      }
    }, Blaze.View("lookup:patient", function() {
      return Spacebars.mustache(view.lookup("patient"));
    })), "\n      " ];
  }), "\n    "), "\n  ");
}));

})();
