
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
  console.log("publish myForms", formName, studyName);
  if (this.userId == null)
      return [];
  var user = Meteor.users.findOne({_id: this.userId});
  var collaborations = user.profile.collaborations;
  if (collaborations == null) collaborations = [];

  var study = Collections.studies.findOne({id: studyName, 
      $or: [ 
	    { public: true},
	    { collaborations: {$in: collaborations }}
	    ]
  });
  if (study == null)
      return [];

  var coll = Collections.Metadata.findOne({study: { $in: [ "common", studyName]}, name: formName});
  if (coll == null)
      throw new Error("Could not find Metadata for form " + formName + " in study " + studyName);

  var q = {CRF:formName};

  var schema = coll.schema;
  if ("study" in schema)
       q.study = studyName;
  else if ("studies" in schema)
       q.study = {$in: studyName};
  else if ("Study_ID" in schema)
       q.Study_ID = studyName;

  if (coll) {
      var cursor =  Collections.CRFs.find(q);
      console.log("publish myForms", formName, "count=", cursor.count());
      return cursor
  }
  console.log("myForms empty");
  return [];
});


Meteor.publish('studies', function() {
  if (this.userId == null)
      return [];

  var cursor = Collections.studies.find();
  console.log("publish studies", cursor.count());
  return cursor;
});

