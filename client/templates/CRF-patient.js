
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

Template.registerHelper("AllCRFs", 
   function () {
      return personalPreferredTableOrder();
   }
);

window.personalPreferredTableOrder = function () {
   var prefer = Meteor.user().profile.preferredTableOrder;
   if (prefer == null) {
      Meteor.users.update({_id:Meteor.userId()}, { $set:{"profile.preferredTableOrder": CRFs}} )
      prefer = Meteor.user().profile.preferredTableOrder;
   }
   return prefer;
}

Template.registerHelper("personalPreferredTableOrder", personalPreferredTableOrder);


Template.CRFsPatient.helpers({
    collectionsInPreferredTableOrder: function () {
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

        var remaining = _.difference(Object.keys(CRFcollections), myOrder);
        remaining.map(prep);

        return output;
    },

    dataForTHIScollection: function () {
          var collName = this;  // WIERD is THIS
          var controller = Iron.controller();
          var patient_id = controller.state.get("Current_Patient_ID");

          var coll = CRFcollections[collName];
          var cursor = coll.find({
              $or: [
                  {Patient_ID: patient_id},
                  {Sample_ID: { $regex: "^" + patient_id + ".*"}}
              ]});
          // console.log("dataForTHIScollection patient", patient_id, collName);
          return cursor.count();
      }
  });
