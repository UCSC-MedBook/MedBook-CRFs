var EDITING_KEY = 'editingList';

All_Sample_ID = [];

Session.set("RowsPerPage", 10);



stopMe = function() {
    console.log("stopMe");
    debugger;
}

LastSubmit = null;

customHandler = function(insertDoc, updateDoc, currentDoc) {
    debugger;

    var CurrentStudy = Session.get("CurrentStudy");
    var currentForm = Session.get("currentForm");

    insertDoc.study = CurrentStudy;
    insertDoc.CRF = currentForm;

    updateDoc.$set.study = CurrentStudy;
    updateDoc.$set.CRF = currentForm;

    if (insertDoc == null) {
        debugger;
        console.log("insertDoc==null how did this happen?");
        alert("customHandler: " + 1);
        return new Error("Submission failed");
    } else
        try {

            if (insertDoc && currentDoc && updateDoc && currentDoc._id != null && currentDoc != null && insertDoc.Patient_ID == currentDoc.Patient_ID && insertDoc.Sample_ID == currentDoc.Sample_ID) {
	        console.log("updateDoc", updateDoc);
                var v = Collections.CRFs.update({_id: currentDoc._id}, updateDoc );
                if (v != 1) 
                    console.log("Updating wasnt successful.  :(", v);
                insertDoc._id = currentDoc.id;
            } else {
                insertDoc._id = Collections.CRFs.insert(insertDoc);
            }

            LastSubmit = insertDoc.Patient_ID;
            Session.set("CRF_filter", insertDoc.Patient_ID)
            Session.set("CurrentDoc", insertDoc);
            return null;
        } catch (why) {
            debugger;
            return new Error("Submission failed: " + why);
        }
}

AutoForm.hooks({
  CRFquickForm: {
    onSuccess: function(formType, result) {
      console.log("Autoform.onSuccess.formType", formType);
      console.log("Autoform.onSuccess.result", result);

     fixUpRenderedAutoForm();
    },
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
      //debugger;
      console.log("AutoForm.onSubmit.insertDoc", insertDoc);
      console.log("AutoForm.onSubmit.updateDoc", updateDoc);
      console.log("AutoForm.onSubmit.currentDoc", currentDoc);

      this.done(customHandler(insertDoc, updateDoc, currentDoc));
      return false;
    }
  }
});







var before = "<table class='table table-striped table-bordered table-condensed table-hover' style='border: 1px solid black;'><tbody>" ;
var after = "</tbody></table>";

arrayDoc = function(array) {
    if (typeof(array[0]) == "string")
        if (array[0][0] == '<')
            return array.join(""); // its html just return it.
        else 
            return array.join("; ");

    return array.map(function(element) {
        return before +  Object.keys(element).sort().map( function(key) {
                return "<tr><td>"+key+"</td><td>"+element[key]+ "<td></tr>";
            }) + after;
    }).join("<p>")
}
simpleDate = function (obj) {
   if (obj == null){
    return obj;
   } try {
        return moment(obj).utc().format("MM/DD/YYYY")
   } catch (reason) {
        console.log("simpleDate  mapping failed on column", obj, reason);
        return "Error (see Javascript console)";
   }
}

reactiveTableSettings = function () {

    var collName = this._crfName;
    var schemaObj = schema(collName)._schema;
    var fields = fieldOrder(collName);
    fields = fields.map(
      function(fieldName, i) {
        try {
            var schemaField = schemaObj[fieldName];
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
            }
        }
      }
    );


    return {
      rowsPerPage: Session.get("RowsPerPage"),
      showFilter: true,
      fields: fields,

      enableRegex: true,
      useFontAwesome: true
    };
};

Template.registerHelper("reactiveTableSettings", reactiveTableSettings);

Template.registerHelper("schema", function() {
   var name = Router.current().params._crfName;
   var s =  schema(name);
   return s;
});

Template.registerHelper("fieldOrder", function() {
   var name = Router.current().params._crfName;
   return fieldOrder(name);
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


coreProperty = function(index, property) {
  return function (row, newValue) {
    if (row.cores && index < row.cores.length) {
      // console.log("coreProperty", property, row, row.cores[index][property]);
      return (row.cores[index][property]);
    }
    return "";
  }
}


