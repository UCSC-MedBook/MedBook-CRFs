Meteor.startup(function() {

  /*
  Histological Assessment
      each core
          Core Name A-F
          Block image
          Reference slide number
          Referecnce slide images
          Block Status : [
                  "negative,
                  "negative with potentia"l,
                  "defer to pathologist",
                  "positive for cancer (but not suitable for processing)",
                  "positive for processing"]
  */

  CRFprototypes.Histological_Assessment_form = {
    "Sample_ID": Sample_ID_Type,


    Cores: {
      type: Array,
      optional: true,
      autoform: {
         template: "bootstrap3-horizontal",
      },
    },
    'Cores.$': {
      type: Object,
      autoform: {
         template: "bootstrap3-horizontal",
      },
    },
    'Cores.$.Core': core_type,

    'Cores.$.BlockImage': {
      type: String,
      optional: true,
      autoform: {
         template: "bootstrap3-horizontal",
      },
    },
    'Cores.$.ReferenceSlideNumber': {
      type: String,
      autoform: {
         template: "bootstrap3-horizontal",
      },
    },
    'Cores.$.ReferenceSlideImages': {
      type: String,
      autoform: {
         template: "bootstrap3-horizontal",
      },
    },
    'Cores.$.BlockStatus': {
      type: String,
      "allowedValues": [
                  "negative",
                  "negative with potential",
                  "defer to pathologist",
                  "positive for cancer (but not suitable for processing)",
                  "positive for processing"]
    }
  };

  // ComplexIDFields['Histological_Assessment_form'] = [ "Patient_ID", "Core"];

  CRFfieldOrder.Histological_Assessment_form = [
    "Sample_ID",
    "Cores",
    /*
    'Cores.$.Core',
    'Cores.$.BlockImage',
    'Cores.$.ReferenceSlideNumber',
    'Cores.$.ReferenceSlideImages',
    'Cores.$.BlockStatus',
    */
  ];

});
