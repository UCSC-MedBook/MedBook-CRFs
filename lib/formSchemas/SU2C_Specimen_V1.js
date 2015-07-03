Meteor.startup(function() {
  CRFprototypes.SU2C_Specimen_V1 = {
    "Patient_ID": Patient_ID_Type,
    "Sample_ID": Sample_ID_Type,
    'Best_Response': { optional: true, type: 'String' },
    Arm: { optional: true, type: 'String' },
    Day: { optional: true, type: 'Number' },
    Phase: { optional: true, type: 'String' },
    Segment: { optional: true, type: 'String' },
    'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'Were_study_blood_samples_collected_at_this_visit?': { optional: true, type: 'String' },
    Notes: { optional: true, type: 'String' }
  };

  CRFfieldOrder.SU2C_Specimen_V1 = [
    'Patient_ID',
    'Sample_ID',
    'Arm',
    'Day',
    'Phase',
    'Segment',
    'Visit_Date',
    'Were_study_blood_samples_collected_at_this_visit?',
    'Notes',
  ];

});
