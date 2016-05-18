LoadMetadata({
  collaborations: [ "WCDT" ],
  name: "Patient Enrollment form",
  specificity: "patient",
  fields: [


    {

      "label": "Patient ID",
      "type": "String"
    },
    {

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
      "type": "Select"
    },
    {

      "label": "Baseline Sample ID",
      "type": "String"
    },
    {


      "label": "Baseline Biopsy Date",
      "type": "Date",
    },
    {
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
      "type": "Select"
    },
    {
      "label": "Progression Sample ID",
      "optional": true,
      "type": "String"
    },
    {

      "label": "Progression Biopsy Date",
      "optional": true,
      "type": "Date",

    },
    {
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
      "optional": true,
      "type": "String"
    }
  ]

})
