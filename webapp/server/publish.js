Meteor.publish('patient', function(patient_id, study_id) {
  check([patient_id, study_id], [String]);

  console.log("publish patient", patient_id);

  var user = MedBook.ensureUser(this.userId);
  var collaborations = user.getCollaborations();
  var study = Studies.findOne({id: study_id});
  user.ensureAccess(study);

  return CRFs.find({
    Study_ID: study_id,
    $or: [
      {Patient_ID: patient_id},
      {Sample_ID: { $regex: "^" + patient_id + ".*"}}
    ]
  });
});

Meteor.publish('myForms', function(formName, studyName) {
  check([formName, studyName], [String]);

  console.log("publish myForms", formName, studyName);

  var user = MedBook.ensureUser(this.userId);
  var collaborations = user.getCollaborations();

  // var study = Collections.studies.findOne({id: studyName,
  //   $or: [
  //     { public: true},
  //     { collaborations: {$in: collaborations }}
  //   ]
  // });
  // if (study == null) {
  //     console.log("no study");
  //     return [];
  // }
  var study = Studies.findOne({id: studyName});
  user.ensureAccess(study);

  var coll = Collections.Metadata.findOne({
    study: { $in: [ "common", studyName]},
    name: formName
  });
  if (!coll) {
    throw new Error("Could not find Metadata for form " + formName + " in study " + studyName);
  }

  var q = {CRF:formName};

  var schema = JSON.parse(coll.schema);
  if ("study" in schema) {
    q.study = studyName;
  } else if ("studies" in schema) {
    q.study = {$in: studyName};
  } else if ("Study_ID" in schema) {
    q.Study_ID = studyName;
  }

  var cursor =  Collections.CRFs.find(q);
  console.log("publish myForms", formName, "count=", cursor.count());
  return cursor
});


Meteor.publish('studies', function() {
  var user = MedBook.ensureUser(this.userId);
  var collaborations = user.getCollaborations();

  var cursor = Collections.studies.find({
    $or: [
      { public: true},
      { collaborations: {$in: collaborations }}
    ]
  });
  console.log("publish studies", cursor.count());
  return cursor;
});
