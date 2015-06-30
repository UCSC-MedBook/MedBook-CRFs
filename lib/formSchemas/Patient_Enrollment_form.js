Meteor.startup(function() {
  CRFprototypes.Patient_Enrollment_form = {
    "Study_Site": {
      "allowedValues": [
        "UCSF",
        "OHSU",
        "UCLA",
        "UCD",
        "UBC",
        "LAVA"
      ],
      "label": "Institution",
      "max": 200,
      type: String
    },
    "Patient_ID": {
      type: String,
      label: "Patient ID"
    },
    "Baseline_Biopsy_Date": {
      "label": "Baseline Biopsy Date",
      type: Date,
      autoform: autoformDate,
    }
    ,
    "Progression_Biopsy_Date": {
      "label": "Progression Biopsy Date",
      type: Date,
      optional: true,
      autoform: autoformDate,
    }
    ,
    "Baseline_Biopsy_Site": {
      "allowedValues": [
        "Bone",
        "Liver",
        "Lymph Node",
        "Adrenal lesion",
        "Seminal Vesicle mass",
        "spinal mass",
        "Lung",
        "Bladder mass"
      ],
      "label": "Baseline Biopsy Site",
      "max": 200,
      type: String
    },
    "Progression_Biopsy_Site": {
      "allowedValues": [
        "Bone",
        "Liver",
        "Lymph Node",
        "Adrenal lesion",
        "Seminal Vesicle mass",
        "spinal mass",
        "Lung",
        "Bladder mass"
      ],
      "label": "Progression Biopsy Site",
      "max": 200,
      type: String,
      optional: true
    },

    "Baseline_Sample_ID": {
      type: String,
      label: "Baseline Sample ID"
    } ,
    "Progression_Sample_ID": {
      type: String,
      optional: true,
      label: "Progression Sample ID"
    }
  };

  CRFfieldOrder.Patient_Enrollment_form = [
    "Patient_ID",
  	"Study_Site",
  	"Baseline_Sample_ID",
  	"Baseline_Biopsy_Date",
    "Baseline_Biopsy_Site",
  	"Progression_Sample_ID",
    "Progression_Biopsy_Date",
    "Progression_Biopsy_Site"
  ];

});
