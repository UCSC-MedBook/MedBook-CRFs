var EDITING_KEY = 'editingList';


Template.renderAutoForm.rendered = function() {
    /*
    if (Session.get("currentForm") == "Histology_Research") {
        $("input[name='Trichotomy']").prop("disabled", true);
        $("input[name='Small_Cell']").prop("disabled", true);
        $("input[name='Adeno']").prop("disabled", true);
    }

    if (Session.get("currentForm") == "Histology_Research") {
            Tracker.autorun(function() {
                 var doc = {};
                 doc.Histology_Call =  AutoForm.getFieldValue("CRFquickForm", "Histology_Call");
                 generate_histology_categories(doc);
             });
    }
    */
}
Template.renderAutoForm.events( {
     'click select[name="Histology_Call"]' : function(evt, tmpl) {
         var doc = {};
         doc.Histology_Call = $(evt.target).val();
         generate_histology_categories(doc);
         Object.keys(doc).map(function(key) {
             var elem = tmpl.find('input[name="' + key + '"]')
             if (elem)
                 $(elem).val(doc[key])
         });
     },
    'click .reactive-table tr': function (event) {
        Session.set("CurrentDoc", this);
     }
});


Template.CRFsShow.rendered = function() {


  this.find('.js-title-nav')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        this.remove();
      });
    }
  };


};
function simpleDate(obj) {
   if (obj == null)
        return obj;
   try {
        return moment(obj).utc().format("MM/DD/YYYY")
   } catch (reason) {
        console.log("simpleDate  mapping failed on column", obj, reason);
        return "Error (see Javascript console)";
   }
}


var before = "<table class='table table-striped table-bordered table-condensed table-hover' style='border: 1px solid black;'><tbody>" ;
var after = "</tbody></table>";

function arrayDoc(array) {
    if (typeof(array[0]) == "string")
        return array.join("; ");
   
    return array.map(function(element) {
        return before +  Object.keys(element).sort().map( function(key) { 
                return "<tr><td>"+key+"</td><td>"+element[key]+ "<td></tr>";
            }) + after;
    }).join("<p>")
}

reactiveTableSettings = function () {

    var collName;

    if (this instanceof String && this.name in CRFprototypes)
        collName = this;
    else if (this.name && this.name in CRFprototypes)
        collName = this.name;
    else if (this._id && this._id in CRFprototypes)
        collName = this._id;
    else
        throw "reactiveTableSettings needs to know what collection to use";


    var schema = CRFprototypes[collName];
    var fields = CRFfieldOrder[collName];
    fields = fields.map( 
        function(fieldName, i) {
            console.log(collName);

            try {
                var schemaField = schema[fieldName];
                var isDecimal = schemaField.decimal;
                var isDate = schemaField.type == Date || schemaField.type == "Date";
                var isArray = schemaField.type == Array;
            } catch(reason) {
                console.log(fieldName, "not in schema", fieldName);
            }
            // console.log(i, "rts", fieldName, schemaField.type, isDate);

            fieldName = fieldName.replace(/\$/g, "0");

            return {
                key: fieldName .replace(/\$/g, "0"),
                // label: new Spacebars.SafeString("<span style="white-space: nowrap;">" + fieldName.replace(/_/g, " ") + "</span>"),
                label: fieldName.replace(/_/g, " "),
                fn: function(value, obj) {
                    try {
                        if (value == null) return "";
                        if (Array.isArray(value)) {
                            return new Spacebars.SafeString("<span>" + arrayDoc(value) + "</span>");
                        } else if (isDate) {
                            return simpleDate(value);
                        } else if (typeof value == 'string' || value instanceof String) {
                            value = value.replace(/-/g, "&#8209;")
                            return new Spacebars.SafeString("<span sort='"+ value +"'>" + value + "</span>");

                        } else
                            return value;
                    } catch (reason) {
                        console.log( reason);
                    }

                },

            }
        })


    return {
        rowsPerPage: 10,
        showFilter: true,
        fields: fields,
    };
};

Template.registerHelper("reactiveTableSettings", reactiveTableSettings);


Template.CRFsShow.helpers({
  currentDoc: function () {
    return Session.get("CurrentDoc");
  },

  getType: function() {
    if (TableNeedsSample_ID.indexOf(this._id) >= 0)
        return "readonly"
    return "update";
  },

  phaseIs: function(phase) {
    var cd = Session.get("CurrentDoc");
    switch (phase) {
        case "none": return $('form').find("[name='Patient_ID']").val() == "DTB-000";
        case "updating": return cd != null;
        case "inserting": return cd == null;
    }
    alert("Unknown phase", phase);
    return false;
  },


  editing: function () {
    return Session.get(EDITING_KEY);
  },

  CRFsReady: function () {
    return Router.current().CRFsHandle.ready();
  },

  CRFs: function () {
    return CRFs.find({listId: this._id}, {sort: {createdAt: -1}});
  },

  fieldOrder: function () {
    var fo = CRFfieldOrder[this._id];
    // console.log("fieldOrder", fo);


    if (fo && fo.length > 0)
        return fo.join(",")
    return "";
  },

  currentForm: function () {
    // console.log("currentForm", this._id);
    Session.set("currentForm", this._id);
    return this._id;
  },
  
  readOnly: function () {
      return this._id in OncoreTable_NeedsSample_ID;
  },

  currentCollection: function () {
    return CRFcollections[this._id];
  },
  snowball: function () {
    var data = UI._templateInstance().data || {};
    data.collection = window[this._id];
    data.id = this._id;
    data.type = "insert";
    // console.log(data)
    alert(data)
    return data;
  },

  previousEntries: function () {
    if (this._id == null) return false;
    var coll = window[this._id];
    if (coll == null) return false;
    return coll;
  },

});

