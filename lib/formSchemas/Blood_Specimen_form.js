Meteor.startup(function() {
  CRFprototypes.Blood_Specimen_form = {
    "CRC_at_Collection": {
      "label": "CRC at Collection",
      type: String,
      optional: true
    },
    "Draw_Date": {
      //        "capturetime": true,
      "label": "Draw Date",
      type: Date
    },
    "Patient_ID": Patient_ID_Type,
    "Timepoint": {
      "label": "Collection Timepoint",
      "allowedValues": [
        "Baseline",
        "3 Months",
        "Progression",
        "Progression2",
        "Progression3"
      ],
      type: String
    }
  };

  CRFfieldOrder.Blood_Specimen_form = [
    "Patient_ID",
    "Timepoint",
    "Draw_Date",
    "CRC_at_Collection"
  ];

});
