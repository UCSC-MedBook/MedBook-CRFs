
Meteor.publish('patient', function(patient_id, study_id) {
  console.log("publish patient", patient_id);
  if (this.userId == null)
      return [];

  var user = Meteor.users.findOne({_id: this.userId});
  var collaborations = user.getAssociatedCollaborations();
  return CRFs.find({Study_ID: study_id,
		  $or: [
		      {Patient_ID: patient_id},
		      {Sample_ID: { $regex: "^" + patient_id + ".*"}}
		  ]});
});

Meteor.publish('myForms', function(formName, studyName) {
  console.log("publish myForms", formName, studyName);
  if (this.userId == null)
      return [];
  var user = Meteor.users.findOne({_id: this.userId});
  var collaborations = user.getAssociatedCollaborations();

  var study = Collections.studies.findOne({id: studyName, 
      $or: [ 
	    { public: true},
	    { collaborations: {$in: collaborations }}
	    ]
  });
  if (study == null) {
      console.log("no study");
      return [];
  }

  var coll = Collections.Metadata.findOne({study: { $in: [ "common", studyName]}, name: formName});
  if (coll == null)
      throw new Error("Could not find Metadata for form " + formName + " in study " + studyName);

  var q = {CRF:formName};

  var schema = JSON.parse(coll.schema);
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

  var user = Meteor.users.findOne({_id: this.userId});
  var collaborations = user.getAssociatedCollaborations();

  var cursor = Collections.studies.find({
      $or: [ 
	    { public: true},
	    { collaborations: {$in: collaborations }}
	    ]
  });
  console.log("publish studies", cursor.count());
  return cursor;
});

