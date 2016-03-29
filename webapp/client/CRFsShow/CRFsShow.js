var EDITING_KEY = "EditingCRFsShow";

var mapTimepoints = {
  null           : "BL",
  "Baseline"     : "BL",
  "Progression"  : "Pro",
  "Progression2" : "Pro2",
  "Progression3" : "Pro3",
};

AutoForm.hooks({
    CRFquickForm: {

          formToDoc: function(doc) {
	     if (_.intersection(this.schema._schemaKeys, [ "Patient_ID", "Timepoint", "Specimen_ID"]).length == 3 
	     && this.schema._schema.Specimen_ID.autoform.type !=  "Specimen_ID" ) {

		$("[name='Specimen_ID']").prop('readonly', true);
	        if (doc.Timepoint != null)  {
		    doc.Specimen_ID = doc.Patient_ID +  mapTimepoints[doc.Timepoint];
		    $("[name='Specimen_ID']").val( doc.Specimen_ID );
	        }
	     }
	     
	     return doc;
	  },
    }
});


Template.CRFsShow.rendered = function() {
  LastSubmit = null;
  var This = this;

Tracker.autorun(function() {
  var Study_ID = This.find('input[name="Study_ID"]');
  if (Study_ID) {
     Session.get("CurrentDoc");
     Study_ID.value = Session.get("CurrentStudy");
     Study_ID.readOnly = true;
  }
});

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
Template.CRFsShow.helpers({

  currentDoc: function () {
    return Session.get("CurrentDoc");
  },

  getType: function() {
    if (TableNeedsSample_ID.indexOf(this._crfName) >= 0)
        return "readonly"
    return "update";
  },

  phaseIs: function(phase) {
    var cd = Session.get("CurrentDoc");
    switch (phase) {
        case "none": return $('form').find("[name='Patient_ID']").val() == "DTB-000";
        case "success": return cd != null && LastSubmit != null && cd.Patient_ID == LastSubmit.Patient_ID && cd.Sampleient_ID == LastSubmit.Sample_ID;
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
    return CRFs.find({listId: this._crfName}, {sort: {createdAt: -1}});
  },

  fieldOrder: function () {
    var fo = fieldOrder(this._crfName);
    if (fo && fo.length > 0)
        return fo   // fo.join(",")
    return "";
  },

  currentForm: function () {
    Session.set("CurrentForm", this._crfName);
    return this._crfName;
  },

  readOnly: function () {
      return false; // this._crfName in OncoreTable_NeedsSample_ID;
  },

  currentCollection: function () {
    return Collections[this._crfName];
  },
  snowball: function () {
    var data = UI._templateInstance().data || {};
    data.collection = window[this._crfName];
    data.id = this._crfName;
    data.type = "insert";
    alert("snowball: " + data)
    return data;
  },

  previousEntries: function () {
    if (this._crfName == null) return false;

    var coll;
    
    switch (this._crfName) 
      {
    case "studies":
	coll =  Collections.studies.find();
	break;
    case "Metadata":
	coll =  Collections.Metadata.find().fetch().map(function(f) { return f.metadata })
	break;
    default:
	coll = Collections.CRFs.find({CRF: this._crfName});
	break;
      }
    if (coll == null) return false;
    return coll;
  }
});

Template.CRFsShow.events({

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
    debugger ;
    alert("not implemented yet");
    return;

    var $input = $(event.target).find('[type=text]');
    if (! $input.val())
      return;


    Collections.studies.insert({
      listId: this._crfName,
      text: $input.val(),
      checked: false,
      createdAt: new Date()
    });
    Collections.Metadata.update(this._crfName, {$inc: {incompleteCount: 1}});
    $input.val('');
  }
});
