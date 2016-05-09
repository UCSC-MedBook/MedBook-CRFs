Meteor.publish('patient', function(patient_label, study_label) {
  check([patient_label, study_label], [String]);

  var user = MedBook.ensureUser(this.userId);
  var study = Collections.Studies.findOne({id: study_label});
  user.ensureAccess(study);

  patient = _.findWhere(study.patients, { patient_label: patient_label });

  return CRFs.find({
    Study_ID: study_label,
    $or: [
      { Patient_ID: patient_label },
      { Sample_ID: { $in: patient.sample_labels } }
    ]
  });
});

Meteor.publish('myForms', function(formName, study_label) {
  check([formName, study_label], [String]);

  var user = MedBook.ensureUser(this.userId);
  var study = Collections.Studies.findOne({id: study_label});
  user.ensureAccess(study);

  return CRFs.find({
    CRF: formName,
    $or: [
      { study: study_label },
      { Study_ID: study_label },
    ],
  });
});


Meteor.publish('studies', function() {
  var user = MedBook.ensureUser(this.userId);
  var collaborations = user.getCollaborations();

  var cursor = Collections.Studies.find({
    $or: [
      { public: true},
      { collaborations: {$in: collaborations }}
    ]
  });
  console.log("publish studies", cursor.count());
  return cursor;
});

Meteor.publish("metadata", function () {
  var user = MedBook.ensureUser(this.userId);
  console.log("user.getCollaborations():", user.getCollaborations());

  var studies = Collections.Studies.find({
    collaborations: { $in: user.getCollaborations() }
  }, { fields: { id: 1 } }).fetch();
  var studyLabels = _.pluck(studies, "id");

  return Collections.Metadata.find({
    study: { $in: studyLabels },
  });
});
