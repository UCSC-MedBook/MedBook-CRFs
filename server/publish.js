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
