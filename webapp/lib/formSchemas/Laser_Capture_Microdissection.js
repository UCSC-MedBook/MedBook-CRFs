Meteor.startup(function() {
  /*
  Laser_Capture_Microdissection
      each core
          StudyID
          Core
          Completion_Date
          Slide: 1-10
          Estimated total capture area: [1-20] (float) mm^2
          Lysates: [ 1-4 ]
          Lysate volume: [50-200] microliters
          Downstream use: ["RNA", "DNA", "aCGH"]

  All LCM forms, sort by Downstream_use
  */

  // ComplexIDFields['Laser_Capture_Microdissection'] = [ "Patient_ID", "Core"];

  CRFprototypes.Laser_Capture_Microdissection = {
    "Sample_ID": Sample_ID_Type,
    "Core": {
      "allowedValues": CoreAllowedValues,
      "label": "Core",
      "max": 200,
      type: String
    }
    ,
    "Completion_Date": {
      "label": "Completion Date",
      type: Date,
      autoform: {
        afFieldInput: {
          type: 'bootstrap-datepicker',
          timezoneId: 'America/Los_Angeles'
        }
      }
    },
    'SlideNumber': {
      type: Number,
      min: 1,
      max: 10
    },
    "Estimated_total_capture_area": {
      label: "Estimated total capture area: [1-20] (float) mm^2",
      type: Number,
      min: 1,
      max: 20
    },
    "Lysates": {
      label: "Lysates [1-4]",
      type: Number,
      min: 1,
      max: 4,
    },
    "Lysates_Volume": {
      label: "Lysate volume: [50-200] microliters",
      type: Number,
      min: 50,
      max: 200,
    },
    "Downstream_use": {
      "label": "Downstream use",
      "max": 200,
      "type": String,
      "allowedValues": [ "RNA analysis", "DNA analysis", "aCGH analysis"],
    },
  };

  CRFfieldOrder.Laser_Capture_Microdissection = [
    "Sample_ID",
    "Core",
    "Completion_Date",
    'SlideNumber',
    "Estimated_total_capture_area",
    "Lysates", "Lysates_Volume",
    "Downstream_use"
  ];

});
