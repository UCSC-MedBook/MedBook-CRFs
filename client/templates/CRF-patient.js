
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
      return CRFs;
   }
);

Template.CRFsPatient.helpers({
    dataForTHIScollection: function () {
          var collName = this;  // WIERD is THIS
          var patient_id = Session.get("Current_Patient_ID");

          var coll = CRFcollections[collName];
          var cursor = coll.find({
              $or: [
                  {Patient_ID: patient_id},
                  {Sample_ID: { $regex: "^" + patient_id + ".*"}}
              ]});
          console.log("dataForTHIScollection patient", patient_id, collName);
          return cursor.count();
      }
  });
