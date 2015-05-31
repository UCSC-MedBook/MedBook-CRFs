(function(){
Template.__checkName("CRFsShow");
Template["CRFsShow"] = new Template("Template.CRFsShow", (function() {
  var view = this;
  return HTML.DIV({
    "class": "page lists-show"
  }, "\n    ", HTML.NAV({
    "class": "js-title-nav"
  }, "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("editing"));
  }, function() {
    return [ "\n        ", HTML.FORM({
      "class": "js-edit-form list-edit-form"
    }, "\n          ", HTML.INPUT({
      name: "name",
      type: "text",
      value: function() {
        return Spacebars.mustache(view.lookup("name"));
      }
    }), "\n            ", HTML.DIV({
      "class": "nav-group right"
    }, "\n              ", HTML.A({
      "class": "js-cancel nav-item",
      href: "#"
    }, "\n                ", HTML.SPAN({
      "class": "icon-close js-cancel",
      title: "Cancel"
    }), "\n              "), "\n            "), "\n          "), "\n          " ];
  }, function() {
    return [ "\n          ", HTML.DIV({
      "class": "nav-group"
    }, "\n            ", HTML.A({
      "class": "js-menu nav-item",
      href: "#"
    }, "\n              ", HTML.SPAN({
      "class": "icon-list-unordered",
      title: "Show menu"
    }), "\n            "), "\n          "), "\n          ", HTML.H1({
      "class": "js-edit-list title-page"
    }, HTML.SPAN({
      "class": "title-wrapper"
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    }))), "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("readOnly"));
    }, function() {
      return [ "\n            ", HTML.DIV({
        "class": "topMesg",
        style: "background:white"
      }, "This is a Read Only Table\n              (information comes from OnCore or other system)."), "\n            " ];
    }, function() {
      return [ "\n            ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("phaseIs"), "none");
      }, function() {
        return [ "\n              ", HTML.DIV({
          "class": "topMesg",
          style: "background:lightyellow"
        }, "Please select a patient other than 000."), "\n              " ];
      }, function() {
        return [ "\n              ", Blaze.If(function() {
          return Spacebars.dataMustache(view.lookup("phaseIs"), "inserting");
        }, function() {
          return [ "\n                ", HTML.DIV({
            "class": "topMesg",
            style: "background:lightgreen"
          }, "New patient record for this form.\n                "), "\n                " ];
        }, function() {
          return [ "\n                ", Blaze.If(function() {
            return Spacebars.dataMustache(view.lookup("phaseIs"), "updating");
          }, function() {
            return [ "\n                  ", HTML.DIV({
              "class": "topMesg",
              style: "background:yellow"
            }, "Caution: you are updating an existing patient record.\n                  "), "\n                " ];
          }), "\n              " ];
        }), "\n            " ];
      }), "\n          " ];
    }), "\n        " ];
  }), "\n      "), "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentForm"));
  }, function() {
    return [ "\n        ", Blaze._TemplateWith(function() {
      return {
        collection: Spacebars.call(view.lookup("currentForm")),
        fields: Spacebars.call(view.lookup("fieldOrder")),
        doc: Spacebars.call(view.lookup("currentDoc")),
        filter: Spacebars.call(view.lookup("CRF_filter")),
        settings: Spacebars.call(view.lookup("reactiveTableSettings")),
        previousEntries: Spacebars.call(view.lookup("previousEntries"))
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("renderAutoForm"));
    }), "\n      " ];
  }), "\n    ");
}));

})();
