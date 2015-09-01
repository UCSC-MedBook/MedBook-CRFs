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


		// var currentPatient_ID = $("[name='Patient_ID']").val();
		var currentPatient_ID = Session.get("Patient_ID");
		if (currentPatient_ID && currentPatient_ID.length > 0) {
		    sampleList = grep(sampleList, currentPatient_ID);
		} else {
		    var currentDoc = Session.get("CurrentDoc");
		    if (currentDoc && curentDoc.Patient_ID) {
			sampleList = grep(sampleList, curentDoc.Patient_ID);
		    }
		}

		var s = '<select class="Sample_ID form-control" type="text" name="Sample_ID">';
		sampleList.map(function(e) {
		    s += '<option value="' + e + '">' + e + '</option>';
		});
		s += '</select>';
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