var editList = function(list, template) {
  Session.set(EDITING_KEY, true);
  
  // force the template to redraw based on the reactive change
  Tracker.flush();
  template.$('.js-edit-form input[type=text]').focus();
};

var saveList = function(list, template) {
  Session.set(EDITING_KEY, false);
  CRFmetadataCollection.update(list._id, {$set: {name: template.$('[name=name]').val()}});
}

var deleteList = function(list) {
  // ensure the last public list cannot be deleted.
  if (! list.userId && CRFmetadataCollection.find({userId: {$exists: false}}).count() === 1) {
    return alert("Sorry, you cannot delete the final public list!");
  }
  
  var message = "Are you sure you want to delete the list " + list.name + "?";
  if (confirm(message)) {
    // we must remove each item individually from the client
    CRFs.find({listId: list._id}).forEach(function(crf) {
      CRFs.remove(crf._id);
    });
    CRFmetadataCollection.remove(list._id);

    Router.go('home');
    return true;
  } else {
    return false;
  }
};

var toggleListPrivacy = function(list) {
  if (! Meteor.user()) {
    return alert("Please sign in or create an account to make private lists.");
  }

  if (list.userId) {
    CRFmetadataCollection.update(list._id, {$unset: {userId: true}});
  } else {
    // ensure the last public list cannot be made private
    if (CRFmetadataCollection.find({userId: {$exists: false}}).count() === 1) {
      return alert("Sorry, you cannot make the final public list private!");
    }

    CRFmetadataCollection.update(list._id, {$set: {userId: Meteor.userId()}});
  }
};

Template.CRFsShow.events({

  'change select[name="Patient_ID"]': function (event) {
    Session.set("CurrentDoc", currentDoc());
  },

  'change select[name="Sample_ID"]': function (event) {
    Session.set("CurrentDoc", currentDoc());
  },

  'change select[name="core"]': function (event) {
    Session.set("CurrentDoc", currentDoc());
  },

  'click .js-cancel': function() {
    Session.set(EDITING_KEY, false);
  },
  
  'keydown input[type=text]': function(event) {
    // ESC
    if (27 === event.which) {
      event.preventDefault();
      $(event.target).blur();
    }
  },
  
  'blur input[type=text]': function(event, template) {
    // if we are still editing (we haven't just clicked the cancel button)
    if (Session.get(EDITING_KEY))
      saveList(this, template);
  },

  'submit .js-edit-form': function(event, template) {
    event.preventDefault();
    saveList(this, template);
  },
  
  // handle mousedown otherwise the blur handler above will swallow the click
  // on iOS, we still require the click event so handle both
  'mousedown .js-cancel, click .js-cancel': function(event) {
    event.preventDefault();
    Session.set(EDITING_KEY, false);
  },

  'change .list-edit': function(event, template) {
    if ($(event.target).val() === 'edit') {
      editList(this, template);
    } else if ($(event.target).val() === 'delete') {
      deleteList(this, template);
    } else {
      toggleListPrivacy(this, template);
    }

    event.target.selectedIndex = 0;
  },
  
  'click .js-edit-list': function(event, template) {
    editList(this, template);
  },
  
  'click .js-toggle-list-privacy': function(event, template) {
    toggleListPrivacy(this, template);
  },
  
  'click .js-delete-list': function(event, template) {
    deleteList(this, template);
  },
  
  'click .js-CRF-add': function(event, template) {
    template.$('.js-CRF-new input').focus();
  },

  'submit .js-CRF-new': function(event) {
    event.preventDefault();

    var $input = $(event.target).find('[type=text]');
    if (! $input.val())
      return;
    
    CRFs.insert({
      listId: this._id,
      text: $input.val(),
      checked: false,
      createdAt: new Date()
    });
    CRFmetadataCollection.update(this._id, {$inc: {incompleteCount: 1}});
    $input.val('');
  }
});


function coreProperty(index, property) {
      return function (row, newValue) {
          if (row.cores && index < row.cores.length) {
              // console.log("coreProperty", property, row, row.cores[index][property]); 
              return (row.cores[index][property]);
          }
          return "";
    }
}




function currentDoc() {
    var crf = Session.get("currentForm");
    var coll = window[crf];
    var q = {};

    if (crf in ComplexIDFields) {
        _id = {}
        _.each(ComplexIDFields[crf], function(f) {
            q[f] = $('form').find("[name='" + f + "']").val();
        })
    } else {
        var s = $('form').find("[name='Sample_ID']").val();
        if (s == null)
            q["Patient_ID"] = $('form').find("[name='Patient_ID']").val();
        else
            q["Sample_ID"] = s;
    }
    var cd = coll.findOne(q);
    return cd;
}
window.currentDoc = currentDoc

