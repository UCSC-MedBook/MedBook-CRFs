Meteor.startup(function() {
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
                      var patient_info = CRFcollections['Demographics'].findOne({Patient_ID:pid});
                      if (patient_info) {
                            $info.html("<b>" + patient_info.Study_Site + "</b>" );
                        }
                  }

            };


            Template.Patient_ID.events({
              'change select[name="Patient_ID"]': function (event, tmpl) {
                    if (tmpl.data.go)
                        Router.go("CRFsPatient", {_patient: event.target.value});
                    else
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
                   $select.find('option').remove()

                   CRFcollections['Demographics'].find({}, {sort: {Patient_ID:1}, fields: {Patient_ID:1, Study_Site:1}}).forEach(
                       function(p) {var html = p.Patient_ID + " " + p.Study_Site; 
                             $("<option>", { value: p.Patient_ID, html: html}).appendTo($select);
                           });
               }); // autorun
               updatePatientInfo();
            };


        Template.Patient_ID.destroyed = function () {
          // this.$('input').datepicker('remove');
        }

        if (true) {
            AutoForm.addInputType("Sample_ID", {
              template: "Sample_ID",
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

            function updateSampleInfo() {
                /*
                  var $select = $('select[name="Sample_ID"]');
                  var pid = $select.val();
                  if (pid && pid.length > 0) {
                      var $info = $select.siblings(".info")
                      var patient_info = CRFcollections['Demographics'].findOne({Sample_ID:pid});
                      if (patient_info) {
                            $info.html("<p><b>" + patient_info.Study_Site + "</b>" 
                                    + " Biopsy: " 
                                    + patient_info.Site +  " " 
                                    + patient_info.Date_of_Proceedure );
                        }
                  }
                  */

            };


            Template.Sample_ID.events({
              'change select[name="Sample_ID"]': function (event, tmpl) {
                    Session.set("CurrentDoc", currentDoc());
                    updateSampleInfo();
              },
            });

                    


            Template.Sample_ID.helpers({
                atts: function addFormControlAtts() {
                  var atts = _.clone(this.atts);
                  // Add bootstrap class
                  atts = AutoForm.Utility.addClass(atts, "form-control");
                  return atts;
                }
              });

            Template.Sample_ID.rendered = function ()  {
              var $select = this.$('select[name="Sample_ID"]');
              var data = this.data;

              // set and reactively update values
              this.autorun(function () {

               CRFcollections['SU2C_Biopsy_V2'].find({}, {sort: {Sample_ID:1}, fields: {Sample_ID:1, Site:1}}).forEach(
                   function(p) {var html = p.Sample_ID + " " + p.Site; 
                         $("<option>", { value: p.Sample_ID, html: html}).appendTo($select);
                       });
               }); // autorun
               updateSampleInfo();
            };


        Template.Sample_ID.destroyed = function () {
          // this.$('input').datepicker('remove');
        }

    } 

       Meteor.subscribe("Patient_IDs");
       Meteor.subscribe("Sample_IDs");

} else if (Meteor.isServer)  {

        Meteor.publish("Patient_IDs", function() {
            if (this.userId) {
                var d =  CRFcollections.Demographics.find({}, {sort: {Patient_ID:1}, fields: { Patient_ID:1, Study_Site:1}});
                console.log("Demographics count", d.count());
                return d;
            }else {
                console.log("Demographics none");
                return [];
            }
        });
        Meteor.publish("Sample_IDs", function() {
            if (this.userId) {
                var d =  CRFcollections.SU2C_Biopsy_V2.find({}, {sort: {Sample_ID:1}, fields: { Sample_ID:1, Site: 1}});
                console.log("Sample_ID count", d.count());
                return d;
            }else {
                console.log("Sample_ID none");
                return [];
            }
        });
}

});
