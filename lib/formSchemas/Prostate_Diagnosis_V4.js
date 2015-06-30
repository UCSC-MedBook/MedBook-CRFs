Meteor.startup(function() {
  CRFprototypes.Prostate_Diagnosis_V4 = {
    "Patient_ID": Patient_ID_Type,
    'Date_of_CRPC_as_Defined_by_Treating_Physician': { optional: true, type: 'Date', autoform: autoformDate  },
    'Date_of_CRPC_as_Defined_by_Treating_Physician_Ext' : { optional: true, type: 'String' },
    'Date_of_First_Metastases': { optional: true, type: 'Date', autoform: autoformDate  },
    'Date_of_First_Metastases_Ext' : { optional: true, type: 'String' },
    'Disease_state_at_diagnosis': { optional: true, type: 'String' },
    'PSA_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'PSA_Date_Ext' : { optional: true, type: 'String' },
    'PSA_Value_at_Diagnosis': { optional: true, type: 'Number', decimal: true },
    Phase: { optional: true, type: 'String' },
    'Primary_Gleason_Score': { optional: true, type: 'Number' },
    'Secondary_Gleason_Score': { optional: true, type: 'Number' },
    Segment: { optional: true, type: 'String' },
    'Total_Gleason_Score': { optional: true, type: 'Number' },
    'Day': { optional: true, type: 'Number' },
    'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'Date_of_diagnosis': { optional: true, type: 'Date', autoform: autoformDate  }
  };

  CRFfieldOrder.Prostate_Diagnosis_V4 = [
    'Patient_ID',
    'Date_of_CRPC_as_Defined_by_Treating_Physician',
    'Date_of_CRPC_as_Defined_by_Treating_Physician_Ext',
    'Date_of_First_Metastases',
    'Date_of_First_Metastases_Ext',
    'Disease_state_at_diagnosis',
    'PSA_Date',
    'PSA_Date_Ext',
    'PSA_Value_at_Diagnosis',
    'Phase',
    'Primary_Gleason_Score',
    'Secondary_Gleason_Score',
    'Segment',
    'Total_Gleason_Score',
    'Visit_Date',
    'Day',
    'Date_of_diagnosis',
  ];

});
