
Meteor.publish('Oncore', function() {
  if (this.userId == null)
      return [];

  var user = Meteor.users.findOne({_id: this.userId});
  console.log("publish collabration", user);
  var collaborations = user.profile.collaborations;
  if (collaborations && collaborations.indexOf("WCDT") >= 0)
      return Oncore.find({});
  return [];

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
