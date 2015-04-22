Meteor.startup(function() {

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
CRFfieldOrder = {
'Blood_Labs_V2': 
   [ 
     'Patient_ID',
     'Sample_ID',
     'Segment',
     'Visit_Date',
     'PSA__complexed__direct_measurement_',
     'TESTOSTERONE__TOTAL',
     'Alkaline_Phosphatase',
     'LDH',
     'ANC',
     'HEMATOCRIT',
     'Hemoglobin',
     'Platelets',
     'RBC',
     'WBC',
     'WBC_Basophils',
     'WBC_Eosinophils',
     'WBC_Lymphocytes',
     'WBC_Monocytes',
     'WBC_Neutrophils',
     'Partial_Thromboplastin_Time____PTT_',
     'Prothrombin_Time__PT_',
     'Arm',
     'International_Normalized_Ratio__INR_',
     'Lab_Time',
     'Day',
     'Phase',
   ],
  'Demographics': 
   [ 'Patient_ID',
     'Age',
     'Study_Site',
     // 'Birth_Date',
     'Current_Status',
     'Ethnicity',
     'Expired_Date',
     // 'Gender',
     'Last_Visit',
     'Last_Visit_Date',
     'Off_Study_Date',
     'Off_Treatment_Date',
     'On_Followup_Date',
     'On_Study_Date',
     'On_Treatment_Date',
     'Race',
     'Eligibility_Status',
     'Eligibility_Status_Date',
     'Eligibility_Version_Date',
     'Consent_Date',
     'Arms',
   ],
  'ECOG_Weight_V2': 
   [ 'Patient_ID',
     'Sample_ID',
     'Day',
     'ECOG_PS',
     'Phase',
     'Segment',
     'Visit_Date',
     'Weight',
     'Arm',
   ],
  'Followup': 
   [ 'Patient_ID',
     'Date_of_Progression',
     'Followup_Start_Date',

     'Off_Treatment_Date',
     'Off_Treatment_Reason',
     'Off_Treatment_Reason_Explain',

     'Off_Study_Date',
     'Off_Study_Reason',
     'Off_Study_Reason_Explain',
     'Last_Known_Survival_Status',

     'Followup_Center',
     'Expired_Date',

     'Last_Followup_Date',

     /*
     'Best_Response',
     'Best_Response_Confirm',
     'Best_Response_Date',
     */
   ],
  'GU_Disease_Assessment_V3': 
   [ 
   'Patient_ID',
   'Sample_ID',

   'Are_Lesions_Present?',
     'Date_of_Procedure',
     'Date_of_Procedure_Ext',
     'Day',
     'Phase',
     'Procedure',
     'Segment',
     'Visit_Date',
     'Compared_with_previous_scan',
     'Comments',
     'Arm',
   ],
  'Prostate_Diagnosis_V2': 
   [ 'Patient_ID',
    'Date_of_diagnosis_Ext',
     'Day',
     'Disease_state_at_diagnosis',
     'PSA_Date',
     'PSA_Value',
     'Phase',
     'Primary_Gleason_Score',
     'Secondary_Gleason_Score',
     'Segment',
     'Total_Gleason_Score',
     'Visit_Date',
     'Date_of_diagnosis',
     'Arm',
   ],
  'SU2C_Biopsy_AE_V1': 
   [ 'Patient_ID',
     'Sample_ID',
     'Arm',
     'Day',
     'Phase',
     'Segment',
     'Visit_Date',
     'Action',
     'Adverse_Event_Description',
     'Attribution',
     'Grade',
     'Onset_Date',
     'Onset_Date_Ext',
     'Outcome',
     'Resolved_Date_(Log_Column)',
     'Resolved_Date_(Log_Column)_Ext',
     'Serious',
     'Unexpected?',
     'Toxicity_Category',
     'Toxicity_Code',
   ],
  'SU2C_Biopsy_V2': 
   [ 'Patient_ID',
       'Sample_ID',
            'Arm',
     'Date_of_Procedure',
     'Date_of_Procedure_Ext',
     'Day',
     'Phase',
     'Segment',
     'Site',
     'Visit_Date',
     'List_all_anticancer_meds_taken_within_the_24_hours_leading_up_to_biopsy',
     'If_Other__specify',
   ],
  'SU2C_Pr_Ca_Tx_Sumry_V2': 
   [ 'Patient_ID',
     'Sample_ID',
     'Day',
     'Phase',
     'Radiation_Therapy',
     'Radical_Prostatectomy',
     'Segment',
     'Start_Date_Ext',
     'Stop_Date_Ext',
     'Surgery_Date_Ext',
     'Visit_Date',
     'Start_Date',
     'Stop_Date',
     'Surgery_Date',
     'Arm',
   ],
  'SU2C_Prior_TX_V2': 
   [ 'Patient_ID',
       'Sample_ID',
            'Day',
     'Drug_Name',
     'Phase',
     'Segment',
     'Start_Date',
     'Start_Date_Ext',
     'Stop_Date_Ext',
     'Treatment_Type',
     'Visit_Date',
     'Stop_Date',
     'Best_Response',
     'If_Progressive_Disease__Specify_Type',
     'Reason_for_Stopping_Treatment',
     'Reason_for_Stopping_Treatment_Details',
     'Treatment_Details',
     'If_other__specify',
     'Arm',
   ],
  'SU2C_Specimen_V1': 
   [ 'Patient_ID',
       'Sample_ID',
            'Arm',
     'Day',
     'Phase',
     'Segment',
     'Visit_Date',
     'Were_study_blood_samples_collected_at_this_visit?',
     'Notes',
   ],
  'SU2C_Subsequent_TX_V2': 
   [ 'Patient_ID',
     'Sample_ID',
     'Drug_Name',
     'Reason_for_Stopping_Treatment',
     'Responder',
     'ResponderEnzalutamide',
     'ResponderAbiraterone',
     'ResponderOtherTherapy',
     'Best_Response',
     'If_Progressive_Disease__Specify_Type',
     'Treatment_Type',
     'Treatment_Details',
     'Start_Date',
     'Start_Date_Ext',
     'Stop_Date',
     'Stop_Date_Ext',
     'Visit_Date',
     'Reason_for_Stopping_Treatment_Details',
     'If_other__specify',
     'Day',
     'Phase',
     'Segment',
     'Arm',
   ],
}

CRFs = [
    'Clinical_Info',
    "SU2C_Biopsy_V2",
    "Followup", 
    'SU2C_Subsequent_TX_V2', 
    "SU2C_Prior_TX_V2",
    "Prostate_Diagnosis_V2",
    "Blood_Labs_V2", 
    "Demographics",
    "ECOG_Weight_V2", 


    "GU_Disease_Assessment_V3",
    "SU2C_Biopsy_AE_V1",
    "SU2C_Pr_Ca_Tx_Sumry_V2",
    "SU2C_Specimen_V1",

    "Patient_Enrollment_form",
    // Obsolete: 'Treatment_History',
    'Histology_Research',

    'Tissue_Specimen_form',
    'Blood_Specimen_form',
    'Histological_Assessment_form',
    'Laser_Capture_Microdissection',
    'RNASeq_completion_form',
    'Pathology_form',
    // Obsolete 'Treatment_Response_form',


];
CRFsInfo = [
    "Demographics",
    "Followup", 
    "Prostate_Diagnosis_V2",
    "Blood_Labs_V2", 
    "ECOG_Weight_V2", 
    "GU_Disease_Assessment_V3",
    "SU2C_Biopsy_AE_V1",
    "SU2C_Biopsy_V2",
    "SU2C_Pr_Ca_Tx_Sumry_V2",
    "SU2C_Prior_TX_V2",
    "SU2C_Specimen_V1",
    'SU2C_Subsequent_TX_V2', 

    "Patient_Enrollment_form",
    // Obsolete: 'Treatment_History',
    'Tissue_Specimen_form',
    'Blood_Specimen_form',
    'Histological_Assessment_form',
    'Laser_Capture_Microdissection',
    'RNASeq_completion_form',
    'Pathology_form',
    'Clinical_Info',
    // Obsolete 'Treatment_Response_form',
];

Patient_ID_Type_Meta = {
    "allowedValues": [], 
    "label": "Patient ID",
    type: String
};

Patient_ID_Type = {
    "label": "Patient ID",
    type: String,
};

Sample_ID_Type = {
    type: String,
};

core_type = {
    "allowedValues": CoreAllowedValues,
    "label": "Core",
    "max": 200,
    type: String
};
Completion_Date_type = {
    "label": "Completion Date",
    type: Date,
    autoform: {
        afFieldInput: {
            type: 'bootstrap-datepicker',
            timezoneId: 'America/Los_Angeles'
        }
    }
};

autoformDate =  {
    afFieldInput: {
        type: 'bootstrap-datepicker',
        timezoneId: 'America/Los_Angeles'
    }
};



CRFfieldOrder['Patient_Enrollment_form']=[
    "Patient_ID",
	"Baseline_Sample_ID",
	"Study_Site",
	"Baseline_Biopsy_Date",
    "Baseline_Biopsy_Site",
	"Progression_Sample_ID",
    "Progression_Biopsy_Date",
    "Progression_Biopsy_Site"
	
];


CRFfieldOrder['Tissue_Specimen_form']=[
    "Sample_ID",
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
CRFfieldOrder['Blood_Specimen_form']=[
    "Patient_ID",
    "CRC_at_Collection",
    "Draw_Date_and_Time",
    "Procedure_Site",
    "Serum",
    "Sodium_Heparin",
    "Timepoint",
];

CRFfieldOrder['Pathology_form']=[
    "Sample_ID",
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
/*
CRFfieldOrder['Treatment_History']=[
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
*/
CRFfieldOrder['RNASeq_completion_form']=[
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

CRFfieldOrder['Histology_Research']=[
     "Patient_ID",
     "Sample_ID",
     "Histology_Call",
     "Adeno",
     "Small_Cell",
     "Trichotomy",
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

    clinicalReportFormSchemaObject = SimpleSchema({
        _id: {
            type: String,
            optional: true,
        },
        createdAt: {
            type: Date,
        },
        updatedAt: {
            type: Date,
            optional: true,
        },
		userId: {
			type: String,
		}
    });


CRFprototypes = {

   'Histology_Research' : {
     "Patient_ID": Patient_ID_Type,
     "Sample_ID": Sample_ID_Type,
     Histology_Call: { type: 'String',
         allowedValues: [
            "Adeno",
            "Small Cell",
            "ANPC/Adeno",
            "ANPC",
            "Indeterminate",
            "Intermediate",
            "ANPC/SC",
            "Adeno/SC",
            "Unavailable",
            "QNS"
          ],
     },
     Adeno:        { type: 'String' },
     Small_Cell:   { type: 'String' },
     Trichotomy:   { type: 'String' },
   },

  'Blood_Labs_V2': {
     "Patient_ID": Patient_ID_Type,
     "Sample_ID": Sample_ID_Type,
     Day: { optional: true, type: 'Number' },
     Phase: { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'TESTOSTERONE__TOTAL': { optional: true, type: 'Number' },
     'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate },
     'Alkaline_Phosphatase': { optional: true, type: 'Number' },
     'LDH': { optional: true, type: 'Number' },
     ANC: { optional: true, type: 'Number', decimal: true },
     HEMATOCRIT: { optional: true, type: 'Number', decimal: true },
     Hemoglobin: { optional: true, type: 'Number', decimal: true },
     Platelets: { optional: true, type: 'Number' },
     RBC: { optional: true, type: 'Number', decimal: true },
     WBC: { optional: true, type: 'Number', decimal: true },
     'WBC_Basophils': { optional: true, type: 'Number', decimal: true },
     'WBC_Eosinophils': { optional: true, type: 'Number', decimal: true },
     'WBC_Lymphocytes': { optional: true, type: 'Number', decimal: true },
     'WBC_Monocytes': { optional: true, type: 'Number', decimal: true },
     'WBC_Neutrophils': { optional: true, type: 'Number', decimal: true },
     'Partial_Thromboplastin_Time____PTT_': { optional: true, type: 'Number', decimal: true },
     'Prothrombin_Time__PT_': { optional: true, type: 'Number', decimal: true },
     'PSA__complexed__direct_measurement_': { optional: true, type: 'Number', decimal: true },
     Arm: { optional: true, type: 'String' },
     'International_Normalized_Ratio__INR_': { optional: true, type: 'Number', decimal: true },
     'Lab_Time': { optional: true, type: 'Number', decimal: true } },
  Demographics: {
     "Patient_ID": Patient_ID_Type,
     Age: { optional: true, type: 'Number' },
     Arms: { optional: true, type: 'Number' },
     'Birth_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Consent_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Current_Status': { optional: true, type: 'String' },
     Ethnicity: { optional: true, type: 'String' },
     'Expired_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     Gender: { optional: true, type: 'Number', decimal: true },
     'Last_Visit': { optional: true, type: 'String' },
     'Last_Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Off_Study_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Off_Treatment_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'On_Followup_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'On_Study_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'On_Treatment_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     Race: { optional: true, type: 'String' },
     'Study_Site': { optional: true, type: 'String' },
     'Eligibility_Status': { optional: true, type: 'String' },
     'Eligibility_Status_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Eligibility_Version_Date': { optional: true, type: 'Date', autoform: autoformDate  } },
  'ECOG_Weight_V2': {
     "Patient_ID": Patient_ID_Type,
     "Sample_ID": Sample_ID_Type,
     Day: { optional: true, type: 'Number' },
     'ECOG_PS': { optional: true, type: 'String' },
     Phase: { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     Weight: { optional: true, type: 'Number', decimal: true },
     Arm: { optional: true, type: 'String' } },
  Followup: {
     "Patient_ID": Patient_ID_Type,
     'Date_of_Progression': { optional: true, type: 'Date', autoform: autoformDate  },
     'Expired_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Followup_Center': { optional: true, type: 'String' },
     'Followup_Start_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Last_Known_Survival_Status': { optional: true, type: 'String' },

     'Off_Study_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Off_Study_Reason': { optional: true, type: 'String' },
     'Off_Study_Reason_Explain': { optional: true, type: 'String' },

     'Off_Treatment_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Off_Treatment_Reason': { optional: true, type: 'String' },
     'Off_Treatment_Reason_Explain': { optional: true, type: 'String' },

     'Last_Followup_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Best_Response_Date': { optional: true, type: 'Date', autoform: autoformDate  } },
  'GU_Disease_Assessment_V3': { 
     "Patient_ID": Patient_ID_Type,
     "Sample_ID": Sample_ID_Type,
    'Best_Response': { optional: true, type: 'String' },
    'Are_Lesions_Present?': { optional: true, type: 'String' },
     'Date_of_Procedure': { optional: true, type: 'Date', autoform: autoformDate  },
     'Date_of_Procedure_Ext': { optional: true, type: 'String' },
     Day: { optional: true, type: 'Number' },
     Phase: { optional: true, type: 'String' },
     Procedure: { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     Arm: { optional: true, type: 'String' },
     'Compared_with_previous_scan': { optional: true, type: 'String' },
     Comments: { optional: true, type: 'String' } },
  'Prostate_Diagnosis_V2': { 
     "Patient_ID": Patient_ID_Type,
    'Date_of_diagnosis_Ext': { optional: true, type: 'String' },
     Day: { optional: true, type: 'Number' },
     'Disease_state_at_diagnosis': { optional: true, type: 'String' },
     'PSA_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'PSA_Value': { optional: true, type: 'Number', decimal: true },
     Phase: { optional: true, type: 'String' },
     'Primary_Gleason_Score': { optional: true, type: 'Number' },
     'Secondary_Gleason_Score': { optional: true, type: 'Number' },
     Segment: { optional: true, type: 'String' },
     'Total_Gleason_Score': { optional: true, type: 'Number' },
     'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Date_of_diagnosis': { optional: true, type: 'Date', autoform: autoformDate  },
     Arm: { optional: true, type: 'String' } },
  'SU2C_Biopsy_AE_V1': { 
     "Patient_ID": Patient_ID_Type,
     "Sample_ID": Sample_ID_Type,
    'Best_Response': { optional: true, type: 'String' },
     Arm: { optional: true, type: 'String' },
     Day: { optional: true, type: 'Number' },
     Phase: { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     Action: { optional: true, type: 'String' },
     'Adverse_Event_Description': { optional: true, type: 'String' },
     Attribution: { optional: true, type: 'String' },
     Grade: { optional: true, type: 'Number' },
     'Onset_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Onset_Date_Ext': { optional: true, type: 'String' },
     Outcome: { optional: true, type: 'String' },
     'Resolved_Date__Log_Column_': { optional: true, type: 'Date', autoform: autoformDate  },
     'Resolved_Date__Log_Column__Ext': { optional: true, type: 'String' },
     Serious: { optional: true, type: 'String' },
     'Unexpected?': { optional: true, type: 'String' },
     'Toxicity_Category': { optional: true, type: 'String' },
     'Toxicity_Code': { optional: true, type: 'String' } },
  'SU2C_Biopsy_V2': {
     "Patient_ID": Patient_ID_Type,
     "Sample_ID": Sample_ID_Type,
     'Best_Response': { optional: true, type: 'String' },
      Arm: { optional: true, type: 'String' },
     'Date_of_Procedure': { optional: true, type: 'Date', autoform: autoformDate  },
     'Date_of_Procedure_Ext': { optional: true, type: 'String' },
     Day: { optional: true, type: 'Number' },
     Phase: { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     Site: { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'List_all_anticancer_meds_taken_within_the_24_hours_leading_up_to_biopsy': { optional: true, type: 'String' },
     'If_Other__specify': { optional: true, type: 'String' } },
  'SU2C_Pr_Ca_Tx_Sumry_V2': {
     "Patient_ID": Patient_ID_Type,
     "Sample_ID": Sample_ID_Type,
     'Best_Response': { optional: true, type: 'String' },
     Day: { optional: true, type: 'Number' },
     Phase: { optional: true, type: 'String' },
     'Radiation_Therapy': { optional: true, type: 'String' },
     'Radical_Prostatectomy': { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'Start_Date_Ext': { optional: true, type: 'String' },
     'Stop_Date_Ext': { optional: true, type: 'String' },
     'Surgery_Date_Ext': { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Start_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Stop_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Surgery_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     Arm: { optional: true, type: 'String' } },
  'SU2C_Prior_TX_V2': {
     "Patient_ID": Patient_ID_Type,
     "Sample_ID": Sample_ID_Type,
     'Best_Response': { optional: true, type: 'String' },
      Day: { optional: true, type: 'Number' },
     'Drug_Name': { optional: true, type: 'String' },
     Phase: { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'Start_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Start_Date_Ext': { optional: true, type: 'String' },
     'Stop_Date_Ext': { optional: true, type: 'String' },
     'Treatment_Type': { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Stop_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Best_Response': { optional: true, type: 'String' },
     'If_Progressive_Disease__Specify_Type': { optional: true, type: 'String' },
     'Reason_for_Stopping_Treatment': { optional: true, type: 'String' },
     'Reason_for_Stopping_Treatment_Details': { optional: true, type: 'String' },
     'Treatment_Details': { optional: true, type: 'String' },
     'If_other__specify': { optional: true, type: 'String' },
     Arm: { optional: true, type: 'String' } },
  'SU2C_Specimen_V1': 
   { 
     "Patient_ID": Patient_ID_Type,
     "Sample_ID": Sample_ID_Type,
     'Best_Response': { optional: true, type: 'String' },
     Arm: { optional: true, type: 'String' },
     Day: { optional: true, type: 'Number' },
     Phase: { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Were_study_blood_samples_collected_at_this_visit?': { optional: true, type: 'String' },
     Notes: { optional: true, type: 'String' } },
  'SU2C_Subsequent_TX_V2': 
   { 
     "Patient_ID": Patient_ID_Type,
     "Sample_ID": Sample_ID_Type,
      Arm: { optional: true, type: 'String' },
      Responder: { optional: true, type: 'String' },
      ResponderEnzalutamide: { optional: true, type: 'String' },
      ResponderAbiraterone: { optional: true, type: 'String' },
      ResponderOtherTherapy: { optional: true, type: 'String' },

     'Best_Response': { optional: true, type: 'String' },
     Day: { optional: true, type: 'Number' },
     'Drug_Name': { optional: true, type: 'String' },
     'If_Progressive_Disease__Specify_Type': { optional: true, type: 'String' },
     Phase: { optional: true, type: 'String' },
     'Reason_for_Stopping_Treatment': { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'Start_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Start_Date_Ext': { optional: true, type: 'String' },
     'Stop_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Stop_Date_Ext': { optional: true, type: 'String' },
     'Treatment_Type': { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date', autoform: autoformDate  },
     'Treatment_Details': { optional: true, type: 'String' },
     'Reason_for_Stopping_Treatment_Details': { optional: true, type: 'String' },
     'If_other__specify': { optional: true, type: 'String' } } };



OncoreTable_NeedsSample_ID = {
    "Followup": false,
    "Demographics": false,
    "Prostate_Diagnosis_V2": false,

    "Blood_Labs_V2": true,
    "ECOG_Weight_V2": true,
    "GU_Disease_Assessment_V3": true,
    "SU2C_Biopsy_AE_V1": true,
    "SU2C_Biopsy_V2": true,
    "SU2C_Pr_Ca_Tx_Sumry_V2": true,
    "SU2C_Prior_TX_V2": true,
    "SU2C_Specimen_V1": true,
    "SU2C_Subsequent_TX_V2": true,
};
if (Meteor.isClient)
    window.OncoreTable_NeedsSample_ID = OncoreTable_NeedsSample_ID;

TableNeedsSample_ID = [
    ["Followup", false,],
    ["Demographics", false,],
    ["Prostate_Diagnosis_V2", false,],

    ["Blood_Labs_V2", true,],
    ["ECOG_Weight_V2", true,],
    ["GU_Disease_Assessment_V3", true,],
    ["SU2C_Biopsy_AE_V1", true,],
    ["SU2C_Biopsy_V2", true,],
    ["SU2C_Pr_Ca_Tx_Sumry_V2", true,],
    ["SU2C_Prior_TX_V2", true,],
    ["SU2C_Specimen_V1", true,],
    ["SU2C_Subsequent_TX_V2", true,]
]


OncoreCollections = {};

function fixDate(row) {
    for (elem in row) {
        var obj = row[elem];

        if (typeof(obj) == "object" && "date" in row[elem] && (row[elem].date instanceof(Date)))
            row[elem] = row[elem].date;
    }
    return row;
}

function fixRow(obj) {
	if (obj) {
	    Object.keys(obj).map(function(f) {
	        var g = f.replace(/[ ,()-]/g, '_');
	        if (g != f) {
	            obj[g] = obj[f];
	            delete obj[f];
	        }
	    });
	}
}

mapIfPossible = function(obj, field, thisMap) {
    if (field in obj) {
        var value = obj[field];
        if (value in thisMap) 
            obj[field] = thisMap[value];
    }
}

SU2C_Center_map = {
    "Mt. Zion": "UCSF",
    "Knight Cancer Institute": "OHSU",
    "University of California Los Angeles": "UCLA",
    "University of California Davis": "UCD",
    "BC Cancer Agency": "UBC"
}


function mapPatient(patient) {
    var Patient_ID = patient.patient;

    var tables = patient.attributes;
    fixRow(tables);
    var biopsies = tables["SU2C_Biopsy_V2"];
    var baseline, pro, pro2;

    console.log("Patient_ID", Patient_ID);

    if (biopsies) {

        biopsies.map(fixDate);
        biopsies.map(fixRow);

        biopsies.sort(function(a, b) {
            return a.Date_of_Procedure >=  b.Date_of_Procedure;
        });


        for (var bi = 0; bi < biopsies.length; bi++) {
            var b = biopsies[bi];
            var d = b.Date_of_Procedure;
            if (d == null || d == "")
                d = b.Visit_Date;
            var segment = b.Segment;

            if (baseline == null) {
                baseline = d;
                continue;
            }

            if (pro == null && d > baseline )  {
                console.log(Patient_ID, "Pro")
                pro = d;
                continue;
            }
            
            if (pro2 == null && d > pro ) {
                pro2 = d;
                continue;
            }
        }
    }

    for (var ti = 0; ti < TableNeedsSample_ID.length; ti++) {
        var t = TableNeedsSample_ID[ti][0];
        var n = TableNeedsSample_ID[ti][1];

        if (n) {
            var rows = tables[t];
            if (rows) {
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    fixRow(row);
                    fixDate(row);

                    var d;
                    if ( t == "SU2C_Biopsy_V2") {
                        d =  row["Date_of_Procedure"];
                        if (d == null || d == "")
                            d = row["Visit_Date"];
                    } else {
                        d = row["Visit_Date"];
                    }


                    if ( t == "SU2C_Subsequent_TX_V2") {
                        map_Drug_Name(row);
						map_SU2C_Subsequent_TX_V2__Responder(row);
                    } else if (t == "SU2C_Prior_TX_V2") {
                        map_Drug_Name(row);
                    }

                    var Sample_ID = Patient_ID ;

                    if ( t == "SU2C_Subsequent_TX_V2") {
                        if (d <= pro)
                            Sample_ID += "Pro";
                        if (d <= pro2)
                            Sample_ID += "2";
                    } else {
                        if (d >= pro)
                            Sample_ID += "Pro";
                        if (d >= pro2)
                            Sample_ID += "2";
                    }

                    row.Patient_ID = Patient_ID;
                    row.Sample_ID = Sample_ID;

                    try {
                    // OncoreCollections[t].upsert({Sample_ID: Sample_ID, "Date": d}, {$set: row});
                    // OncoreCollections[t].upsert({Sample_ID: Sample_ID}, {$set: row});

                       CRFcollections[t].insert(row);

                    } catch (ex) {
                        console.log("insert exception", i, t, row);
                        throw ex
                    }
                }
            }
        } else {
                var obj = patient.attributes[t];
                if (obj) {
                    fixRow(obj);
                    fixDate(row);


                    if (t == "Followup") 
                        mapIfPossible(obj, "Followup_Center", SU2C_Center_map);
                    else if (t == "Demographics")
                        mapIfPossible(obj, "Study_Site", SU2C_Center_map);



                    try {
                        // CRFcollections[t].upsert({Patient_ID: Patient_ID}, {$set: obj});
                        obj.Patient_ID = Patient_ID;
                        if (t == "Followup" && obj.Date_of_Progression)
                            console.log("insert Followup.Date_of_Progression", obj.Date_of_Progression);
                        CRFcollections[t].insert( obj );
                    } catch (ex) {
                        console.log("insert exception", t, obj);
                        throw ex
                    }
                } 
                // else console.log(Patient_ID, "is missing", t);
        }
    };
	//mapClinicalInfo();
}
if (Meteor.isClient)
    window.mapPatient = mapPatient;


map_SU2C_Subsequent_TX_V2__Responder = function(SU2C_Subsequent_TX_V2) {
    var best_response = SU2C_Subsequent_TX_V2.Best_Response;

    TooSoonToAnalyze = false;

    if ( ["Complete Response", "Partial Response", "Stable Disease" ].indexOf(best_response) >= 0)
        SU2C_Subsequent_TX_V2.Responder = "Responder";

    else if (["Progressive Disease", "Less than Partial Response"].indexOf(best_response) >= 0)
        SU2C_Subsequent_TX_V2.Responder = "Non Responder";
    else
        TooSoonToAnalyze = true;

    /* Makes the query simpler RDB 03/04/2015
    else
        SU2C_Subsequent_TX_V2.Responder = null;
    */

    SU2C_Subsequent_TX_V2.ResponderEnzalutamide = null;
    SU2C_Subsequent_TX_V2.ResponderAbiraterone =  null;
    SU2C_Subsequent_TX_V2.ResponderOtherTherapy = null;


    if (!TooSoonToAnalyze && SU2C_Subsequent_TX_V2.Responder) {

        if (SU2C_Subsequent_TX_V2.Drug_Name)
            SU2C_Subsequent_TX_V2.Drug_Name.split("; ").filter(function(d) {
                console.log("Drug_Name", d);
                if (d == "Enzalutamide")
                    SU2C_Subsequent_TX_V2.ResponderEnzalutamide = SU2C_Subsequent_TX_V2.Responder;
                else if (d == "Abiraterone")
                    SU2C_Subsequent_TX_V2.ResponderAbiraterone  = SU2C_Subsequent_TX_V2.Responder;
                else
                    SU2C_Subsequent_TX_V2.ResponderOtherTherapy = SU2C_Subsequent_TX_V2.Responder;
            });
        else
                SU2C_Subsequent_TX_V2.ResponderOtherTherapy = SU2C_Subsequent_TX_V2.Responder;

        //console.log("SU2C_Subsequent_TX_V2.Responder", SU2C_Subsequent_TX_V2.Responder);
        //console.log("SU2C_Subsequent_TX_V2.ResponderEnzalutamide", SU2C_Subsequent_TX_V2.ResponderEnzalutamide);
        //console.log("SU2C_Subsequent_TX_V2.ResponderAbiraterone", SU2C_Subsequent_TX_V2.ResponderAbiraterone);
        //console.log("SU2C_Subsequent_TX_V2.ResponderOtherTherapy", SU2C_Subsequent_TX_V2.ResponderOtherTherapy);
    }

};

ingestOncore = function () {
    Object.keys(OncoreTable_NeedsSample_ID).map(function(name) {
        CRFcollections[name].remove({});
    });
	console.log('CLnical info', CRFcollections['Clinical_Info'].find().count())
    console.log("Ingesting begun");
    Oncore.find({}, {sort: {patient:1}}).forEach(function(patient) {

        if (patient.attributes && patient.attributes.Followup && patient.attributes.Followup["Date of Progression"])
            console.log("patient.attributes.Followup.Date of Progression", patient.attributes.Followup["Date of Progression"]);
        mapPatient(patient)
    });
    console.log("Ingesting finished");

	console.log("Starting Cohort Level Analysis")
	var SU2C_Prior_TX_V2 = CRFcollections['SU2C_Prior_TX_V2']
	var SU2C_Subsequent_TX_V2 = CRFcollections['SU2C_Subsequent_TX_V2']
	var SU2C_Biopsy_V2 = CRFcollections['SU2C_Biopsy_V2']
	var data = {}
	var samples = {}
	var p_sample_list = SU2C_Prior_TX_V2.find({})
	ingestClinical();
}

ingestClinical = function () {	
	var samples = {}
	var SU2C_Biopsy_V2 = CRFcollections['SU2C_Biopsy_V2']
	var SU2C_Biopsy_V3 = CRFcollections['SU2C_Biopsy_V3']
	var SU2C_Prior_TX_V2 = CRFcollections['SU2C_Prior_TX_V2']
	var SU2C_Subsequent_TX_V2 = CRFcollections['SU2C_Subsequent_TX_V2']
	var clinical_info = CRFcollections['Clinical_Info']
	var Demographics = CRFcollections['Demographics']
	var Followup = CRFcollections['Followup']

	// ingest Demographics 

	var sample_list = Demographics.find({})
	sample_list.forEach(function(sample) {	
		var sample_id = sample['Patient_ID']
		//data = {'Sample_ID':sample_id}
		if (!samples[sample_id]) {
			//console.log('no record for', sample_id)
			samples[sample_id] = {}
		}
		if (sample['Study_Site']) {
			samples[sample_id]['site'] = sample['Study_Site']
			
		}
		samples[sample_id]['Patient_ID'] = sample_id
		if (sample['Age']) {
			samples[sample_id]['age'] = sample['Age']
		}
		if (sample["On_Study_Date"]) {
			samples[sample_id]["On_Study_Date"] = sample["On_Study_Date"]
			if (samples[sample_id]["On_Study_Date"])
				console.log('ON type of date',samples[sample_id]["On_Study_Date"],samples[sample_id]["On_Study_Date"] instanceof Date, samples[sample_id]["On_Study_Date"].valueOf())
		}
		try {
 			var ret = clinical_info.update(
				{'Sample_ID':sample_id}, 
				{$set:samples[sample_id]}, 
				{upsert:true}
			)
			console.log('clinical info returns', ret)
		} 
    	catch (ex) {
       		console.log("update exception", sample_id, samples[sample_id]);
       	 throw ex
    	}	
	})

	// ingest Followup 

	var sample_list = Followup.find({})
	sample_list.forEach(function(sample) {	
		var sample_id = sample['Patient_ID']
		if (!samples[sample_id]) {
			//console.log('no record for', sample_id)
			samples[sample_id] = {}
		}
		if (sample["Off_Treatment_Reason"] ) {
			samples[sample_id]['Reason_for_Stopping_Treatment'] = sample['Off_Treatment_Reason']
			console.log('Off_Treatment_Reason', samples[sample_id])
		}
		if (sample["Off_Study_Date"]) {
			samples[sample_id]["Off_Study_Date"] = sample["Off_Study_Date"]
			//console.log('OFF type of date',samples[sample_id]["Off_Study_Date"],samples[sample_id]["Off_Study_Date"] instanceof Date, samples[sample_id]["Off_Study_Date"].valueOf())
			if (samples[sample_id]["On_Study_Date"])
				//console.log('ON type of date',samples[sample_id]["On_Study_Date"],samples[sample_id]["On_Study_Date"] instanceof Date, samples[sample_id]["On_Study_Date"].valueOf())
				samples[sample_id]["Days_on_Study"] = (samples[sample_id]["Off_Study_Date"].valueOf() - samples[sample_id]["On_Study_Date"].valueOf()) / 86400000
				console.log(sample_id,'Days_on_Study',samples[sample_id]["Days_on_Study"] )
				
		}
		
	})

	// ingest Biopsy 

	var sample_list = SU2C_Biopsy_V2.find({})
	console.log('count of samples', sample_list.length)
	sample_list.forEach(function(sample) {	
		var sample_id = sample['Sample_ID']
		//data = {'Sample_ID':sample_id}
		if (!samples[sample_id]) {
			//console.log('no record for', sample_id)
			samples[sample_id] = {}
		}
	    if (sample['Site']) {
			//console.log('before biopsy',sample_id, samples[sample_id])
			samples[sample_id]['biopsy_site'] = sample['Site']
			samples[sample_id]['Patient_ID'] = sample['Patient_ID']
			map_biopsy_site(samples[sample_id]);
			console.log('upsert',sample_id, {$set:samples[sample_id]})
			try {
	 			var ret = clinical_info.update(
					{'Sample_ID':sample_id}, 
					{$set:samples[sample_id]}, 
					{upsert:true}
				)
				console.log('clinical info returns', ret)
			} 
        	catch (ex) {
           		console.log("update exception", sample_id, samples[sample_id]);
           	 throw ex
        	}	
		}
	})

	// ingest Prior Treatment 

	var treatment_list = SU2C_Prior_TX_V2.find({})
	var prior = {}
	treatment_list.forEach(function(treatment) {
		var sample_id = treatment['Sample_ID']
		var drug = treatment['Drug_Name']
		/*if (treatment.Drug_Name && treatment.Drug_name != 'undefined') {
			if (!samples[sample_id]['treatment_for_mcrpc_prior_to_biopsy']) {
				samples[sample_id]['treatment_for_mcrpc_prior_to_biopsy'] = []
			}
			//console.log('before drug',sample_id, treatment.Drug_Name, samples[sample_id]['treatment_for_mcrpc_prior_to_biopsy'])
			samples[sample_id]['treatment_for_mcrpc_prior_to_biopsy'].push(treatment.Drug_Name)
			//console.log('after drug',sample_id, treatment.Drug_Name, samples[sample_id]['treatment_for_mcrpc_prior_to_biopsy'])
		}
		if (treatment.Reason_for_Stopping_Treatment == undefined) {
			console.log('no reason for stopping', sample_id)
		}
		else {
			console.log('stopping', sample_id, treatment.Reason_for_Stopping_Treatment)
			//prior[sample_id][drug]['Reason_for_Stopping_Treatment'] = treatment.Reason_for_Stopping_Treatment
		}*/
		if (drug) {
			if (!(sample_id in prior)) {
				prior[sample_id] = {}
				prior[sample_id][drug] = 'Naive'
			}
			var data = {'sample_ID':sample_id}
			prior[sample_id][drug] = 'Resistant'
		}
	})
	for (var sample_id in prior) {
		if (prior[sample_id]) {
			var abi = prior[sample_id]['Abiraterone']
			var enza = prior[sample_id]['Enzalutamide']
			if (abi === undefined) {
				prior[sample_id]['Abiraterone'] = 'Naive'	
			}
			if (enza === undefined) {
				prior[sample_id]['Enzalutamide'] = 'Naive'	
			}
			var update_j = prior[sample_id]
			if (samples[sample_id] && samples[sample_id] != undefined) {
				try {
					if (samples[sample_id]['Patient_ID'] == undefined) 
						samples[sample_id]['Patient_ID'] = sample_id
					samples[sample_id]['Abiraterone'] = prior[sample_id]['Abiraterone']
					samples[sample_id]['Enzalutamide'] = prior[sample_id]['Enzalutamide']
					//console.log("update ",sample_id,{$set:samples[sample_id]})
					//console.log('upsert',sample_id, {$set:samples[sample_id]})
		 			var ret = clinical_info.update(
						{'Sample_ID':sample_id}, 
						{$set:samples[sample_id]}, 
						{upsert:true}

						)
						//console.log('clinical info prior returns', ret)
				} 
		        catch (ex) {
		           		console.log("update exception", ex, update_j );
		           	 throw ex
		        }	
					
			}
		/*	try {
				
				console.log("update ",sample_id,{ $set: update_j } )
	 			var ret = clinical_info.update(
					{'Sample_ID':sample_id}, 
					{ $set: update_j }, 
					{upsert:true}
				)
				console.log('clinical info prior returns', ret)
			} 
        	catch (ex) {
           		console.log("update exception", ex, update_j );
           	 throw ex
        	}*/	
		}
		else
		{
			console.log('prior' , sample_id, 'Naive2')			
		}
			
	}

	// ingest Subsequent Treatment 

	
/*	var sample_list = SU2C_Subsequent_TX_V2.find({})
	sample_list.forEach(function(sample) {
		var drug = sample['Drug_Name']
		var data = {'sample_ID':sample['Sample_ID']}
		if (drug == 'Abiraterone') {
			data.Abi_Best_Response = sample.Best_Response
		}
		//console.log("subs TX", data,'input',sample)
	
		clinical_info.update(
			{'sample_ID':sample}, 
			{$set:data}, 
			{upsert:true}
		)
	})
*/	
}
get_PSA_response = function(sample, date) {
	var blood_lab = CRFcollections['Blood_Labs_V2']
	psa_list = blood_lab.find({"Sample_ID":sample,"PSA__complexed__direct_measurement_":{$exists:true}}).fetch()
	var minPSA = 0
	var maxPSA = 999999999;
	psa_list.forEach(function(psa) {
		
	})
}
    console.log("Oncore is defined");
    if (Meteor.isServer)  {
        // ingestOncore();

        HTTP.methods({
            ingestOncore : function() {
                Meteor.call("ingestOncore");
                return "ingesting";
            },
            ingestClinical : function() {
                Meteor.call("ingestClinical");
                return "ingestingClinical";
            },
        });

        Meteor.methods({
            ingestOncore : function() {
                ingestOncore();
            },
            ingestClinical : function() {
                ingestClinical();
            },

        })
  }// isServer
 

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
   CRFfieldOrder['Histological_Assessment_form']=[
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
    // ComplexIDFields['Histological_Assessment_form'] = [ "Patient_ID", "Core"];

    Core = {
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
      }
    };
    CRFprototypes['Histological_Assessment_form'] = ({
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
    
    });

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


    CRFfieldOrder['Laser_Capture_Microdissection']=["Patient_ID","Core", "Completion_Date", 'SlideNumber', "Estimated_total_capture_area", "Lysates", "Lysates_Volume", "Downstream_use"];
    // ComplexIDFields['Laser_Capture_Microdissection'] = [ "Patient_ID", "Core"];

    CRFprototypes['Laser_Capture_Microdissection'] = ({
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
    });


    CRFprototypes['Patient_Enrollment_form'] = ({
        "Baseline_Biopsy_Date": {
            "label": "Baseline Biopsy Date",
            type: Date
        }
        ,
        "Progression_Biopsy_Date": {
            "label": "Progression Biopsy Date",
            type: Date,
		    optional: true
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
        "Progression_Biopsy_Site": {
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
            type: String,
		    optional: true
        },
		
        "Study_Site": {
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
	   "Baseline_Sample_ID": {
		   type: String,
		   label: "Baseline Sample ID"
	    } ,
	   "Progression_Sample_ID": {
		   type: String,
		   optional: true,
		   label: "Progression Sample ID"
	    } ,
       "Patient_ID": {
		   type: String,
		   label: "Patient ID"
	    }
    } );

    CRFprototypes['Tissue_Specimen_form'] = ({
      "Sample_ID": Sample_ID_Type,
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
                "Bladder mass",
				"Other"
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

    CRFprototypes['Blood_Specimen_form'] = ({
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

    CRFprototypes['Pathology_form'] = ({
        "Sample_ID": Sample_ID_Type,
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
/* Obsolete
    CRFprototypes['Treatment_History'] = ({
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
*/
    CRFprototypes['RNASeq_completion_form'] = ({
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

    CRFprototypes['Treatment_Response_form'] = ({
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
    } );
CRFfieldOrder['Treatment_Response_form']=[
    "Patient_ID",
    "Prior_Abiraterone",
    "Prior_Abi_response",
    "Prior_Enzalutamide",
    "Prior_Enza_response",
    "Post_Biopsy_treatment"
];
/*
Rahul's list
Patient ID
Site (Denographics)
Prior tissue  
When/where stored?  (oncore?)
Final Path Call    (path form)
Classification #1  (path form)
Classification #2  (path form)
Classification #3  (path form)
AR Amplification by FISH  (path form)
Biopsy Date    Biopsy form
Biopsy site    Biopsy form
Steroid at time of biopsy    (parse drug?)
Steroid stop date
Sites of Metastases at time of biopsy   (biopsy form)
PSA At Biopsy	(blood lab)
LDH at biopsy	(blood lab)
Alk phos at biopsy	(blood lab)
Hemoglobin at biopsy (blood lab)
Serum CHGA at biopsy  (blood lab)
Serum NSE at Biopsy   (blood lab)
ECOG PS at biopsy   (blood lab)
Date of Diagnosis   (blood lab)
Gleason Grade
ADT Start Date
Orchiectomy
PSA Nadir on PADT
Date of Castration Resistance
Duration of Primary ADT before CRPC
First Date of Metastases
Date of mCRPC
Treatment for mCRPC Prior to Biopsy
Enzalutamide
Enza start date
Enza date of progression
Enza stop date
Duration of Enza Tx
Enza PSA response
Enza radiographic response
Enza reason for D/C
Abiraterone
Abi start date
Abi date of PD
Abi stop date
Duration of Abi Tx
Abi PSA response
Abi radiographic response
Abi reason for d/c
Post-Biopsy Treatment
Start Date
PSA response
Radiographic Response
Date of Progression
Treatment Stop Date
Reason for Stop
Date of Death or Last Contact
Death or Last Contact
*/
/* Chuck Ryan 
RNA_seq status
On study drug
BRCA1 
FANCON ATM1
DNA repair gene
*/
    CRFfieldOrder["Clinical_Info"] =  [
        "Patient_ID",
     	"Sample_ID",
        "biopsy_site",
        "Enzalutamide",
         "Abiraterone",
        "site",
		"age",
        "Reason_for_Stopping_Treatment",
		"AR_Amplification_by_FISH",
		"Days_on_Study",
        "On_Study_Date",
        "Off_Study_Date",
        "abi_psa_response",
        "abi_radiographic_response",
        "abi_reason_for_d/c",
        "enza_psa_response",
        "enza_radiographic_response",
        "enza_reason_for_d/c",
        "prior_tissue",
        "when_where_stored",
        "biopsy_date",
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
        "post-biopsy_treatment",
        "psa_response",
        "radiographic_response",
        "date_of_progression",
        "treatment_stop_date",
        "date_of_death_or_last_contact",
        "death_or_last_contact"
    ] ;
CRFprototypes["Clinical_Info"] =  {
    "abi_psa_response": {
        "allowedValues": [
            "0-30%",
            "30-50%",
            ">50%",
            "N/A",
        ],
        "label": "Abi PSA response",
        "type": String, 
		"optional": true,
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
		"optional": true,
        "type": String
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
		"optional": true,
        "type": String
    },
    "Abiraterone": {
        "allowedValues": [
            "Exposed",
            "Naive",
            "On Tx",
            "Resistant",
            "Unk"
        ],
        "label": "Abiraterone",
			"optional": true,
        "type": String
    },
	"age": {
        "label": "Age",
		"optional": true,
        "type": "Number"
	},
	"AR_Amplification_by_FISH":{
		"label": "AR Amplification by FISH",
		"optional": true,
        "type": "String"
	},
    "alk_phos_at_biopsy": {
        "label": "Alk phos at biopsy",
		"optional": true,
        "type": "Number"
    },
    "biopsy_date": {
        "label": "Biopsy Date",
		"optional": true,
        type: Date,
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
            "Soft tissue",
			"Other"
        ],
        "label": "Biopsy site",
		"optional": true,
        "type": String
    },
    "chga_at_biopsy": {
        "decimal": true,
        "label": "CHGA at biopsy",
		"optional": true,
        "type": "Number"
    },
    "death_or_last_contact": {
        "allowedValues": [
            "Death",
            "Last Contact",
            "Last contact",
            "Unk"
        ],
        "label": "Death or Last Contact",
		"optional": true,
        "type": String
    },
    "ecog_ps_at_biopsy": {
        "label": "ECOG PS at biopsy",
		"optional": true,
        "type": "Number"
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
		"optional": true,
        "type": String
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
		"optional": true,
        "type": String
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
		"optional": true,
        "type": String
    },
    "Enzalutamide": {
        "allowedValues": [
            "Naive",
            "On Tx",
            "On-Tx",
            "Resistant",
            "Unk"
        ],
        "label": "Enzalutamide",
			"optional": true,
        "type": String
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
		"optional": true,
        "type": String
    },
    "hemoglobin_at_biopsy": {
        "decimal": true,
        "label": "Hemoglobin at biopsy",
		"optional": true,
        "type": "Number"
    },
    "ldh_at_biopsy": {
        "label": "LDH at biopsy",
		"optional": true,
        "type": "Number"
    },
    "nse_at_biopsy": {
        "decimal": true,
        "label": "NSE at Biopsy",
		"optional": true,
        "type": "Number"
    },
    "orchiectomy": {
        "allowedValues": [
            "No",
            "Yes",
            "n/a"
        ],
        "label": "Orchiectomy",
		"optional": true,
        "type": String
    },
    "Patient_ID": Patient_ID_Type,
	"Sample_ID": Sample_ID_Type,
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
			"Nilandron",
            "Radium-223",
            "Sipuleucel-T",
            "Taxotere",
            "Taxotere + MLN8237",
            "Weekly docetaxel",
            "Xofigo",
            "None",
            "N/A"
        ],
        "label": "Post-Biopsy treatment",
		"optional": true,
        "type": String
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
		"optional": true,
        "type": String
    },
    "psa_at_biopsy": {
        "decimal": true,
        "label": "PSA At Biopsy",
		"optional": true,
        "type": "Number"
    },
    "psa_nadir_on_padt": {
        "decimal": true,
        "label": "PSA Nadir on PADT",
        "type": "Number",
		"optional": true,
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
		"optional": true,
        "type": String
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
		"optional": true,
        "type": String
    },
    "Reason_for_Stopping_Treatment": {
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
            "N/A",
        ],
        "label": "Reason for Stop",
		"optional": true,
        "type": String
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
		"optional": true,
        "type": String
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
		"optional": true,
        "type": String
    },
    "On_Study_Date": {
        "label": "On Study Date",
		"optional": true,
        type: Date,
    },
    "Off_Study_Date": {
        "label": "Off Study Date",
		"optional": true,
        type: Date,
    },
	"Days_on_Study": {
        "label": "Days On Study",
		"optional": true,
        type: Number,
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
		"optional": true,
        "type": String
    },
    "steroid_stop_date": {
        "label": "Steroid stop date",
		"optional": true,
        type: Date,
    },
    "treatment_for_mcrpc_prior_to_biopsy": {
        "allowedValues": [
            "Abiraterone",
            "Abiraterone + enzalutamide",
            "Abiraterone + prednisone",
            "Abiraterone 2k clinical trial",
            "adi peg (investigational)",
            "bez235",
            "Bicalutamide",
			"Buparlisib",
			"cabazitaxel + mitoxantrone (camp)",
            "Cabazitaxel",
            "Cabozantinib",
            "camp",
            "carboplatin + docetaxel",
            "carboplatin + etoposide",
            "carboplatin + taxotere",
			"Carboplatin; Taxol",
            "Casodex",
            "cp-751871",
			"Cixutumumab",
			"Custirsen",
			"Cypraterone",
            "cytoxan + dex",
            "Dasatinib",
			"Degarelix",
            "des",
            "Dexamethasone",
            "Docetaxel",
			"Dutasteride",
            "Enzalutamide",
            "Estradiol",
            "everolimus",
			"Finasteride",
            "Flutamide",
			"gm-csf",
            "gtx 758",
            "hd casodex",
            "imc-a12",
            "investigational agent nos",
            "ipi vs placebo",
            "Ipilimumab",
            "Ketoconazole",
            "ketoconazole + prednisone",
            "lbh589",
            "Lupron",
            "midazolam/ptk-787",
            "Mitoxantrone",
            "Nilutamide",
			"Nilandron",
            "none",
            "nrx194204",
            "ogx-427",
            "Pazopanib",
			"Panobinostat",
            "pc-spes",
            "Prednisone",
            "Provenge",
            "psma adc",
            "px-866",
            "Radiation",
            "radium-223",
            "radium-223 + abiraterone",
            "Reolysin",
            "Sipuleucel-t",
            "Sulfurophane",
            "Taxotere",
            "Vandetanib",
			"Zoladex",
			"Zoladex;  Casodex",
            "xl-184",
            "N/A",
	"Carboplatin;  Docetaxel",
	"Carboplatin;  Taxotere",
	"Carboplatin; Etoposide",
	"Carboplatin; Taxol",
	"Casodex;  Lupron",
	"Docetaxel",
	"Docetaxel;  Carboplatin",
	"Estrogen",
	"Flutamide;  Lupron",
	"GM-CSF;  Cyclophosphamide",
	"GM-CSF;  Ketoconazole;  Hydrocortisone Sodium Succinate",
	"Goserelin",
	"Hydrocortisone Sodium Succinate;  Ketoconazole",
	"Ketoconazole",
	"Leuprolide",
	"Lupron",
	"Lupron Depot",
	"Lupron;  Bicalutamide;  Dutasteride",
	"Lupron;  Casodex",
	"Mitoxantrone",
	"Mitoxantrone;  Cabazitaxel",
	"NRX 194204",
	"Nilandron",
	"Nilutamide",
	"OGX-427",
	"PX-866",
	"Panobinostat",
	"Panobinostat;  Casodex",
	"Pazopanib",
	"Placebo",
	"Placebo;  Ipilimumab",
	"Provenge",
	"RAD001",
	"Reolysin",
	"Sipuleucel-T",
	"Taxotere",
	"Taxotere;  Carboplatin",
	"Vandetanib",
	"Xofigo",
       ],
        "label": "Treatment for mCRPC Prior to Biopsy",
		"optional": true,
        "type": [String]
    },
    "treatment_stop_date": {
        "label": "Treatment Stop Date",
		"optional": true,
        type: Date,
    },
    "when_where_stored": {
        "label": "When/where stored?",
		"optional": true,		
        type: Date,
    },
} ;


    var timestamp = (new Date()).getTime();

    if (Meteor.isClient)
        AutoForm.hooks({
            CRFquickForm: {
                // Called when form does not have a `type` attribute
                onSubmit: function (insertDoc, updateDoc, currentDoc) {
                    console.log("onsubmit")
                    insertDoc.crf = Session.get("currentForm");
                    this.event.preventDefault();
                    Meteor.call('addCRF', insertDoc, updateDoc);
                    this.resetForm();
                    $(".select2-container").select2("val", "All")
                    this.done();
                    Tracker.flush()
                    console.log("onsubmit done")
                    return false;
                }
            }
        });

    Schemas = {};

    Meteor.isClient && Template.registerHelper("Schemas", Schemas);

     function copyClean(a)  {
         var copy = {};

         for (key in a) {
             var value = a[key];
             var type = typeof(value);
             
             if (value == null)
                 ;
             else if (type == "function") {
                 value = value.name;
                 if (value == null || value.length == 0) {
                     console.log("key", key, " function is unamed");
                     debugger;
                     value = "object";
                 }
                 
             } else if (type == "object")
                 value = copyClean(value);
             else
                 ;
             copy[key] = value;
         }
         return copy;
     }


    _.each(CRFs, function(x, n) {

        var aCRFcollection = new Mongo.Collection(x);

        CRFcollections[x] = aCRFcollection;
        /*
        if (Meteor.isServer)
            aCRFcollection.remove({});
         */
        if (Meteor.isClient)
            window[x] = aCRFcollection;

        var aCRFschema = new SimpleSchema([clinicalReportFormSchemaObject, CRFprototypes[x]]);
        aCRFcollection.attachSchema(aCRFschema);
		console.log('#attach',x)
	    Schemas[x] = aCRFschema;
	
        if (Meteor.isServer) {

            CRFmetadataCollection.update({_id: x},
                {
                    _id: x,
                    name: x,
                    n: n,
                    incompleteCount: 0,
                    fieldTypes: copyClean(CRFprototypes[x]),
                    fieldOrder: CRFfieldOrder[x],
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
if (Meteor.isClient)
    Meteor.subscribe("Oncore");
});
