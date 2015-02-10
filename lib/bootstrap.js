
CRFmetadataCollection = new Meteor.Collection('CRFmetadataCollection');

// Calculate a default name for a list in the form of 'List A'
CRFmetadataCollection.defaultName = function() {
  var nextLetter = 'A', nextName = 'List ' + nextLetter;
  while (CRFmetadataCollection.findOne({name: nextName})) {
    // not going to be too smart here, can go past Z
    nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    nextName = 'CRF ' + nextLetter;
  }

  return nextName;
};


// if the database is empty on server start, create some sample data.
ComplexIDFields = {};
CoreAllowedValues = [
        "A",
        "B",
        "C",
        "D",
        "E ",
        "F",
        "G",
        "N/A"
];

CRFcollections = {}
CRFfieldOrder = {};

CRFs = [
    'Patient Enrollment form',
    'Treatment History',
    'Tissue Specimen form',
    'Blood Specimen form',
    'Histological Assessment form',
    'Laser Capture Microdissection',
    'RNASeq completion form',
    'Pathology form',
    'Clinical Info',
];

Patient_ID_Type_Meta = {
    "allowedValues": crf_ids_potential(),
    "label": "Patient ID",
    type: String
};

Patient_ID_Type = {
    "allowedValues": crf_ids_potential(),
    "label": "Patient ID",
    type: String
};

core_type = {
    "allowedValues": CoreAllowedValues,
    "label": "Core",
    "max": 200,
    type: String
};
Completion_Date_type = {
    "label": "Completion Date",
    type: Date
};


CRFfieldOrder['Patient Enrollment form']=[
    "Patient_ID",
    "Baseline_Biopsy_Date",
    "Baseline_Biopsy_Site",
    "Institution",
];

CRFfieldOrder['Tissue Specimen form']=[
    "Patient_ID",
    "Core",
    "Timepoint",
    "Attending_Radiologist",
    "Biopsy_Site",
    "CRC_at_Collection",
    "Procedure_Date",
    "Procedure_Site",
    "Timepoint",
    "TimepointNotes",
    "Freezer",
    "Box_ID",
    "Core_Notes",
    "Tissue_Preparation",
];
CRFfieldOrder['Blood Specimen form']=[
    "Patient_ID",
    "CRC_at_Collection",
    "Draw_Date_and_Time",
    "Procedure_Site",
    "Serum",
    "Sodium_Heparin",
    "Timepoint",
];

CRFfieldOrder['Pathology form']=[
    "Patient_ID",
    "Core",
    "AR-FISH_ratio",
    "AR-FISH_result",
    "AR-FISH_test_performed",
    "CHGA_result",
    "CHGA_test_performed",
    "ION_Torrent_test_performed",
    "PTEN-IHC_result",
    "PTEN_test_performed",
    "Percent_Tumor_High",
    "Percent_Tumor_low",
    "Small_cell_morphology_core_call",
    "biopsy_timepoint",
    "core_analyzed_(only_for_frozen)",
];
CRFfieldOrder['Treatment History']=[
    "Patient_ID",
    "Abiraterone",
    "Biopsy_Site",
    "Casodex",
    "Docetaxel_Response",
    "Duration_(days)",
    "Enzaludimide",
    "Institution",
    "On_study_Treatment",
    "Primary_Hormone_Response",
    "Reason_for_stopping",
    "Surgical_Castration",
    "Survival_(days)",
    "core_analyzed",
];
CRFfieldOrder['RNASeq completion form']=[
    "Patient_ID",
    "LNCAP_control_source",
    "QC_reports",
    "RIN_score_from_UCSF",
    "date_completed",
    "date_received",
    "library_prep_used",
    "library_prep_notes",
    "location_of_fastq_file",
];

if (Meteor.isServer)
    CRFmetadataCollection.remove({});

