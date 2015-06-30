Meteor.startup(function() {
  CRFprototypes.ECOG_Weight_V3 = {
    "Patient_ID": Patient_ID_Type,
    "Sample_ID": Sample_ID_Type,
    Day: { optional: true, type: 'Number' },
    'ECOG_PS': { optional: true, type: 'String' },
    Phase: { optional: true, type: 'String' },
    Segment: { optional: true, type: 'String' },
    'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    Weight: { optional: true, type: 'Number', decimal: true },
    Arm: { optional: true, type: 'String' }
  };

  CRFfieldOrder.ECOG_Weight_V3 = [
    'Patient_ID',
    'Sample_ID',
    'Day',
    'ECOG_PS',
    'Phase',
    'Segment',
    'Visit_Date',
    'Weight',
    'Arm',
  ];

});
