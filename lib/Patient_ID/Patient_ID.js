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


        Template.Patient_ID.events({
          'change select[name="Patient_ID"]': function (event, tmpl) {
                if (tmpl.data.go)
                    Router.go("CRFsPatient", {_patient: event.target.value});
                else
                    Session.set("CurrentDoc", currentDoc());
          },
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
            }
          });
         function bindField(field) {
             var $select = this.$('select[name="' + field + '"]');

             Tracker.autorun(function () {
                $select.find('option').remove();
                var f = {};
                f[field] = 1;

                var d =  CRFcollections.Demographics.find({}, {sort: f, fields: f});
                var p =  CRFcollections.Patient_Enrollment_form.find({}, {sort: f, fields: f});

                function html(p) {
                   return  p[field];
                }
                var dd = d.fetch().map(html);
                var pp = p.fetch().map(html);
                var pd = _.union(dd, pp).sort();
                pd.map( function(pid) {
                    $("<option>", { value: pid, html: pid}).appendTo($select);
                }); // map
            }) // tracker
         } // bindField

        Template.Patient_ID.rendered = function ()  {
            bindField("Patient_ID");
        }


        Template.Patient_ID.destroyed = function () {
          // this.$('input').datepicker('remove');
        }

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

        Template.Sample_ID.events({
          'change select[name="Sample_ID"]': function (event, tmpl) {
                Session.set("CurrentDoc", currentDoc());
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
            bindField("Sample_ID");
        };


        Template.Sample_ID.destroyed = function () {
        }


       Meteor.subscribe("Patient_IDs");
       Meteor.subscribe("Sample_IDs");

    } else if (Meteor.isServer)  {

        Meteor.publish("Patient_IDs", function() {
            if (this.userId) {
                var d =  CRFcollections.Demographics.find({}, {sort: {Patient_ID:1}, fields: { Patient_ID:1, Study_Site:1}});
                var p =  CRFcollections.Patient_Enrollment_form.find({}, {sort: {Patient_ID:1}, fields: { Patient_ID:1, Study_Site:1}});
                console.log("Patient_ID count Demographics", d.count(), "PEF", p.count());
                return [d, p];
            } else {
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
