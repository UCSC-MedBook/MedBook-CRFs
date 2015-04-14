
Template.CRFsPatient.rendered = function() {


  this.find('.js-title-nav')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        this.remove();
      });
    }
  };
};

Template.registerHelper("Current_Patient_ID", 
   function () {
      var patient_id = Iron.controller().state.get("Current_Patient_ID");
      $("select[name='Patient_ID']").find("option[value='" + patient_id + "']")[0].selected=1
      return patient_id;
   }
);

Template.registerHelper("AllCRFs", 
   function () {
      return personalPreferredTableOrder();
   }
);

window.personalPreferredTableOrder = function () {
  var user = Meteor.user();
  if (user && user.profile) {
       var prefer = user.profile.preferredTableOrder;
       if (prefer != null)  {
           var remaining = _.difference(CRFs, prefer);
           return prefer.concat(remaining);
       }
  }
  return CRFs;
}

Template.registerHelper("personalPreferredTableOrder", personalPreferredTableOrder);



collectionsInPreferredTableOrder =  function () {
        var output = [];
        var controller = Iron.controller();
        var patient_id = controller.state.get("Current_Patient_ID");


        function prep(collName) {
            if (collName in CRFcollections) {
                var coll = CRFcollections[collName];
                // console.log("prep", collName, "fieldOrder", CRFfieldOrder[collName]);
                var docs = coll.find({
                      $or: [
                          {Patient_ID: patient_id},
                          {Sample_ID: { $regex: "^" + patient_id + ".*"}}
                      ]}).fetch();
                output.push({ name: collName, displayName: collName.replace(/_/g, " "), collection: coll, fieldOrder: CRFfieldOrder[collName],   docs: docs, count: docs.length });
            }
        };
        var myOrder = personalPreferredTableOrder();
        myOrder.map(prep);

        
        console.log( "collectionsInPreferredTableOrder", output );

        return output;
    }

Template.registerHelper( "collectionsInPreferredTableOrder", collectionsInPreferredTableOrder );
