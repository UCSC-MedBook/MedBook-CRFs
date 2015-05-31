(function(){
Template.__checkName("sidebarMenu");
Template["sidebarMenu"] = new Template("Template.sidebarMenu", (function() {
  var view = this;
  return HTML.ASIDE({
    id: "sidebarMenu"
  }, HTML.Raw('\n     <!-- <div  class="MainCRFLists" style="height:80px; margin-top: 10px; margin-left:10px">\n        {{> MedBookNavigator}}\n     </div> -->\n    '), HTML.DIV({
    id: "accountEntryButtons",
    "class": "MainCRFLists btns-group-vertical"
  }, "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n          ", HTML.A({
      id: "logoutButton",
      "class": "js-logout btn-secondary"
    }, "Logout"), "\n      " ];
  }, function() {
    return [ "\n          ", HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), "signin");
      },
      "class": "btn-secondary"
    }, "Sign In"), "\n      ", HTML.Comment('\n          <a href="{{pathFor \'join\'}}" class="btn-secondary">Join</a>\n          '), "\n      " ];
  }), "\n      ", HTML.Raw("<hr>"), "\n    ", HTML.Raw('<!-- </div>\n\n    <div class="MainCRFLists" style="margin-bottom:20px!important;" > -->'), "\n     ", HTML.Raw("<!-- <h3><center>Find Patient</center></h3> -->"), "\n     ", HTML.Raw("<!-- {{> selectPatient }} -->"), "\n     ", Blaze._TemplateWith(function() {
    return {
      go: Spacebars.call(true)
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("Patient_ID"));
  }), "\n\n     ", HTML.Raw("<hr>"), "\n        ", HTML.Raw("<!-- <h3><center>Find Form</center></h3> -->"), "\n     ", HTML.Raw('<!--\n         <a class="js-new-list link-list-new"><span class="icon-plus"></span>New List</a>\n     -->'), "\n         ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("personalPreferredTableOrder"));
  }, function() {
    return [ "\n           ", HTML.A({
      id: function() {
        return [ Spacebars.mustache(view.lookup(".")), "Button" ];
      },
      href: function() {
        return [ "/CRF/lists/", Spacebars.mustache(view.lookup(".")) ];
      },
      "class": function() {
        return [ "notdraggable list-1-CRF ", Spacebars.mustache(view.lookup("activeListClass")) ];
      },
      title: function() {
        return Spacebars.mustache(view.lookup("."));
      }
    }, "\n             ", Blaze.If(function() {
      return Spacebars.call(view.lookup("userId"));
    }, function() {
      return [ "\n               ", HTML.SPAN({
        "class": "icon-lock"
      }), "\n             " ];
    }), "\n             ", Blaze.If(function() {
      return Spacebars.call(view.lookup("incompleteCount"));
    }, function() {
      return [ "\n               ", HTML.SPAN({
        "class": "count-list"
      }, Blaze.View("lookup:incompleteCount", function() {
        return Spacebars.mustache(view.lookup("incompleteCount"));
      })), "\n             " ];
    }), "\n             ", Blaze.View("lookup:.", function() {
      return Spacebars.mustache(view.lookup("."));
    }), "\n             ", HTML.SPAN({
      "class": "handle",
      title: "Drag handle up or down to rearrange order"
    }, "\n                 ", HTML.I({
      "class": "fa fa-reorder"
    }), "\n             "), "\n           "), "\n         " ];
  }), "\n\n\n\n    "), HTML.Raw("\n\n    <!-- {{> MainCRFLists }} -->\n\n  "));
}));

Template.__checkName("MainCRFLists");
Template["MainCRFLists"] = new Template("Template.MainCRFLists", (function() {
  var view = this;
  return "";
}));

})();
