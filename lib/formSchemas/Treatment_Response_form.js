Meteor.startup(function() {

  // obsolete?

  CRFprototypes.Treatment_Response_form = {
    "Patient_ID": Patient_ID_Type,
    "Prior_Abiraterone": {
        "allowedValues": [
            "Naive",
            "Resistant",
        ],
        optional: true,
        "label": "Prior Abi response",
        type: String
    },
    "Prior_Abi_response": {
        "allowedValues": [
            "Yes",
            "No",
            "Unk",
        ],
        optional: true,
        "label": "Prior enza response",
        type: String
    },
    "Prior_Enzalutamide": {
        "allowedValues": [
            "Naive",
            "Resistant",
        ],
        optional: true,
        "label": "Prior Enzalutamide response",
        type: String
    },
    "Prior_Enza_response": {
        "allowedValues": [
            "Yes",
            "No",
            "Unk",
        ],
        optional: true,
        "label": "Prior enza response",
        type: String
    },
    "Post_Biopsy_treatment": {
        "allowedValues": [
            "Abiraterone",
            "BIND-014",
            "Cabazitaxel",
            "Carbo/taxotere",
            "Carboplatin/taxotere",
            "Cisplatin/etoposide",
            "Enzalutamide",
            "Enzalutamide + radium-223",
            "Mitoxantrone",
            "Post-biopsy treatment",
            "Radium-223",
            "Taxotere",
            "Taxotere + MLN8237",
            "Unk"
        ],
        optional: true,
        "label": "Post Biopsy treatment",
        type: String
    }
  };

  CRFfieldOrder.Treatment_Response_form = [
    "Patient_ID",
    "Prior_Abiraterone",
    "Prior_Abi_response",
    "Prior_Enzalutamide",
    "Prior_Enza_response",
    "Post_Biopsy_treatment"
  ];

});
