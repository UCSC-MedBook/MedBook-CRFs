Meteor.startup(function() {
  CRFprototypes.SU2C_Biopsy_AE_V1 = {
    "Patient_ID": Patient_ID_Type,
    "Sample_ID": Sample_ID_Type,
    'Best_Response': { optional: true, type: 'String' },
    'Arm': { optional: true, type: 'String' },
    'Day': { optional: true, type: 'Number' },
    'Phase': { optional: true, type: 'String' },
    'Segment': { optional: true, type: 'String' },
    'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'Action': { optional: true, type: 'String' },
    'Adverse_Event_Description': { optional: true, type: 'String' },
    'Attribution': { optional: true, type: 'String' },
    'Grade': { optional: true, type: 'Number' },
    'Onset_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'Onset_Date_Ext': { optional: true, type: 'String' },
    'Outcome': { optional: true, type: 'String' },
    'Resolved_Date__Log_Column_': { optional: true, type: 'Date', autoform: autoformDate  },
    'Resolved_Date__Log_Column__Ext': { optional: true, type: 'String' },
    'Serious': { optional: true, type: 'String' },
    'Unexpected?': { optional: true, type: 'String' },
    'Toxicity_Category': { optional: true, type: 'String' },
    'Toxicity_Code': { optional: true, type: 'String' }
  };

  CRFfieldOrder.SU2C_Biopsy_AE_V1 = [
    'Patient_ID',
    'Sample_ID',
    'Arm',
    'Day',
    'Phase',
    'Segment',
    'Visit_Date',
    'Action',
    'Adverse_Event_Description',
    'Attribution',
    'Grade',
    'Onset_Date',
    'Onset_Date_Ext',
    'Outcome',
    //'Resolved_Date_(Log_Column)',
    //'Resolved_Date_(Log_Column)_Ext',
    'Serious',
    'Unexpected?',
    'Toxicity_Category',
    'Toxicity_Code',
  ];

});
