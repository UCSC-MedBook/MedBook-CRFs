 if (Meteor.isClient) {
        AutoForm.addInputType("Patient_ID", {
          template: "Patient_ID",
          valueOut: function () {
            return val;
          },
          valueConverters: {
            "string": function (val) {
              return val;
            },
            "stringArray": function (val) {
                return val.split(" ");
            },
          }
        });

        function updatePatientInfo() {
              var $select = $('select[name="Patient_ID"]');
              var pid = $select.val();
              if (pid && pid.length > 0) {
                  var $info = $select.siblings(".info")
                  var patient_info = CRFcollections['Patient Enrollment form'].findOne({Patient_ID:pid});
                  if (patient_info) {
                        $info.append("<b>" + patient_info.Institution + "</b>" 
                                + " Biopsy: " 
                                + patient_info.Baseline_Biopsy_Site +  " " 
                                + patient_info.Baseline_Biopsy_Date );
                    }
              }

        };


        Template.Patient_ID.events({
          'change select[name="Patient_ID"]': function (event, tmpl) {
                Session.set("CurrentDoc", currentDoc());
                updatePatientInfo();
          },
        });

                


        Template.Patient_ID.helpers({
            atts: function addFormControlAtts() {
              var atts = _.clone(this.atts);
              // Add bootstrap class
              atts = AutoForm.Utility.addClass(atts, "form-control");
              return atts;
            }
          });

        Template.Patient_ID.rendered = function ()  {
          var $select = this.$('select[name="Patient_ID"]');
          var data = this.data;

          // set and reactively update values
          this.autorun(function () {

           CRFcollections['Patient Enrollment form'].find({}).forEach(
               function(p) {var pid = p.Patient_ID; 
                     $("<option>", { value: pid, html: pid}).appendTo($select);
                   });
           }); // autorun
           updatePatientInfo();
        };


    Template.Patient_ID.destroyed = function () {
      // this.$('input').datepicker('remove');
    };
};
