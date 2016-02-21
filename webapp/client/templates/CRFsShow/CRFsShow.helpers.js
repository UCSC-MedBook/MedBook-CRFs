var EDITING_KEY = 'editingList';

All_Sample_ID = [];

Session.set("RowsPerPage", 10);



LastSubmit = null;

CRF_Handler = function(insertDoc, updateDoc, currentDoc) {

    var CurrentStudy = Session.get("CurrentStudy");
    var currentForm = Session.get("CurrentForm");

    var collection;

    insertDoc.Study_ID = CurrentStudy;
    insertDoc.CRF = currentForm;

    updateDoc.$set.Study_ID = CurrentStudy;
    updateDoc.$set.CRF = currentForm;
    collection = Collections.CRFs;

    if (insertDoc && currentDoc && updateDoc && currentDoc._id != null && currentDoc != null && insertDoc.Patient_ID == currentDoc.Patient_ID && insertDoc.Sample_ID == currentDoc.Sample_ID) {
        console.log("updateDoc", updateDoc);

        var v = collection.update({_id: currentDoc._id}, updateDoc );
        if (v != 1) 
            console.log("Updating wasnt successful.  :(", v);
        insertDoc._id = currentDoc.id;
    } else {
        insertDoc._id = collection.insert(insertDoc);
    }

    LastSubmit = insertDoc.Patient_ID;
    Session.set("CRF_filter", insertDoc.Patient_ID)
    Session.set("CurrentDoc", insertDoc);
    return null;
}
Admin_Handler = function(insertDoc, updateDoc, currentDoc) {

    var currentForm = Session.get("CurrentForm");
    var collection = Collections[currentForm];

    if (collection == null)
        return new Error("Submission failed: form="+ String(currentForm));

    if (insertDoc == null) {
        return new Error("Submission failed, insertDoc==null");
    } else
        try {
            if (insertDoc && currentDoc && updateDoc && currentDoc._id != null && currentDoc != null) {
	        console.log("admin updateDoc", updateDoc);
                var v = collection.update({_id: currentDoc._id}, updateDoc );
                if (v != 1) 
                    console.log("Updating was not successful.", v);
            } else {
                insertDoc._id = collection.insert(insertDoc);
            }

            LastSubmit = insertDoc.Patient_ID;
            Session.set("CRF_filter", insertDoc.Patient_ID)
            Session.set("CurrentDoc", insertDoc);
            return null;
        } catch (why) {
            return new Error("Submission failed: " + why);
        }
}

function referentialIntegrity(doc, fieldName) {
   if (study == "admin")
       return;

   if (fieldName in doc) {
       var study = Collections.studies.findOne({id: Session.get("CurrentStudy")}, {fields: {_id:1}});
       if (study != null) {
	   var value  = doc[fieldName];
	   var q = {};
	   q[fieldName +"s"] = value;

	   var ret = Collections.studies.update({_id: study._id}, { $addToSet: q})
       }
   }
}


AutoForm.hooks({
  CRFquickForm: {
    onSuccess: function(formType, result) {
      console.log("Autoform.onSuccess.formType", formType);
      console.log("Autoform.onSuccess.result", result);
      var doc = this.insertDoc;
      if (doc == null)
        doc = this.currentDoc;

      if (doc != null) {
       referentialIntegrity(doc, "Patient_ID");
       referentialIntegrity(doc, "Sample_ID");
       referentialIntegrity(doc, "Specimen_ID");
      }

       fixUpRenderedAutoForm();
    },
    onSubmit: function (insertDoc, updateDoc, currentDoc) {

      if ("admin" == Session.get("CurrentStudy"))
          this.done(Admin_Handler(insertDoc, updateDoc, currentDoc));
      else
          this.done(CRF_Handler(insertDoc, updateDoc, currentDoc));
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

    var fields = [];

    // The SimpleSchemaschema has names like "Cores.$.Core_ID", "Cores.$.Core_State",
    // We don't need it. But we do need just "Cores". So filter out
    fieldOrder(collName).map(function (field)  {
       var k = field.indexOf(".$.");
       if (k < 0)
          fields.push(field);
       else {
          field = field.substring(0,k);
	  if (!_.contains(fields, field))
	      fields.push(field);
       }
    });


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
  Collections.Metadata.update(list._id, {$set: {name: template.$('[name=name]').val()}});
}

var deleteList = function(list) {
  // ensure the last public list cannot be deleted.
  if (! list.userId && Collections.Metadata.find({userId: {$exists: false}}).count() === 1) {
    return alert("Sorry, you cannot delete the final public list!");
  }

  var message = "Are you sure you want to delete the list " + list.name + "?";
  if (confirm(message)) {
    // we must remove each item individually from the client
    CRFs.find({listId: list._id}).forEach(function(crf) {
      CRFs.remove(crf._id);
    });
    Collections.Metadata.remove(list._id);

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
    Collections.Metadata.update(list._id, {$unset: {userId: true}});
  } else {
    // ensure the last public list cannot be made private
    if (Collections.Metadata.find({userId: {$exists: false}}).count() === 1) {
      return alert("Sorry, you cannot make the final public list private!");
    }

    Collections.Metadata.update(list._id, {$set: {userId: Meteor.userId()}});
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