if (true || CRFmetadataCollection.find().count() === 0) {
// this needs to be parameterized by study somehow.
    function crf_ids_potential() {
        var s = [];
        for (var i = 0; i <= 300; i++)
            s.push("DTB-" + ("00" + i).slice(-3))
        return s;
    }

    function crf_ids_actual() {
        var enrolled = CRFcollections['Patient Enrollment form'].find({}, {sort: {name:1}});
        var pids = enrolled.map(function(p){ return p.Patient_ID});
        console.log("crf_ids_actual", pids);
        return pids;
    }

    clinicalReportFormSchemaObject = SimpleSchema({
        _id: {
            type: String,
            optional: true,
        },
        createdAt: {
            type: Date,
            optional: true,
        },
    });


    CRFprototypes = {};
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
   CRFfieldOrder['Histological Assessment form']=[
      "Patient_ID",
      'Core',
      'BlockImage',
      'ReferenceSlideNumber',
      'ReferenceSlideImages',
      'BlockStatus',
    ];
    ComplexIDFields['Histological Assessment form'] = [ "Patient_ID", "Core"];

    CRFprototypes['Histological Assessment form'] = ({
      "Patient_ID": Patient_ID_Type,
      "Core": core_type,
      'BlockImage': {
        type: String
      },
      'ReferenceSlideNumber': {
        type: String
      },
      'ReferenceSlideImages': {
        type: String
      },
      'BlockStatus': {
        type: String,
        "allowedValues": [
                    "negative",
                    "negative with potential",
                    "defer to pathologist",
                    "positive for cancer (but not suitable for processing)",
                    "positive for processing"]
      },
    });

    /*
    Laser Capture_Microdissection
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


    CRFfieldOrder['Laser Capture Microdissection']=["Patient_ID","Core", "Completion_Date", 'SlideNumber', "Estimated_total_capture_area", "Lysates", "Lysates_Volume", "Downstream_use"];
    ComplexIDFields['Laser_Capture_Microdissection'] = [ "Patient_ID", "Core"];

    CRFprototypes['Laser Capture Microdissection'] = ({
      "Patient_ID": Patient_ID_Type,
        "Core": {
            "allowedValues": CoreAllowedValues,
            "label": "Core",
            "max": 200,
            type: String
        }
        ,
      "Completion_Date": {
            "label": "Completion Date",
            type: Date
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
    });

    CRFprototypes['Patient Enrollment form'] = ({
        "Baseline_Biopsy_Date": {
//        "capturetime": false,
            "label": "Baseline Biopsy Date",
            type: Date
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
        "Institution": {
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
      "Patient_ID": Patient_ID_Type_Meta,
    } );
    CRFprototypes['Tissue Specimen form'] = ({
      "Patient_ID": Patient_ID_Type,
       "Core": core_type,

       "Attending_Radiologist": {
            "label": "Attending Radiologist",
            type: String
       },

       "Biopsy_Site": {
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
            "label": "Biopsy Site",
            "max": 200,
            type: String
        },
        "CRC_at_Collection": {
            "label": "CRC at Collection",
            type: String
        },
        "Procedure_Date": {
//        "capturetime": true,
            "label": "Procedure Date",
            type: Date
        },
        "Procedure_Site": {
            "allowedValues": [
                "UCSF",
                "OHSU",
                "UCLA",
                "UCD",
                "UBC",
                "LAVA",
                "UCSF PAR"
            ],
            "label": "Procedure Site",
            "max": 200,
            type: String
        },
        "Timepoint": {
            "allowedValues": [
                "Baseline",
                "Progression1",
                "Progression2",
                "Discontinuity Progression"
            ],
            "label": "Timepoint",
            "max": 200,
            type: String
        },
        "TimepointNotes": {
            type: String,
            "label": "Timepoint Notes*",
            "max": 2000,
        },

        "Box_ID": {
            "label": "Box ID",
            type: String
        },
        "Core_Notes": {
            "label": "Core Notes",
            type: String
        },
        "Freezer": {
            "allowedValues": [
                "LN2",
                "UCD",
                "UCSF MTZ",
                "UBC",
                "UCLA",
                "LAVA",
                "OHSU"
            ],
            "label": "Freezer",
            "max": 200,
            type: String
        },
        "Tissue_Preparation": {
            "allowedValues": [
                "Frozen",
                "Fixed"
            ],
            "label": "Tissue Preparation",
            "max": 200,
            type: String
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
    } );

    CRFprototypes['Blood Specimen form'] = ({
        "CRC_at_Collection": {
            "label": "CRC at Collection",
            type: String
        },
        "Draw_Date_and_Time": {
//        "capturetime": true,
            "label": "Draw Date and Time",
            type: Date
        },
      "Patient_ID": Patient_ID_Type,
      "Procedure_Site": {
            "allowedValues": [
                "UCSF",
                "OHSU",
                "UCLA",
                "UCD",
                "UBC",
                "LAVA",
                "UCSF PAR"
            ],
            "label": "Procedure Site",
            "max": 200,
            type: String
        },
        "Serum": {
            "allowedValues": [
                "Yes",
                "No"
            ],
            "label": "Serum",
            "max": 200,
            type: String
        },
        "Sodium_Heparin": {
            "allowedValues": [
                "Yes",
                "No"
            ],
            "label": "Sodium Heparin",
            "max": 200,
            type: String
        },
        "Timepoint": {
            "label": "Timepoint",
            type: String
        }
    } );

    CRFprototypes['Pathology form'] = ({
        "Patient_ID": Patient_ID_Type,
         "Core": core_type,
        "AR-FISH_ratio": {
            "label": "AR-FISH ratio",
            type: Number
        },
        "AR-FISH_result": {
            "allowedValues": [
                "Positive",
                "Negative",
                "Weak",
                "N/A"
            ],
            "label": "AR-FISH result",
            "max": 200,
            type: String
        },
        "AR-FISH_test_performed": {
            "allowedValues": [
                "Yes",
                "No"
            ],
            "label": "AR-FISH test performed",
            "max": 200,
            type: String
        },
        "CHGA_result": {
            "allowedValues": [
                "Positive",
                "Negative",
                "Weak",
                "N/A"
            ],
            "label": "CHGA result",
            "max": 200,
            type: String
        },
        "CHGA_test_performed": {
            "allowedValues": [
                "Yes",
                "No"
            ],
            "label": "CHGA test performed",
            "max": 200,
            type: String
        },
        "ION_Torrent_test_performed": {
            "allowedValues": [
                "Yes",
                "No"
            ],
            "label": "ION Torrent test performed",
            "max": 200,
            type: String
        },
        "PTEN-IHC_result": {
            "allowedValues": [
                "Positive",
                "Negative",
                "Weak",
                "N/A"
            ],
            "label": "PTEN-IHC result",
            "max": 200,
            type: String
        },
        "PTEN_test_performed": {
            "allowedValues": [
                "Yes",
                "No"
            ],
            "label": "PTEN test performed",
            "max": 200,
            type: String
        },
        "Percent_Tumor_High": {
            "label": "Percent Tumor High",
            "max": 100,
            "min": 0,
            type: Number
        },
        "Percent_Tumor_low": {
            "label": "Percent Tumor low",
            "max": 100,
            "min": 0,
            type: Number
        },
        "Small_cell_morphology_core_call": {
            "allowedValues": [
                "Positive",
                "Negative",
                "N/A"
            ],
            "label": "Small cell morphology core call",
            "max": 200,
            type: String
        },
        "biopsy_timepoint": {
            "allowedValues": [
                "Baseline",
                "Progression",
                "Progression2"
            ],
            "label": "biopsy timepoint",
            "max": 200,
            type: String
        },
        "core_analyzed_(only_for_frozen)": {
            "allowedValues": CoreAllowedValues,
            "label": "core analyzed (only for frozen)",
            "max": 200,
            type: String
        },
    } );
    CRFprototypes['Treatment History'] = ({
        "Abiraterone": {
            "allowedValues": ["Yes", "No"],
            "label": "Abiraterone",
            "max": 200,
            type: String
        },
        "Biopsy_Site": {
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
            "label": "Biopsy Site",
            "max": 200,
            type: String
        },
        "Casodex": {
            "allowedValues": ["Yes", "No"],
            "label": "Casodex",
            "max": 200,
            type: String
        },
        "Docetaxel_Response": {
            "allowedValues": ["PR", "Resistant", "Naive", "Unknown"],
            "label": "Docetaxel Response ",
            "max": 200,
            type: String
        },
        "Duration_(days)": {
            "label": "Duration (days) ",
            "max": 10000,
            "min": 0,
            type: Number
        },
        "Enzaludimide": {
            "allowedValues": ["Yes", "No"
            ],
            "label": "Enzaludimide",
            "max": 200,
            type: String
        },
        "Institution": {
            "allowedValues": ["UCSF", "OHSU", "UCLA", "UCD", "UBC", "LAVA"
            ],
            "label": "Institution",
            "max": 200,
            type: String
        },
        "On_study_Treatment": {
            "allowedValues": [
                "Camp clinical trial",
                "Abriraterone",
                "Enzaludimide",
                "Xofigo",
                "Taxotere",
                "Taxotere+MLN8237",
                "Targeted docetaxel",
                "Cytoxan",
                "Carboplatin+Taxotere",
                "Hsp90",
                "Cisplatin+Etoposide",
                "DNA-PK+mTOR",
                "Mitoxantrone",
                "Itraconazole",
                "Radiotherapy"
            ],
            "label": "On study Treatment",
            "max": 200,
            type: String
        },
      "Patient_ID": Patient_ID_Type,
        "Primary_Hormone_Response": {
            "allowedValues": [
                "No",
                "Yes",
                " "
            ],
            "label": "Primary Hormone Response",
            "max": 200,
            type: String
        },
        "Reason_for_stopping": {
            "allowedValues": [
                "No",
                "Yes",
                " "
            ],
            "label": "Reason for stopping",
            "max": 200,
            type: String
        },
        "Surgical_Castration": {
            "allowedValues": [
                "Yes",
                "No"
            ],
            "label": "Surgical Castration",
            "max": 200,
            type: String
        },
        "Survival_(days)": {
            "label": "Survival (days) ",
            "max": 10000,
            "min": 0,
            type: Number
        },
        "core_analyzed": {
            "allowedValues": CoreAllowedValues,
            "label": "core analyzed",
            "max": 200,
            type: String
        }
    } );
    CRFprototypes['RNASeq completion form'] = ({
        "LNCAP_control_source": {
            "label": "LNCAP control source",
            type: String
        },
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
    } );



    CRFfieldOrder["Clinical Info"] =  [
        "patient_id",
        "site",
        "prior_tissue",
        "when/where_stored?",
        "biopsy_date",
        "biopsy_site",
        "steroid_at_time_of_biopsy",
        "steroid_stop_date",
        "sites_of_metastases_at_time_of_biopsy",
        "psa_at_biopsy",
        "ldh_at_biopsy",
        "alk_phos_at_biopsy",
        "hemoglobin_at_biopsy",
        "chga_at_biopsy",
        "nse_at_biopsy",
        "ecog_ps_at_biopsy",
        "date_of_diagnosis",
        "gleason_grade",
        "adt_start_date",
        "orchiectomy",
        "psa_nadir_on_padt",
        "date_of_castration_resistance",
        "first_date_of_metastases",
        "treatment_for_mcrpc_prior_to_biopsy",
        "enzalutamide",
        "enza_start_date",
        "enza_date_of_progression",
        "enza_stop_date",
        "enza_psa_response",
        "enza_radiographic_response",
        "enza_reason_for_d/c",
        "abiraterone",
        "abi_start_date",
        "abi_date_of_pd",
        "abi_stop_date",
        "abi_psa_response",
        "abi_radiographic_response",
        "abi_reason_for_d/c",
        "post-biopsy_treatment",
        "start_date",
        "psa_response",
        "radiographic_response",
        "date_of_progression",
        "treatment_stop_date",
        "reason_for_stop",
        "date_of_death_or_last_contact",
        "death_or_last_contact"
    ] ;
CRFprototypes["Clinical Info"] =  {
    "abi_date_of_pd": {
        "label": "Abi date of PD",
        "type": "Date"
    },
    "abi_psa_response": {
        "allowedValues": [
            "0-30%",
            "30-50%",
            ">50%",
            ">50%",
            "N/A",
        ],
        "label": "Abi PSA response",
        "type": "String"
    },
    "abi_radiographic_response": {
        "allowedValues": [
            "None",
            "Complete response",
            "Minor response",
            "Partial response",
            "Stable disease",
            "N/A",
            "N/A (bone only)",
            "N/A (no mets at BL)",
            "NE",
            "PD",
            "SD",
            "N/A",
        ],
        "label": "Abi radiographic response",
        "type": "String"
    },
    "abi_reason_for_d/c": {
        "allowedValues": [
            "Clinical PD",
            "PD",
            "PSA + radiographic PD",
            "PSA PD",
            "Radigraphic PD",
            "Radiographic  PD",
            "Radiographic + PSA PD",
            "Radiographic PD",
            "Tx ongoing",
            "N/A",
        ],
        "label": "Abi reason for d/c",
        "type": "String"
    },
    "abi_start_date": {
        "label": "Abi start date",
        "type": "Date"
    },
    "abi_stop_date": {
        "label": "Abi stop date",
        "type": "Date"
    },
    "abiraterone": {
        "allowedValues": [
            "Exposed",
            "Naive",
            "On Tx",
            "Resistant",
            "Unk"
        ],
        "label": "Abiraterone",
        "type": "String"
    },
    "adt_start_date": {
        "label": "ADT Start Date",
        "type": "Date"
    },
    "alk_phos_at_biopsy": {
        "label": "Alk phos at biopsy",
        "type": "Number"
    },
    "biopsy_date": {
        "label": "Biopsy Date",
        "type": "Date"
    },
    "biopsy_site": {
        "allowedValues": [
            "Adrenal",
            "Bladder",
            "Bone",
            "Brain",
            "Liver",
            "Lung",
            "Lymph node",
            "Soft tissue"
        ],
        "label": "Biopsy site",
        "type": "String"
    },
    "chga_at_biopsy": {
        "decimal": true,
        "label": "CHGA at biopsy",
        "type": "Number"
    },
    "date_of_castration_resistance": {
        "label": "Date of Castration Resistance",
        "type": "Date"
    },
    "date_of_death_or_last_contact": {
        "label": "Date of Death or Last Contact",
        "type": "Date"
    },
    "date_of_diagnosis": {
        "label": "Date of Diagnosis",
        "type": "Date"
    },
    "date_of_progression": {
        "label": "Date of Progression",
        "type": "Date"
    },
    "death_or_last_contact": {
        "allowedValues": [
            "Death",
            "Last Contact",
            "Last contact",
            "Unk"
        ],
        "label": "Death or Last Contact",
        "type": "String"
    },
    "ecog_ps_at_biopsy": {
        "label": "ECOG PS at biopsy",
        "type": "Number"
    },
    "enza_date_of_progression": {
        "label": "Enza date of progression",
        "type": "Date"
    },
    "enza_psa_response": {
        "allowedValues": [
            "-",
            "0-30%",
            "30-50%",
            "30-50% decline",
            "> 50%",
            "> 90%",
            "N/A",
        ],
        "label": "Enza PSA response",
        "type": "String"
    },
    "enza_radiographic_response": {
        "allowedValues": [
            "None",
            "BS with progression; CT stable",
            "CT progression",
            "NE",
            "SD",
            "Stable disease",
            "Partial response",
            "N/A"
        ],
        "label": "Enza radiographic response",
        "type": "String"
    },
    "enza_reason_for_d/c": {
        "allowedValues": [
            "-",
            "Clinical PD",
            "PD",
            "PSA + radiographic PD",
            "PSA PD",
            "PSA symptomatic PD",
            "Radiographic PD",
            "Tx ongoing",
            "N/A",
        ],
        "label": "Enza reason for D/C",
        "type": "String"
    },
    "enza_start_date": {
        "label": "Enza start date",
        "type": "Date"
    },
    "enza_stop_date": {
        "label": "Enza stop date",
        "type": "Date"
    },
    "enzalutamide": {
        "allowedValues": [
            "Naive",
            "On Tx",
            "On-Tx",
            "Resistant",
            "Unk"
        ],
        "label": "Enzalutamide",
        "type": "String"
    },
    "first_date_of_metastases": {
        "label": "First Date of Metastases",
        "type": "Date"
    },
    "gleason_grade": {
        "allowedValues": [
            "3+3",
            "3+4",
            "4+3",
            "4+4",
            "4+5",
            "5+4",
            "5+5",
            "N/A"
        ],
        "label": "Gleason Grade",
        "type": "String"
    },
    "hemoglobin_at_biopsy": {
        "decimal": true,
        "label": "Hemoglobin at biopsy",
        "type": "Number"
    },
    "ldh_at_biopsy": {
        "label": "LDH at biopsy",
        "type": "Number"
    },
    "nse_at_biopsy": {
        "decimal": true,
        "label": "NSE at Biopsy",
        "type": "Number"
    },
    "orchiectomy": {
        "allowedValues": [
            "No",
            "Yes",
            "n/a"
        ],
        "label": "Orchiectomy",
        "type": "String"
    },
    "Patient_ID": Patient_ID_Type,
    "post-biopsy_treatment": {
        "allowedValues": [
            "Abiraterone",
            "Abiraterone 2K clinical trial",
            "BIND-014",
            "CAMP clinical trial",
            "CC-115",
            "Cabazitaxel",
            "Cabazitaxel + custirsen",
            "Carbo/taxotere",
            "Carbo/taxotere phase 3",
            "Carboplatin + docetaxel",
            "Carboplatin + Taxotere",
            "Carboplatin + Taxotere phase 2",
            "Chemotherapy for colon cancer",
            "Cisplatin + Etoposide",
            "Cytoxan + dexamethasone",
            "Docetaxel",
            "Docetaxel + radium-223",
            "Docetaxel + phenelzine",
            "Doxorubicin + cisplatin + 5-FU + MTX",
            "Enzalutamide",
            "Enzalutamide",
            "Enzalutamide + radium-223",
            "Hospice",
            "Ipi + Provenge trial",
            "Mitoxantrone",
            "Radium-223",
            "Sipuleucel-T",
            "Taxotere",
            "Taxotere + MLN8237",
            "Weekly docetaxel",
            "Xofigo",
            "None",
            "N/A"
        ],
        "label": "Post-Biopsy Treatment",
        "type": "String"
    },
    "prior_tissue": {
        "allowedValues": [
            "1. Prostate biopsy, 2. Prostate biopsy, 3. TURP",
            "1. Prostate biopsy, 2. Radical Prostatectomy",
            "1. Prostate biopsy, 2. Radical prostatectomy",
            "1",
            "1. Lung met",
            "1. Lung nodule core biopsy 2. Lung nodule wedge resection",
            "1. Prostate biopsy",
            "1. Prostate biopsy 2.  Liver biopsy",
            "1. Prostate biopsy 2. L Pelvic node",
            "1. Prostate biopsy 2. Node biopsy 3. Node biopsy",
            "1. Prostate biopsy 2. Prostate biopsy 3. Node biopsy",
            "1. Prostate biopsy 2. Prostatectomy 3. Lymph biopsy",
            "1. R iliac bone",
            "1. Radical prostatectomy",
            "1. SV biopsy",
            "1. SV biopsy 2. T6 metastasis",
            "1. TURP",
            "1. left neck lymph node biopsy",
            "1. prostate biopsy",
            "1.Prostate biopsy 2. Prostatectomy 3. Liver biopsy",
            "None",
            "Prostate biopsy",
            "n/a"
        ],
        "label": "Prior tissue",
        "type": "String"
    },
    "psa_at_biopsy": {
        "decimal": true,
        "label": "PSA At Biopsy",
        "type": "Number"
    },
    "psa_nadir_on_padt": {
        "decimal": true,
        "label": "PSA Nadir on PADT",
        "type": "Number"
    },
    "psa_response": {
        "allowedValues": [
            "0-30%",
            "30%-50%",
            "> 50%",
            "None",
            "N/A",
        ],
        "label": "PSA response",
        "type": "String"
    },
    "radiographic_response": {
        "allowedValues": [
            "Partial response",
            "Stable response",
            "PD",
            "PR",
            "SD",
            "None",
            "N/A",
        ],
        "label": "Radiographic Response",
        "type": "String"
    },
    "reason_for_stop": {
        "allowedValues": [
            "Adverse event",
            "Adverse event (N/V)",
            "Adverse event (fatigue)",
            "Adverse event (febrile neutropenia)",
            "Adverse event - osteonecrosis",
            "Clinical PD",
            "Completed treatment",
            "Death",
            "PD",
            "PSA + radiographic PD",
            "PSA PD",
            "PSA PD, adverse event",
            "PSA PD + patient withdrawal",
            "Progression",
            "Pt decision",
            "Radiographic PD",
            "TBD",
            "Tx break",
            "Tx ongoing",
            "N/A",
        ],
        "label": "Reason for Stop",
        "type": "String"
    },
    "site": {
        "allowedValues": [
            "OHSU",
            "UBC",
            "UCD",
            "UCLA",
            "UCLA-VA",
            "UCSF"
        ],
        "label": "Site",
        "type": "String"
    },
    "sites_of_metastases_at_time_of_biopsy": {
        "allowedValues": [
            "adrenal",
            "adrenal gland",
            "bone",
            "brain",
            "liver",
            "liver",
            "lung",
            "lymph node",
            "nodes",
            "nodes only",
            "pleura",
            "soft tissue",
            "retroperitoneal and l paraaortic ln",
        ],
        "label": "Sites of Metastases at time of biopsy",
        "type": "String"
    },
    "start_date": {
        "label": "Start Date",
        "type": "Date"
    },
    "steroid_at_time_of_biopsy": {
        "allowedValues": [
            "yes",
            "beclomethasone",
            "dexamethasone",
            "hydrocortisone",
            "prednisone",
            "no",
            "N/A"
        ],
        "label": "Steroid at time of biopsy",
        "type": "String"
    },
    "steroid_stop_date": {
        "label": "Steroid stop date",
        "type": "Date"
    },
    "treatment_for_mcrpc_prior_to_biopsy": {
        "allowedValues": [
            "abiraterone",
            "abiraterone + enzalutamide",
            "abiraterone + prednisone",
            "abiraterone 2k clinical trial",
            "adi peg (investigational)",
            "arn-509",
            "bez235",
            "bicalutamide",
            "bkm120",
            "cabazitaxel + mitoxantrone (camp)",
            "cabazitaxel",
            "cabozantinib",
            "camp",
            "carboplatin + docetaxel",
            "carboplatin + etoposide",
            "carboplatin + taxotere",
            "casodex",
            "cp-751871",
            "custirsen",
            "cypraterone",
            "cytoxan + dex",
            "dasatinib",
            "des",
            "dexamethasone",
            "docetaxel",
            "enzalutamide",
            "estradiol",
            "everolimus",
            "flutamide",
            "gm-csf",
            "gtx 758",
            "hd casodex",
            "imc-a12",
            "investigational agent nos",
            "ipi vs placebo",
            "ipilimumab",
            "ketoconazole",
            "ketoconazole + prednisone",
            "lbh589",
            "lupron",
            "midazolam/ptk-787",
            "mitoxantrone",
            "niilutamide",
            "nilutamide",
            "none",
            "nrx194204",
            "ogx-427",
            "pazopanib",
            "pc-spes",
            "prednisone",
            "provenge",
            "psma adc",
            "px-866",
            "radiation",
            "radium-223",
            "radium-223 + abiraterone",
            "reolysin",
            "sipuleucel-t",
            "sulfurophane",
            "taxotere",
            "vandetanib",
            "xl-184",

            "N/A",
        ],
        "label": "Treatment for mCRPC Prior to Biopsy",
        "type": "String"
    },
    "treatment_stop_date": {
        "label": "Treatment Stop Date",
        "type": "Date"
    },
    "when/where_stored?": {
        "label": "When/where stored?",
        "type": "Date"
    }
} ;


    var timestamp = (new Date()).getTime();

    if (Meteor.isClient)
        AutoForm.hooks({
            CRFquickForm: {
                // Called when form does not have a `type` attribute
                onSubmit: function (insertDoc, updateDoc, currentDoc) {
                    insertDoc.crf = Session.get("currentForm");
                    this.event.preventDefault();
                    console.log("onSubmit", insertDoc, updateDoc, currentDoc);
                    Meteor.call('addCRF', insertDoc, updateDoc);
                    HOTflash();
                    this.resetForm();
                    $(".select2-container").select2("val", "All")
                    this.done();
                    Tracker.flush()
                    return false;
                }
            }
        });

    _.each(CRFs, function(x, n) {

        var aCRFcollection = new Mongo.Collection(x);

        CRFcollections[x] = aCRFcollection;
        if (Meteor.isClient)
            window[x] = aCRFcollection;

        var aCRFschema = new SimpleSchema([clinicalReportFormSchemaObject, CRFprototypes[x]]);
        aCRFcollection.attachSchema(aCRFschema);

        if (Meteor.isServer) {
            function bindTrick(name, coll) {
                return function() {
                    return coll.find();
                }
            }
            Meteor.publish(x, bindTrick(x, aCRFcollection));


            CRFmetadataCollection.update({_id: x},
                {
                    _id: x,
                    name: x,
                    n: n,
                    incompleteCount: 0
                }
                ,
                {
                    upsert: true
                })
        } else if (Meteor.isClient) {
            Meteor.subscribe(x);
            function lambda(aCRFschema) {
                return function() {
                    var context = aCRFschema.namedContext("myContext");
                    if (!context.isValid()) {
                        console.log("invalidKeys", context.invalidKeys());
                    }
                }
            }
            Tracker.autorun(lambda(aCRFschema));


        }
    });
/*
    Nucleic_acid_isolation form:
        Source_material: ["Blood", "Frozen Tissue", "Fixed Tissue (FFPE)"]
        Date of isolation
        Blood case:
            DNA:

            Study_IDs: List of ( StudyID/Timepoint)
            Sample_volume: 10-1000 microliters
            Sample_concentration: 1-1000 nanograms per microliters
            Storage location: Freezer_ID, Box_ID

        Frozen or Fixed Tissue:
            Isolation_type: ["RNA", "DNA"]
            Study_IDs: List of ( StudyID/Core)
            Samplename: StudyID / [RNA, RNA1, RNA2], StudyID / [DNA, DNA1, DNA2]
            Elution volume: 10-100 microliters
            Working aliquots: [1-3], Aliquots volume: 2-100 microliters
            QC aliquot: YES/NO  Aliquots volume: 2-100 microliters
            Storage location: freezerID, box ID

    Pathform:
        TEST: positive, negative or failed

        Ion torent: mutations

    RNA Seq completion forms ARE ALWAYS SAMPLES FROM LCM

    RNA Amplification
    RNA Library Prep

    Upload PDF for QC
     Sample concentration


*/

}
