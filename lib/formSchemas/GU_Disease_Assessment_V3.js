Meteor.startup(function() {
  CRFprototypes.GU_Disease_Assessment_V3 = {
    "Patient_ID": Patient_ID_Type,
    "Sample_ID": Sample_ID_Type,
    'Best_Response': { optional: true, type: 'String' },
    'Are_Lesions_Present?': { optional: true, type: 'String' },
    'Date_of_Procedure': { optional: true, type: 'Date', autoform: autoformDate  },
    'Date_of_Procedure_Ext': { optional: true, type: 'String' },
    'Day': { optional: true, type: 'Number' },
    'Phase': { optional: true, type: 'String' },
    'Procedure': { optional: true, type: 'String' },
    'Segment': { optional: true, type: 'String' },
    'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'Arm': { optional: true, type: 'String' },
    'Compared_with_previous_scan': { optional: true, type: 'String' },
    'Comments': { optional: true, type: 'String' }
  }

  CRFfieldOrder.GU_Disease_Assessment_V3 =  [
   'Patient_ID',
   'Sample_ID',
   'Are_Lesions_Present?',
     'Date_of_Procedure',
     'Date_of_Procedure_Ext',
     'Day',
     'Phase',
     'Procedure',
     'Segment',
     'Visit_Date',
     'Compared_with_previous_scan',
     'Comments',
     'Arm',
   ]

});
