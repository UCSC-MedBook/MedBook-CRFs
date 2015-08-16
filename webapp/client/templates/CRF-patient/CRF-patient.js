
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
Template.CRFsPatient.events({
      'click .reactive-table tr': function (event) {
              //var post = this;
              // Session.set('post', post);
       }
});

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

window.currentStudy = function () {
  var study = Session.get("Current_Study");
  if (study == null) study = "prad_wcdt";
  return study;
}

window.personalPreferredTableOrder = function () {
  var user = Meteor.user();
  var study = currentStudy();
  var crfs = 
      CRFmetadataCollection.find({study:"common"}, {fields: {name:1}}).fetch().map(function(o) {return o.name}).concat(
      CRFmetadataCollection.find({study:study}, {fields: {name:1}}).fetch().map(function(o) {return o.name}));
  
  if (user && user.profile) {
       var prefer = user.profile.preferredTableOrder;
       if (prefer != null)  {
           if (study in prefer)
	       prefer = prefer[study];
           var first = _.intersection(crfs, prefer);
           var remaining = _.difference(crfs, prefer);
           return first.concat(remaining);
       }
  }

  return crfs;
}

Template.registerHelper("personalPreferredTableOrder", personalPreferredTableOrder);



collectionsInPreferredTableOrder =  function () {
        var output = [];
        var controller = Iron.controller();
        var patient_id = controller.state.get("Current_Patient_ID");


        function prep(collName) {
            if (collName in Collections) {
                var coll = Collections[collName];
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
