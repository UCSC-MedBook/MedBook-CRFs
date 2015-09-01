Meteor.startup(function() {

  Meteor.subscribe("Sample_IDs");

  AutoForm.addInputType("Sample_ID", {
    class: "Sample_ID",
    template: "Sample_ID",
    valueOut: function () {
      return val;
    },
    valueConverters: {
      "string": function (val) {
        return val;
      },
  }});

  Template.Sample_ID.events({
    'change select[name="Sample_ID"]': function (event, tmpl) {
        var sampleId =  $(event.target).val();
        Session.set("Sample_ID", sampleId);
        SetCurrentDoc("Sample_ID", sampleId);
    },
  });

  function grep(array, regex) {
     return $.grep(array, function(x) {return String(x).match(regex)});
  }


  Template.Sample_ID.helpers({
      samples : function() {

        var currentStudy = Session.get("CurrentStudy");
	if (currentStudy) {
	    var study = Collections.studies.findOne({id: currentStudy});
	    if (study && study.Sample_IDs) {
		var sampleList = study.Sample_IDs;
		var currentDoc = Session.get("CurrentDoc");



		if (currentDoc && currentDoc.Patient_ID) {
		    sampleList = grep(sampleList, currentDoc.Patient_ID);
		} else {
		    var currentPatient_ID = Session.get("Patient_ID")
		    if (currentPatient_ID) {
			var tmp = grep(sampleList, currentPatient_ID );
			if (tmp.length > 0)
			    sampleList = tmp;
		    }
		}

		var s = '<select class="Sample_ID form-control" type="text" name="Sample_ID" data-schema-key="Sample_ID">';
		sampleList.map(function(e) {
		    var selected =  currentDoc && currentDoc.Sample_ID == e ?  'selected="selected"' : "";
		    s += '<option value="' + e + '" ' + selected + ' > ' + e + '</option>';
		});
		s += '</select>';
		if (currentDoc)
		    console.log("currentDoc.Sample_ID", currentDoc.Sample_ID, s);
		else
		    console.log("Sample_ID", s);
		return s;
	      }
	  }
	  return ""
      }
    });


  /*Template.Sample_ID.rendered = function ()  {
     var self = this;
     var $elem = $(self.find("[name='Sample_ID']"));

     Tracker.autorun(function () {
        var currentDoc = Session.get("CurrentDoc");
        if (currentDoc) {
            if ($elem.val() != currentDoc.Sample_ID){
              $elem.val(currentDoc.Sample_ID);
            }
        }
      });
  };*/




});
