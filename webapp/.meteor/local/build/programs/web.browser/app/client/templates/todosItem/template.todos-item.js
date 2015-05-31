(function(){
Template.__checkName("CRFsItem");
Template["CRFsItem"] = new Template("Template.CRFsItem", (function() {
  var view = this;
  return HTML.DIV({
    "class": function() {
      return [ "CRF-item ", Spacebars.mustache(view.lookup("checkedClass")), " ", Spacebars.mustache(view.lookup("editingClass")) ];
    }
  }, "\n    ", HTML.LABEL({
    "class": "checkbox"
  }, "\n      ", HTML.INPUT({
    type: "checkbox",
    checked: function() {
      return Spacebars.mustache(view.lookup("checked"));
    },
    name: "checked"
  }), "\n      ", HTML.Raw('<span class="checkbox-custom"></span>'), "\n    "), "\n\n    ", HTML.INPUT({
    type: "text",
    value: function() {
      return Spacebars.mustache(view.lookup("text"));
    },
    placeholder: "Task name"
  }), HTML.Raw('\n    <a class="js-delete-item delete-item" href="#"><span class="icon-trash"></span></a>\n  '));
}));

})();
