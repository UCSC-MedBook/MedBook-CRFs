Meteor.startup(function() {
  CRFprototypes.Followup = {
    "Patient_ID": Patient_ID_Type,
    'Best_Response': { optional: true, type: 'String' },
    'Best_Response_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'Best_Response_Confirm': { optional: true, type: 'String' },
    'QA_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'Date_of_Progression': { optional: true, type: 'Date', autoform: autoformDate  },
    'Expired_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'Followup_Center': { optional: true, type: 'String' },
    'Followup_Start_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'Last_Known_Survival_Status': { optional: true, type: 'String' },
    'Last_Date_Known_Alive': { optional: true, type: 'Date', autoform: autoformDate  },
    'Off_Study_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'Off_Study_Reason': { optional: true, type: 'String' },
    'Off_Study_Reason_Explain': { optional: true, type: 'String' },
    'Off_Treatment_Date': { optional: true, type: 'Date', autoform: autoformDate  },
    'Off_Treatment_Reason': { optional: true, type: 'String' },
    'Off_Treatment_Reason_Explain': { optional: true, type: 'String' },
    'Last_Followup_Date': { optional: true, type: 'Date', autoform: autoformDate  },
  };

  CRFfieldOrder.Followup = [
    'Patient_ID',
    'Followup_Center',
    'Last_Known_Survival_Status',
    'Last_Date_Known_Alive',
    'Last_Followup_Date',
    'Expired_Date',

    'Date_of_Progression',
    'Followup_Start_Date',

    'Off_Treatment_Date',
    'Off_Treatment_Reason',
    'Off_Treatment_Reason_Explain',

    'Off_Study_Date',
    'Off_Study_Reason',
    'Off_Study_Reason_Explain',
    'Best_Response',
    'Best_Response_Date',
    'Best_Response_Confirm',

    'QA_Date',
  ];

});
