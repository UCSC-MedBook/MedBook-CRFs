Meteor.startup(function() {
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

});
