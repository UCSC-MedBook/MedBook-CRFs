Meteor.startup(function() {

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

});
