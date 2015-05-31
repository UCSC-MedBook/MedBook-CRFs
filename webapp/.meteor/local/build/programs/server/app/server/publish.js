(function(){
Meteor.publish('patient', function(patient_id) {
  console.log("publish patient", patient_id);
  if (this.userId == null)
      return [];

  var user = Meteor.users.findOne({_id: this.userId});
  var collaborations = user.profile.collaborations;
  if (collaborations && collaborations.indexOf("WCDT") >= 0) {

      // kosher user
      var manyCursors = []
      CRFs.map(function(collName) {
          var coll = CRFcollections[collName];
          var cursor = coll.find({
              $or: [
                  {Patient_ID: patient_id},
                  {Sample_ID: { $regex: "^" + patient_id + ".*"}}
              ]});
          console.log("subscribe patient", patient_id, collName);
          manyCursors.push(cursor);
      });
      return manyCursors;
  }
  return [];
});

Meteor.publish('collaboration', function(name) {
  console.log("publish collaboration", name);
  if (this.userId == null)
      return [];

  var user = Meteor.users.findOne({_id: this.userId});
  var collaborations = user.profile.collaborations;
  if (collaborations && collaborations.indexOf("WCDT") >= 0)
      return CRFcollections[name].find({});
  return [];
});

Meteor.publish('Oncore', function() {
  if (this.userId == null){
      return [];
  }else{
    return Oncore.find();
  }

  // ISSUE:  Add checks for WCDT to access CRF app
  /*var user = Meteor.users.findOne({_id: this.userId});
  var collaborations = user.profile.collaborations;
  if (collaborations && collaborations.indexOf("WCDT") >= 0)
      return Oncore.find({});
  return [];*/

});

Meteor.publish('publicLists', function() {
  return CRFmetadataCollection.find({userId: {$exists: false}});
});

Meteor.publish('privateLists', function() {
  if (this.userId) {
    return CRFmetadataCollection.find({userId: this.userId});
  } else {
    this.ready();
  }
});

/*
Meteor.publish('CRFs', function(listId) {
  check(listId, String);

  return CRFs.find({listId: listId});
});
*/

})();
