Meteor.startup(function() {
  CRFprototypes.RNASeq_completion_form = {
    /*"LNCAP_control_source": {
      "label": "LNCAP control source",
      type: String
    },*/
    "Patient_ID": Patient_ID_Type,
    "QC_reports": {
      "label": "QC reports",
      type: String
    },
    "RIN_score_from_UCSF": {
      "label": "RIN score from UCSF",
      type: Number
    },
    "date_completed": {
      //        "capturetime": false,
      "label": "date completed",
      type: Date
    },
    "date_received": {
      //        "capturetime": false,
      "label": "date received",
      type: Date
    },
    "library_prep_notes": {
      "label": "library prep notes",
      type: String
    },
    "library_prep_used": {
      "allowedValues": [
        "Illumina TruSeq Non-stranded",
        "Illumina TruSeq stranded",
        "NuGen non-stranded",
        "NuGen stranded",
        "Clone Tech stranded",
        "Clone Tech non-stranded"
      ],
      "label": "library prep used",
      "max": 200,
      type: String
    },
    "location_of_fastq_file": {
      "label": "location of fastq file",
      type: String
    }
  };

  CRFfieldOrder.RNASeq_completion_form = [
    "Patient_ID",
    //"LNCAP_control_source",
    "QC_reports",
    "RIN_score_from_UCSF",
    "date_completed",
    "date_received",
    "library_prep_used",
    "library_prep_notes",
    "location_of_fastq_file",
  ];

});
