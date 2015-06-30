Meteor.startup(function() {

    AutoForm.addInputType("Patient_ID", {
      class: "Patient_ID",
      template: "Patient_ID",
      valueOut: function () {
        return val;
      },
      valueConverters: {
        "string": function (val) {
          return val;
        },
     },
    });

    Template.Patient_ID.events({
      'change select[name="Patient_ID"]': function (event, tmpl) {
            if (Session.get("currentForm") != "Patient_Enrollment_form") {
                var p = $(event.target).val();
                Session.set("Patient_ID", p);
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
        patients : function() {
            var p = CRFcollections.Patient_Enrollment_form.find({}, { fields: {"Patient_ID":1}}).fetch().map(function(pef) { return pef.Patient_ID});
            var d = CRFcollections.Demographics.find({}, { fields:  {"Patient_ID":1}}).fetch().map(function(dem) { return dem.Patient_ID});
            var c = CRFcollections.Clinical_Info.find({}, { fields:  {"Patient_ID":1}}).fetch().map(function(dem) { return dem.Patient_ID});
            var pdc = _.union(d, p, c).sort();
            return pdc;
       }
     });

    Template.Patient_ID.rendered = function ()  {
         var self = this;
         var $elem = $(self.find("[name='Patient_ID']"));
         // $elem.tagsinput();
         Tracker.autorun(function () {
            var cd = Session.get("CurrentDoc");
            if (cd) {
                if ($elem.val() != cd.Patient_ID);
                    $elem.val(cd.Patient_ID);
            }
         }); // tracker
    };
    Template.Patient_ID.destroyed = function () {
    }






});
