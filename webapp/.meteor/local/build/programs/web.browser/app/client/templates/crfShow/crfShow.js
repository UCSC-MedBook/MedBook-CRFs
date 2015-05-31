(function(){var EDITING_KEY = 'editingList';





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
  if (obj == null){
    return obj;
  }
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
    if (typeof(array[0]) == "string"){
      return array.join("; ");
    }

    return array.map(function(element) {
      return before +  Object.keys(element).sort().map( function(key) {
        return "<tr><td>"+key+"</td><td>"+element[key]+ "<td></tr>";
      }) + after;
    }).join("<p>")
}

reactiveTableSettings = function () {
  console.log("reactiveTableSettings");

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


    var settings = {
        rowsPerPage: 10,
        showFilter: true,
        fields: fields,
    };

    //console.log("reactiveTableSettings", settings);

    return settings;
};


//==================================================================================================
// TEMPLATE OUTPUTS

Template.registerHelper("reactiveTableSettings", reactiveTableSettings);

Template.CRFsShow.helpers({
  currentDoc: function () {
    console.log("currentDoc", Session.get('CurrentDoc'));
    if(Session.get('CurrentDoc')){
      return Session.get("CurrentDoc");
    }else{
      return currentDoc();
    }
  },

  getType: function() {
    if (TableNeedsSample_ID.indexOf(this._id) >= 0){
      return "readonly"
    }else{
      return "update";
    }
  },

  phaseIs: function(phase) {
    var currentDoc = Session.get("CurrentDoc");
    switch (phase) {
        case "none": return $('form').find("[name='Patient_ID']").val() == "DTB-000";
        case "updating": return currentDoc != null;
        case "inserting": return currentDoc == null;
        default: console.log("Unknown phase", phase);
    }
    return false;
  },


  editing: function () {
    return Session.get(EDITING_KEY);
  },

  CRFsReady: function () {
    return Router.current().CRFsHandle.ready();
  },

  CRFs: function () {
    var crfs = CRFs.find({listId: this._id}, {sort: {createdAt: -1}});
    console.log("crfs", crfs);
    return crfs;
  },

  fieldOrder: function () {
    console.log("fieldOrder()");
    console.log("this._id", this._id);

    var fieldOrder = CRFfieldOrder[this._id];
    console.log("fieldOrder", fieldOrder);

    /*return [
      "Patient_ID",
      "Sample_ID",
      "biopsy_site",
      "Enzalutamide",
      "Abiraterone",
      "site",
      "age",
      "Reason_for_Stopping_Treatment",
      "AR_Amplification_by_FISH",
      "Days_on_Study",
      "On_Study_Date",
      "Off_Study_Date",
      "abi_psa_response",
      "abi_radiographic_response",
      "abi_reason_for_d/c",
      "enza_psa_response",
      "enza_radiographic_response",
      "enza_reason_for_d/c",

      "prior_tissue",
      "when_where_stored",
      "biopsy_date",
      "steroid_at_time_of_biopsy",
      "steroid_stop_date",
      "sites_of_metastases_at_time_of_biopsy",

      "psa_at_biopsy",
      "ldh_at_biopsy",
      "alk_phos_at_biopsy",
      "hemoglobin_at_biopsy",
      "chga_at_biopsy",
      "nse_at_biopsy",
      "ecog_ps_at_biopsy",

      //"date_of_diagnosis",
      "gleason_grade",
      //"adt_start_date",
      "orchiectomy",
      "psa_nadir_on_padt",

      //"date_of_castration_resistance",
      //"first_date_of_metastases",
      "treatment_for_mcrpc_prior_to_biopsy",
      "post-biopsy_treatment",
      "psa_response",
      "radiographic_response",
      //"date_of_progression",
      //"treatment_stop_date",
      //"date_of_death_or_last_contact",
      "death_or_last_contact"
      ];*/

    if (fieldOrder && fieldOrder.length > 0){
      return fieldOrder.join(",")
    }else{
      return "";
    }
  },

  currentForm: function () {
    console.log("currentForm", this._id);

    Session.set("currentForm", this._id);
    return this._id;
  },

  readOnly: function () {
    console.log("readOnly");
    console.log("OncoreTable_NeedsSample_ID", OncoreTable_NeedsSample_ID);

    return this._id in OncoreTable_NeedsSample_ID;
  },

  currentCollection: function () {
    var currentCollection = CRFcollections[this._id];
    console.log("currentCollection", currentCollection);
    return currentCollection;
  },
  snowball: function () {
    var data = UI._templateInstance().data || {};
    data.collection = window[this._id];
    data.id = this._id;
    data.type = "insert";
    /*alert(data)*/
    console.log("snowball", data);
    return data;
  },

  previousEntries: function () {
    if (this._id){
      if(window[this._id]){
        console.log("previousEntries", window[this._id]);
        return window[this._id];
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
});

//==================================================================================================
// LOCAL FUNCTIONS


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

function Patient_ID_Update_Sample_ID(event) {
  var patient_id = $(event.target).val();
  SetCurrentDoc('Patient_ID', patient_id);
  var Sample_ID = All_Sample_ID.filter(
      function(f) {
          try {
              return f.text.match(patient_id + ".*")
          } catch (s) {
              debugger
          }
      });
  $("input[name='Sample_ID']").select2( { data: Sample_ID });
}


Template.CRFsShow.events({

  'change select[name="Patient_ID"]': Patient_ID_Update_Sample_ID,

  'change input[name="Patient_ID"]':  Patient_ID_Update_Sample_ID,

  'change input[name="Sample_ID"]': function (event) {
      SetCurrentDoc('Sample_ID', $('input[name="Sample_ID"]').val());
  },

  'change select[name="core"]': function (event) {
    // Session.set("CurrentDoc", currentDoc());
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
    return "";å
  }
}


function SetCurrentDoc(field, value) {
  var crf = Session.get("currentForm");
  var coll = window[crf];
  var q = {};
  q[field] = value;
  var cd = coll.findOne(q);
  Session.set("CurrentDoc", cd);
  return cd;
}





function currentDoc() {
  console.log("currentDoc()");

    var crf = Session.get("currentForm");
    var collection = window[crf];
    var query = {};

    if (crf in ComplexIDFields) {
        _id = {}
        _.each(ComplexIDFields[crf], function(f) {
            query[f] = $('form').find("[name='" + f + "']").val();
        });
    } else {
        var s = $('form').find("[name='Sample_ID']").val();
        if (s == null)
            query["Patient_ID"] = $('form').find("[name='Patient_ID']").val();
        else
            query["Sample_ID"] = s;
    }

    console.log("collection", collection);
    console.log("query", query);

    var currentDoc = collection.findOne(query);
    console.log("currentDoc", currentDoc);
    return currentDoc;
}
window.currentDoc = currentDoc

})();
