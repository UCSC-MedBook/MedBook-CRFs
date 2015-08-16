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


  Template.Sample_ID.helpers({
      samples : function() {
        var query = {};
        var currentDoc = Session.get("CurrentDoc");
        console.log("CurrentDoc", currentDoc);


        /*
        console.log("BTC", query, clinicalBiopsyInfo);*/
        /*if (currentDoc && (currentDoc.Patient_ID != null))  {
           query["Patient_ID"] = currentDoc.Patient_ID;
           if (currentDoc.Sample_ID != null)
               setTimeout(function() {
                   $("[name='Sample_ID']").val(currentDoc.Sample_ID);
               }, 2000);
        }*/

        var clinicalBiopsyInfo = null;

        if(currentDoc && currentDoc.Sample_ID){
          var b =  Collections.SU2C_Biopsy_V3.find({"Patient_ID": currentDoc.Patient_ID}, { fields: {"Sample_ID":1}}).fetch().map(function(pef) { return pef.Sample_ID});
          var t =  Collections.Tissue_Specimen_form.find({"Patient_ID": currentDoc.Patient_ID}, { fields: {"Sample_ID":1}}).fetch().map(function(pef) { return pef.Sample_ID});
          var c =  Collections.Clinical_Info.find({"Patient_ID": currentDoc.Patient_ID}, { fields: {"Sample_ID":1}}).fetch().map(function(ci) { return ci.Sample_ID});

          clinicalBiopsyInfo = _.union(b,t,c).sort();

          console.log("clinicalBiopsyInfo", clinicalBiopsyInfo);
        }

        return clinicalBiopsyInfo;
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
