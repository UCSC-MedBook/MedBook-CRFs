Meteor.startup(function() {
  CRFprototypes.SU2C_Pr_Ca_Tx_Sumry_V2 = {
    "Patient_ID": Patient_ID_Type,
    "Sample_ID": Sample_ID_Type,
    'Best_Response': { optional: true, type: 'String' },
    Day: { optional: true, type: 'Number' },
    Phase: { optional: true, type: 'String' },
    'Radiation_Therapy': { optional: true, type: 'String' },
    'Radical_Prostatectomy': { optional: true, type: 'String' },
    Segment: { optional: true, type: 'String' },
    'Start_Date_Ext': { optional: true, type: 'String' },
    'Stop_Date_Ext': { optional: true, type: 'String' },
    'Surgery_Date_Ext': { optional: true, type: 'String' },
    'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'Start_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'Stop_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'Surgery_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    Arm: { optional: true, type: 'String' }
  };

  CRFfieldOrder.SU2C_Pr_Ca_Tx_Sumry_V2 = [
    'Patient_ID',
    'Sample_ID',
    'Day',
    'Phase',
    'Radiation_Therapy',
    'Radical_Prostatectomy',
    'Segment',
    'Start_Date_Ext',
    'Stop_Date_Ext',
    'Surgery_Date_Ext',
    'Visit_Date',
    'Start_Date',
    'Stop_Date',
    'Surgery_Date',
    'Arm',
  ];

});
