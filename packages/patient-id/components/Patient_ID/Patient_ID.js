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
                var s =  $(event.target).val();
                Session.set("Sample_ID", s);
                SetCurrentDoc("Sample_ID", s);
          },
        });


        Template.Sample_ID.helpers({
            atts: function addFormControlAtts() {
              var atts = _.clone(this.atts);
              // Add bootstrap class
              atts = AutoForm.Utility.addClass(atts, "form-control");
              return atts;
            },
            samples : function() {
                var q = {};
               var cd = Session.get("CurrentDoc");
               if (cd && cd.Patient_ID != null)  {
                   q["Patient_ID"] = cd.Patient_ID; 
                   var hackInSample_ID = cd.Sample_ID; 
                   if (hackInSample_ID != null)
                       setTimeout(function() {
                           $("[name='Sample_ID']").val(hackInSample_ID);
                       }, 2000);
                }

                var b =  CRFcollections.SU2C_Biopsy_V3.find(q, { fields: {"Sample_ID":1}}).fetch().map(function(pef) { return pef.Sample_ID});
                var t =  CRFcollections.Tissue_Specimen_form.find(q, { fields: {"Sample_ID":1}}).fetch().map(function(pef) { return pef.Sample_ID});
                var c =  CRFcollections.Clinical_Info.find(q, { fields: {"Sample_ID":1}}).fetch().map(function(ci) { return ci.Sample_ID});
                var btc = _.union(b,t,c).sort();
                console.log("BTC", q, btc);
                return btc;
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


        Template.Sample_ID.rendered = function ()  {
             var self = this;
             var $elem = $(self.find("[name='Sample_ID']"));
             // $elem.tagsinput();
             Tracker.autorun(function () {
                var cd = Session.get("CurrentDoc");
                if (cd) {
                    if ($elem.val() != cd.Sample_ID);
                        $elem.val(cd.Sample_ID);
                }
                 }); // tracker
        };
        Template.Sample_ID.destroyed = function () {
        }


       Meteor.subscribe("Patient_IDs");
       Meteor.subscribe("Sample_IDs");

    } else if (Meteor.isServer)  {

        Meteor.publish("Patient_IDs", function() {
            if (this.userId) {
                var d =  CRFcollections.Demographics.find({}, {sort: {Patient_ID:1}, fields: { Patient_ID:1, Study_Site:1}});
                var p =  CRFcollections.Patient_Enrollment_form.find({}, {sort: {Patient_ID:1}, fields: { Sample_ID: 1, Patient_ID:1}});
                var c =  CRFcollections.Clinical_Info.find({}, {sort: {Patient_ID:1}, fields: { Sample_ID: 1, Patient_ID:1}});
                console.log("Patient_ID count Demographics", d.count(), "PEF", p.count(), "CI", c.count());
                return [d, p, c];
            } else {
                console.log("Demographics none");
                return [];
            }
        });
        Meteor.publish("Sample_IDs", function() {
            if (this.userId) {
                var d =  CRFcollections.SU2C_Biopsy_V3.find({}, {sort: {Sample_ID:1}, fields: { Patient_ID:1, Sample_ID:1}});
                var p =  CRFcollections.Biopsy_Research.find({}, {sort: {Sample_ID:1}, fields: { Patient_ID:1, Sample_ID:1}});
                var c =  CRFcollections.Clinical_Info.find({}, {sort: {Patient_ID:1}, fields: { Sample_ID: 1, Patient_ID:1}});
                console.log("Sample_ID count SU2C_Biospy + Biopsy Research", d.count(), "PEF", p.count());
                return [d, p, c];
            }else {
                console.log("Sample_ID none");
                return [];
            }
        });
}

});
