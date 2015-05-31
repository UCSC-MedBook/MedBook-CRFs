(function(){
Template.__checkName("Patient_ID");
Template["Patient_ID"] = new Template("Template.Patient_ID", (function() {
  var view = this;
  return HTML.SPAN("\n    ", HTML.SELECT(HTML.Attrs({
    "class": "Patient_ID form-control",
    type: "text",
    name: "Patient_ID"
  }, function() {
    return Spacebars.attrMustache(view.lookup("atts"));
  }), "\n      ", HTML.Raw('<!-- {{#each patients}}\n        <option value="{{patient}}">{{patient}}</option>\n      {{/each}} -->'), "\n    "), HTML.Raw('\n    <span class="info" hidden=""></span>\n  '));
}));

Template.__checkName("Sample_ID");
Template["Sample_ID"] = new Template("Template.Sample_ID", (function() {
  var view = this;
  return HTML.SPAN("\n    ", HTML.SELECT(HTML.Attrs({
    "class": "Sample_ID form-control",
    type: "text",
    name: "Sample_ID"
  }, function() {
    return Spacebars.attrMustache(view.lookup("atts"));
  }), "\n    "), HTML.Raw('&nbsp;&nbsp;\n    <span class="info" hidden=""></span>\n  '));
}));

})();
