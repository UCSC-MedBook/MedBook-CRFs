Meteor.startup(function() {

   Meteor.subscribe("Patient_IDs");

  AutoForm.addInputType("Patient_ID", {
    class: "Patient_ID",
    template: "Patient_ID",
    valueOut: function () {
      return val;
    },
    valueConverters: {
      "string": function (val) {
        return val;
      }
   },
  });


  Template.Patient_ID.events({
    'change select[name="Patient_ID"]': function (event, tmpl) {
      if (Session.get("currentForm") != "Patient_Enrollment_form") {
        var p = $(event.target).val();
        Session.set("Patient_ID", $(event.target).val());
        SetCurrentDoc("Patient_ID", p);
      }
    }
  });

  Template.Patient_ID.helpers({
      atts: function addFormControlAtts() {
        if (this.atts) {
            var atts = _.clone(this.atts);
            // Add bootstrap class
            atts = AutoForm.Utility.addClass(atts, "form-control");
            return atts;
          }
        else
          return "form-control"
      },
      patients: function() {
          var study = Collections.studies.findOne({id: Session.get("CurrentStudy") });
          return study.Patient_IDs;
     }
   });

  Template.Patient_ID.rendered = function ()  {
     var self = this;
     var $elem = $(self.find("[name='Patient_ID']"));

     Tracker.autorun(function () {
        var currentDoc = Session.get("CurrentDoc");
        if (currentDoc) {
          if ($elem.val() != currentDoc.Patient_ID){
            $elem.val(currentDoc.Patient_ID);
          }
        }
     });
  };



});
