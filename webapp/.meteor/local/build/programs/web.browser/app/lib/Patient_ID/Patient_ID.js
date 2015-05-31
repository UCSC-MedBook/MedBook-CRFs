(function(){//TODO:  Deprecate this file.  Templates/publications shouldn't be in /lib

Meteor.startup(function() {
 if (Meteor.isClient) {
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
            "stringArray": function (val) {
                return val.split(" ");
            }
          }
        });

        Template.Patient_ID.events({
          'change select[name="Patient_ID"]': function (event, tmpl) {
            console.log("tmpl.data", tmpl.data);

              if (tmpl.data.go){
                Router.go("CRFsPatient", {_patient: event.target.value});
              }else{
                Session.set("CurrentDoc", currentDoc());
                Session.set("Patient_ID", $(event.target).val());
              }
          },
        });


        Template.Patient_ID.helpers({
          patients: function(){
            return Oncore.find();
          },
          atts: function() {
              if (this.atts) {
                console.log("this.atts", this.atts);

                var atts = _.clone(this.atts);
                // Add bootstrap class
                atts = AutoForm.Utility.addClass(atts, "form-control");
                return atts;
              }else{
                console.log("no atts available");
                return "form-control"
              }
          }
        });
        Template.Patient_ID.rendered = function ()  {
          Template.Patient_ID.bindField("Patient_ID");
        };

        Template.Patient_ID.bindField = function(field, dependsOn) {
          console.log("Template.Patient_ID.bindField");

          var template = Template.instance();

          //debugger;
          var $select = template.$('select[name="' + field + '"]');
          console.log("$select", $select);


          Tracker.autorun(function () {
              $select.find('option').remove();
              var filter = {};
              filter[field] = true;

              var query = {};
              if (dependsOn) {
                  var value = Session.get(dependsOn);
                  if (value) {
                      query[field] = { $regex: value + ".*" };
                  }
              }

              var p = CRFcollections.Patient_Enrollment_form.find(query, { fields: filter}).fetch();
              console.log("patient", p);


              var d;
              if(field == "Sample_ID"){
                d = CRFcollections.SU2C_Biopsy_V3.find(query, { fields: filter}).fetch();
              }else{
                d = CRFcollections.Demographics.find(query, { fields: filter}).fetch();
              }
              console.log("demographic", d);

              //var d = (field != "Sample_ID" ? CRFcollections.Demographics : CRFcollections.SU2C_Biopsy_V3)
              //    .find(query, { fields: filter}).fetch();


              function html(p) { return  p[field]; };

              var dd = d.map(html);
              var pp = p.map(html);
              var pd = _.union(dd, pp).sort();


              pd.map( function(pid) {
                  $("<option>", { value: pid, html: pid}).appendTo($select);
              });
          });

          Tracker.autorun(function () {
              var currentDoc = Session.get("CurrentDoc");
              if ( currentDoc != null && $select.val() !=  currentDoc[field]) {
                  $('select.' + field).val(currentDoc[field]);
              }
          });
        };


        Template.Patient_ID.destroyed = function () {
          // this.$('input').datepicker('remove');
        }

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
            "stringArray": function (val) {
                return val.split(" ");
            },
          }
        });

        Template.Sample_ID.events({
          'change select[name="Sample_ID"]': function (event, tmpl) {
              Session.set("CurrentDoc", currentDoc());
              Session.set("Sample_ID", $(event.target).val());
          },
        });




        Template.Sample_ID.helpers({
            atts: function() {
              var atts = _.clone(this.atts);
              // Add bootstrap class
              atts = AutoForm.Utility.addClass(atts, "form-control");
              return atts;
            }
          });

        Template.Sample_ID.rendered = function ()  {
          Template.Patient_ID.bindField("Sample_ID", "Patient_ID");
        };


        Template.Sample_ID.destroyed = function () {
        }


       Meteor.subscribe("Patient_IDs");
       Meteor.subscribe("Sample_IDs");

    } else if (Meteor.isServer)  {

        Meteor.publish("Patient_IDs", function() {
            if (this.userId) {
                var d =  CRFcollections.Demographics.find({}, {sort: {Patient_ID:1}, fields: { Patient_ID:1, Study_Site:1}});
                var p =  CRFcollections.Patient_Enrollment_form.find({}, {sort: {Patient_ID:1}, fields: { Patient_ID:1}});
                console.log("Patient_ID count Demographics", d.count(), "PEF", p.count());
                return [d, p];
            } else {
                console.log("Demographics none");
                return [];
            }
        });
        Meteor.publish("Sample_IDs", function() {
            if (this.userId) {
              var d =  CRFcollections.SU2C_Biopsy_V3.find({}, {sort: {Sample_ID:1}, fields: { Sample_ID:1}});
              var p =  CRFcollections.Tissue_Specimen_form.find({}, {sort: {Patient_ID:1}, fields: { Patient_ID:1}});
              console.log("Sample_ID count Demographics", d.count(), "PEF", p.count());
              return [d, p];
            }else {
              console.log("Sample_ID none");
              return [];
            }
        });
}

});

})();
