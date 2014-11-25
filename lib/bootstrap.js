// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
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
    Patient_ID_Type = {
        "allowedValues": crf_ids(),
        "label": "Patient ID",
        type: String
    };
    core_type = {
        "allowedValues": CoreAllowedValues,
        "label": "core",
        "max": 200,
        type: String
    };
    Completion_Date_type = {
        "label": "Completion Date",
        type: Date
    };

    CRFcollections = {}
    CRFfieldOrder = {};
    if (Meteor.client)
        window.CRFfieldOrder = CRFfieldOrder;
    CRFfieldOrder['Patient Enrollment form']=[
        "Patient_ID",
        "Baseline_Biopsy_Date",
        "Baseline_Biopsy_Site",
        "Institution",
    ];

    CRFfieldOrder['Tissue Specimen form']=[
        "Patient_ID",
        "Attending_Radiologist",
        "Biopsy_Site",
        "CRC_at_Collection",
        "Procedure_Date",
        "Procedure_Site",
        "Timepoint",
    ];
    CRFfieldOrder['Blood Speciment form']=[
        "Patient_ID",
        "CRC_at_Collection",
        "Draw_Date_and_Time",
        "Procedure_Site",
        "Serum",
        "Sodium_Heparin",
        "Timepoint",
    ];
    CRFfieldOrder['Tissue Preparation form']=[
        "Patient_ID",
        "Biopsy_Site",
        "Institution",
        "Procedure_Date",
        "Specimen",
    ];
    CRFfieldOrder['Pathology form']=[
        "Patient_ID",
        "core",
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
        "library_prep_notes",
        "library_prep_used",
        "location_of_fastq_file",
    ];


    if (true || CRFmetadataCollection.find().count() === 0) {
// this needs to be parameterized by study somehow.
        function crf_ids() {
            var s = [];
            for (var i = 0; i <= 300; i++)
                s.push("DTB-" + ("00" + i).slice(-3))
            return s;
        }

        clinicalReportFormSchemaObject = SimpleSchema({
            _id: {
                type: String,
                optional: true
            },
            createdAt: {
                type: Date,
                optional: true
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
          'core',
          'BlockImage',
          'ReferenceSlideNumber',
          'ReferenceSlideImages',
          'BlockStatus',
        ];
        ComplexIDFields['Histological Assessment form'] = [ "Patient_ID", "core"];

        CRFprototypes['Histological Assessment form'] = ({
          "Patient_ID": Patient_ID_Type,
          "core": core_type,
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


        CRFfieldOrder['Laser Capture Microdissection']=["Patient_ID","core", "Completion_Date", 'SlideNumber', "Estimated_total_capture_area", "Lysates", "Lysates_Volume", "Downstream_use"];
        ComplexIDFields['Laser_Capture_Microdissection'] = [ "Patient_ID", "core"];

        CRFprototypes['Laser Capture Microdissection'] = ({
          "Patient_ID": Patient_ID_Type,
            "core": {
                "allowedValues": CoreAllowedValues,
                "label": "core",
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
          "Patient_ID": Patient_ID_Type,
        } );
        /*
        CRFprototypes['Tissue Speciment form_Specimens'] = ({
          "Patient_ID": Patient_ID_Type,
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
            "core": {
                "allowedValues": CoreAllowedValues,
                "label": "core",
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
        */
        CRFprototypes['Tissue Speciment form'] = ({
          "Patient_ID": Patient_ID_Type,
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
            }
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
        /*
        CRFprototypes['Tissue Preparation form_Specimen'] = ({
            "Fixed_Histology": {
                "allowedValues": [
                    "Positive",
                    "Negative",
                    "No definate Tumor",
                    "N/A"
                ],
                "label": "Fixed Histology",
                "max": 200,
                type: String
            },
            "Frozen_Histology_(any_core)": {
                "allowedValues": [
                    "Positive",
                    "Negative",
                    "N/A"
                ],
                "label": "Frozen Histology (any core)",
                "max": 200,
                type: String
            },
            "Percent_Tumor": {
                "label": "Percent Tumor",
                "max": 100,
                "min": 0,
                type: Number
            },
            "core": {
                "allowedValues": CoreAllowedValues,
                "label": "core",
                "max": 200,
                type: String
            }
        } );
        */
        CRFprototypes['TissuePreparation form'] = ({
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
          "Patient_ID": Patient_ID_Type,
            "Procedure_Date": {
//        "capturetime": false,
                "label": "Procedure Date",
                type: Date
            },
        } );
        CRFprototypes['Pathology form'] = ({
            "Patient_ID": Patient_ID_Type,
             "core": core_type,
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
                        this.done();
                        Tracker.flush()
                        return false;
                    }
                }
            });

        for (x in CRFprototypes) {
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
        }
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
})
    /*
    CRFfieldOrder['TissueS pecimen form_Specimens']=[
        "Box_ID",
        "Core_Notes",
        "Freezer",
        "Tissue_Preparation",
        "core",
        "Timepoint"
    ];
    */
