Meteor.startup(function() {
  CRFprototypes.Biopsy_Research = {
    "Patient_ID": Patient_ID_Type,
    "Sample_ID": {
      type: String,
      label: "Sample ID"
    },
    "Date_of_Procedure": { optional: true, type: 'Date', autoform: autoformDate  },
    "Site": {
      optional: true, type: 'String',
      "allowedValues": [
        "Bone",
        "Liver",
        "Lymph Node",
        "Adrenal lesion",
        "Seminal Vesicle mass",
        "spinal mass",
        "Lung",
        "Bladder mass",
        "Other"
      ],
      "label": "Biopsy Site",
      "max": 200,
      type: String
    },
    "List_all_anticancer_meds__including_steroids__taken_within_the_7_days_leading_up_to_biopsy": { optional: true, type: 'String' },
    "If_Patient_took_a_Steroid_in_the_Last_7_Days__was_it_within_24_hours_of_Biopsy?": { optional: true, type: 'String' }
  };

  CRFfieldOrder.Biopsy_Research = [
    "Patient_ID",
  	"Sample_ID",
  	"Date_of_Procedure",
    "Site",
    "List_all_anticancer_meds__including_steroids__taken_within_the_7_days_leading_up_to_biopsy",
    "If_Patient_took_a_Steroid_in_the_Last_7_Days__was_it_within_24_hours_of_Biopsy?"
  ];

});
