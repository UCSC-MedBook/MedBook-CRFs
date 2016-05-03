Meteor.startup(function() {

  Meteor.subscribe("Specimen_IDs");

  AutoForm.addInputType("Specimen_ID", {
    class: "Specimen_ID",
    template: "Specimen_ID",
    valueOut: function () {
      return val;
    },
    valueConverters: {
      "string": function (val) {
        return val;
      },
  }});

  Template.Specimen_ID.events({
    'change select[name="Specimen_ID"]': function (event, tmpl) {
        var specimenId =  $(event.target).val();
        Session.set("Specimen_ID", specimenId);
        SetCurrentDoc("Specimen_ID", specimenId);
    },
  });

  function grep(array, regex) {
     return $.grep(array, function(x) {return String(x).match(regex)});
  }


  Template.Specimen_ID.helpers({
      specimens : function() {

        var currentStudy = Session.get("CurrentStudy");
	if (currentStudy) {
	    var study = Collections.Studies.findOne({id: currentStudy});
	    if (study && study.Specimen_IDs) {
		var specimenList = study.Specimen_IDs;
		var currentDoc = Session.get("CurrentDoc");



		if (currentDoc && currentDoc.Patient_ID) {
		    specimenList = grep(specimenList, currentDoc.Patient_ID);
		} else {
		    var currentPatient_ID = Session.get("Patient_ID")
		    if (currentPatient_ID) {
			var tmp = grep(specimenList, currentPatient_ID );
			if (tmp.length > 0)
			    specimenList = tmp;
		    }
		}

		var s = '<select class="Specimen_ID form-control" type="text" name="Specimen_ID" data-schema-key="Specimen_ID">';
		specimenList.map(function(e) {
		    var selected =  currentDoc && currentDoc.Specimen_ID == e ?  'selected="selected"' : "";
		    s += '<option value="' + e + '" ' + selected + ' > ' + e + '</option>';
		});
		s += '</select>';
		return s;
	      }
	  }
	  return ""
      }
    });


  /*Template.Specimen_ID.rendered = function ()  {
     var self = this;
     var $elem = $(self.find("[name='Specimen_ID']"));

     Tracker.autorun(function () {
        var currentDoc = Session.get("CurrentDoc");
        if (currentDoc) {
            if ($elem.val() != currentDoc.Specimen_ID){
              $elem.val(currentDoc.Specimen_ID);
            }
        }
      });
  };*/




});
