LoadMetadata({
  collaborations: [ "WCDT" ],
  name: "Biopsy_Research",
  specificity: "sample",
  fields: [
    // add stuff here
    {
      "label": "Date_of_Procedure",
      "optional": true,
      "type": "Date",
    },
    {
      "label": "Site",
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
      "optional": true,
      "type": "Select"
    },
    {
      "label": "List_all_anticancer_meds__including_steroids__taken_within_the_7_days_leading_up_to_biopsy",
      "optional": true,
      "type": "[String]"
    },
    {
      "label": "If_Patient_took_a_Steroid_in_the_Last_7_Days__was_it_within_24_hours_of_Biopsy?",
      "optional": true,
      "type": "String"
    }
  ],
});
