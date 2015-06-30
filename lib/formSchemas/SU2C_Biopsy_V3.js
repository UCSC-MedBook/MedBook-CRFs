Meteor.startup(function() {
  CRFprototypes.SU2C_Biopsy_V3 = {
    "Patient_ID": Patient_ID_Type,
    "Sample_ID": Sample_ID_Type,
     Arm: { optional: true, type: 'String' },
    'Date_of_Procedure': { optional: true, type: 'Date', autoform: autoformDate  },
    'Date_of_Procedure_Ext': { optional: true, type: 'String' },
    Day: { optional: true, type: 'Number' },
    Phase: { optional: true, type: 'String' },
    Segment: { optional: true, type: 'String' },
    Site: { optional: true, type: 'String' },
    'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'List_all_anticancer_meds__including_steroids__taken_within_the_7_days_leading_up_to_biopsy': { optional: true, type: 'String' },
    'If_Patient_took_a_Steroid_in_the_Last_7_Days__was_it_within_24_hours_of_Biopsy?': { optional: true, type: 'String' }
  };

  CRFfieldOrder.SU2C_Biopsy_V3 = [
    'Patient_ID',
    'Sample_ID',
    'Site',
    'Date_of_Procedure',
    'Date_of_Procedure_Ext',
    'Visit_Date',
    'List_all_anticancer_meds__including_steroids__taken_within_the_7_days_leading_up_to_biopsy',
    'If_Patient_took_a_Steroid_in_the_Last_7_Days__was_it_within_24_hours_of_Biopsy?',
    'Day',
    'Phase',
    'Segment',
    'Arm',
  ];

});
