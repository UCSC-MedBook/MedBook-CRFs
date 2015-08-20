
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
          var coll = Collections[collName];
          var cursor = coll.find({
              $or: [
                  {Patient_ID: patient_id},
				          {Sample_ID: { $regex: "^" + patient_id + ".*"}}
              ]});
          console.log("publish patient", patient_id, collName);
          manyCursors.push(cursor);
      });
      return manyCursors;
  }
  return [];
});

Meteor.publish('myForms', function(formName, studyName) {
  console.log("publish collaboration", name);
  if (this.userId == null)
      return [];
  var user = Meteor.users.findOne({_id: this.userId});
  var collaborations = user.profile.collaboration;

  var study = Collections.studies.findOne({name: studyName, 
      $or: [ 
	    { public: true},
	    { collaborations: {$in: collaborations }}
	    ]
  });
  if (study == null)
      return [];

  var coll = CRFmetadataCollection.findOne({study: studyName, name: formName});
  if (coll)
      return Collections[formName].find({});
  return [];
});

