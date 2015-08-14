
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
  if (this.userId == null)
      return [];

  var user = Meteor.users.findOne({_id: this.userId});
  var collaborations = user.profile.collaborations;
  if (collaborations && collaborations.indexOf("WCDT") >= 0)
      return Oncore.find({});
  return [];

});

Meteor.publish('publicLists', function() {
  console.log("publication: publicLists");

  var result = CRFmetadataCollection.find({userId: {$exists: false}});
  //console.log(result);

  return result;
});

Meteor.publish('privateLists', function() {
  console.log("publication: privateLists");

  if (this.userId) {
    var result = CRFmetadataCollection.find({userId: this.userId});
    //console.log(result);

    return result;

  } else {
    this.ready();
  }
});


/*Meteor.publish('CRFs', function(listId) {
  check(listId, String);

  return CRFs.find({listId: listId});
});*/
