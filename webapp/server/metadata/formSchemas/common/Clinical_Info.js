LoadMetadata({
  collaborations: [ "UCSC Forms" ],
  name: "Clinical_Info",
  specificity: "sample",
  fields: [
    {
      "label": "Prior Treatments",
      "optional": true,
      "type": "[String]",
    },
    {
      "label": "Biopsy Date",
      "optional": true,
      "type": "Date",
    },
    {
      "label": "Subsequent Treatments",
      "optional": true,
      "type": "[String]",
    },
    {
      "label": "Biopsy site",
      "allowedValues": [
        "Adrenal",
        "Bladder",
        "Bone",
        "Brain",
        "Liver",
        "Lung",
        "Lymph node",
        "Soft tissue",
        "Other"
      ],
      "optional": true,
      "type": "String",
    },
    {
      "label": "Enzalutamide",
      "allowedValues": [
        "Naive",
        "On Tx",
        "On-Tx",
        "Resistant",
        "Unk"
      ],
      "optional": true,
      "type": "String"
    },
    {
      "label": "Abiraterone",
      "allowedValues": [
        "Exposed",
        "Naive",
        "On Tx",
        "Resistant",
        "Unk"
      ],
      "optional": true,
      "type": "String"
    },
    {
      "label": "site",
      "allowedValues": [
        "OHSU",
        "UBC",
        "UCD",
        "UCLA",
        "UCLA-VA",
        "UCSF"
      ],
      "optional": true,
      "type": "String"
    },

    // some fields missing, to be filled in later
    {
      "label": "Age",
      "optional": true,
      "type": "Integer", // "Decimal" if {"decimal": true}
    },
    {
      "label": "Reason for Stop",
      "allowedValues": [
        "Adverse Event",
        "Adverse event (N/V)",
        "Adverse event (fatigue)",
        "Adverse event (febrile neutropenia)",
        "Adverse Event/Side Effects/Complications",
        "Adverse event - osteonecrosis",
        "Clinical PD",
        "Completed Treatment",
        "Death",
        "Death on study",
        "Disease progression, relapse during active treatment",
        "Lost to followup",
        "Other",
        "PD",
        "PSA + radiographic PD",
        "PSA PD",
        "PSA PD, adverse event",
        "PSA PD + patient withdrawal",
        "Progressive Disease",
        "Pt decision",
        "Physician Discretion",
        "Radiographic PD",
        "Patient Choice",
        "Patient Demise",
        "Patient withdrawal or refusal after beginning protocol therapy",
        "Patient withdrawal or refusal prior to beginning protocol therapy",
        "Treatment completed per protocol criteria",
        "TBD",
        "Tx break",
        "Tx ongoing",
        "N/A"
      ],
      "optional": true,
      "type": "String"
    },

    {
      "label": "AR Amplification by FISH",
      "optional": true,
      "type": "String"
    },




  ],
});
