Meteor.startup(function() {
  CRFprototypes.Tissue_Specimen_form = {
    //"Patient_ID": Patient_ID_Type,
    "Sample_ID": Sample_ID_Type,
    //"Core": core_type,
    "Attending_Radiologist": {
      "label": "Attending Radiologist",
      type: String,
      optional: true
    },
    "Box_ID": {
      "label": "Box ID",
      type: String,
      optional: true
    },
    "Cores": {
      type: [Object],
      optional: true
    },
    "Cores.$.ID": {
      type: String,
      label: "Core",
      "allowedValues": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
      ]
    },
    "Cores.$.Core": {
      type: String,
      "allowedValues": [
        "Fixed",
        "Frozen"
      ],
      "label":"Prep"
    },
    "Core_Notes": {
      "label": "Core Notes",
      type: String,
      optional: true
    },
    "CRC_at_Collection": {
      "label": "CRC at Collection",
      type: String,
      optional: true
    },
    "Fixed_Core_Ship_Date": {
      "label": "Fixed Core Ship Date",
      type: Date,
      autoform: autoformDate,
      optional: true
    },
    "Procedure_Date": {
      //        "capturetime": true,
      "label": "Procedure Date",
      type: Date,
      autoform: autoformDate
    },
    "Number_of_Cores": {
      type: Number,
      decimal: true,
      "label": "Number of Cores Collected"
    },
    "Freezer": {
      "label": "Frozen Core Storage",
      "max": 200,
      type: String,
      optional: true
    },
    "Timepoint": {
      label: "Timepoint",
      type: String,
      "allowedValues": [
        "Baseline",
        "Progression",
        "Progression2",
        "Progression3",
        "Progression4",
      ],
    },
    "TimepointNotes": {
      type: String,
      "label": "Timepoint Notes*",
      "max": 2000,
      optional: true
    }
  };

  CRFfieldOrder.Tissue_Specimen_form = [
    //"Patient_ID",
  	"Sample_ID",
    "Timepoint",
    "Procedure_Date",
    "Attending_Radiologist",
    "CRC_at_Collection",
  	"Number_of_Cores",
    "Cores",
  	"Fixed_Core_Ship_Date",
    "Freezer",
    "Box_ID",
    "Core_Notes",
    "TimepointNotes"
  ];

});
