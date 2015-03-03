
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
     'Day',
     'Phase',
     'Segment',
     'TESTOSTERONE__TOTAL',
     'Visit_Date',
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
     'PSA__complexed__direct_measurement_',
     'Arm',
     'International_Normalized_Ratio__INR_',
     'Lab_Time',
   ],
  'Demographics': 
   [ 'Patient_ID',
     'Age',
     'Arms',
     'Birth_Date',
     'Consent_Date',
     'Current_Status',
     'Ethnicity',
     'Expired_Date',
     'Gender',
     'Last_Visit',
     'Last_Visit_Date',
     'Off_Study_Date',
     'Off_Treatment_Date',
     'On_Followup_Date',
     'On_Study_Date',
     'On_Treatment_Date',
     'Race',
     'Study_Site',
     'Eligibility_Status',
     'Eligibility_Status_Date',
     'Eligibility_Version_Date',
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
     'Arm',
     'Compared_with_previous_scan',
     'Comments',
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
     'Arm',
     'Responder',
     'Best_Response',
     'Day',
     'Drug_Name',
     'If_Progressive_Disease__Specify_Type',
     'Phase',
     'Reason_for_Stopping_Treatment',
     'Segment',
     'Start_Date',
     'Start_Date_Ext',
     'Stop_Date',
     'Stop_Date_Ext',
     'Treatment_Type',
     'Visit_Date',
     'Treatment_Details',
     'Reason_for_Stopping_Treatment_Details',
     'If_other__specify',
   ],
}

CRFs = [
    'Patient_Enrollment_form',
    'Treatment_History',
    'Tissue_Specimen_form',
    'Blood_Specimen_form',
    'Histological_Assessment_form',
    'Laser_Capture_Microdissection',
    'RNASeq_completion_form',
    'Pathology_form',
    'Clinical_Info',
    'Treatment_Response_form',

    "Followup", 
    "Demographics",
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
]

Patient_ID_Type_Meta = {
    "allowedValues": crf_ids_potential(),
    "label": "Patient ID",
    type: String
};

Patient_ID_Type = {
    type: String,
    autoform: {
        type: "Patient_ID",
     }
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


CRFfieldOrder['Patient_Enrollment_form']=[
    "Patient_ID",
    "Baseline_Biopsy_Date",
    "Baseline_Biopsy_Site",
    "Institution",
];

CRFfieldOrder['Tissue_Specimen_form']=[
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
        var enrolled = CRFcollections['Patient_Enrollment_form'].find({}, {sort: {name:1}});
        var pids = enrolled.map(function(p){ return p.Patient_ID});
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


CRFprototypes = {
  'Blood_Labs_V2': {
     Patient_ID: {  type: 'String' },
     Sample_ID: {  type: 'String' },
     Day: { optional: true, type: 'Number' },
     Phase: { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'TESTOSTERONE__TOTAL': { optional: true, type: 'Number' },
     'Visit_Date': { optional: true, type: 'Date' },
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
     Patient_ID: {  type: 'String' },
     Age: { optional: true, type: 'Number' },
     Arms: { optional: true, type: 'Number' },
     'Birth_Date': { optional: true, type: 'Date' },
     'Consent_Date': { optional: true, type: 'Date' },
     'Current_Status': { optional: true, type: 'String' },
     Ethnicity: { optional: true, type: 'String' },
     'Expired_Date': { optional: true, type: 'Date' },
     Gender: { optional: true, type: 'Number', decimal: true },
     'Last_Visit': { optional: true, type: 'String' },
     'Last_Visit_Date': { optional: true, type: 'Date' },
     'Off_Study_Date': { optional: true, type: 'Date' },
     'Off_Treatment_Date': { optional: true, type: 'Date' },
     'On_Followup_Date': { optional: true, type: 'Date' },
     'On_Study_Date': { optional: true, type: 'Date' },
     'On_Treatment_Date': { optional: true, type: 'Date' },
     Race: { optional: true, type: 'String' },
     'Study_Site': { optional: true, type: 'String' },
     'Eligibility_Status': { optional: true, type: 'String' },
     'Eligibility_Status_Date': { optional: true, type: 'Date' },
     'Eligibility_Version_Date': { optional: true, type: 'Date' } },
  'ECOG_Weight_V2': {
     Patient_ID: {  type: 'String' },
     Sample_ID: {  type: 'String' },
     Day: { optional: true, type: 'Number' },
     'ECOG_PS': { optional: true, type: 'String' },
     Phase: { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date' },
     Weight: { optional: true, type: 'Number', decimal: true },
     Arm: { optional: true, type: 'String' } },
  Followup: {
     Patient_ID: {  type: 'String' },
     'Date_of_Progression': { optional: true, type: 'Date' },
     'Expired_Date': { optional: true, type: 'Date' },
     'Followup_Center': { optional: true, type: 'String' },
     'Followup_Start_Date': { optional: true, type: 'Date' },
     'Last_Known_Survival_Status': { optional: true, type: 'String' },

     'Off_Study_Date': { optional: true, type: 'Date' },
     'Off_Study_Reason': { optional: true, type: 'String' },
     'Off_Study_Reason_Explain': { optional: true, type: 'String' },

     'Off_Treatment_Date': { optional: true, type: 'Date' },
     'Off_Treatment_Reason': { optional: true, type: 'String' },
     'Off_Treatment_Reason_Explain': { optional: true, type: 'String' },

     'Last_Followup_Date': { optional: true, type: 'Date' },
     'Best_Response_Date': { optional: true, type: 'Date' } },
  'GU_Disease_Assessment_V3': { 
     Patient_ID: {  type: 'String' },
     Sample_ID: {  type: 'String' },
    'Best_Response': { optional: true, type: 'String' },
    'Are_Lesions_Present?': { optional: true, type: 'String' },
     'Date_of_Procedure': { optional: true, type: 'Date' },
     'Date_of_Procedure_Ext': { optional: true, type: 'String' },
     Day: { optional: true, type: 'Number' },
     Phase: { optional: true, type: 'String' },
     Procedure: { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date' },
     Arm: { optional: true, type: 'String' },
     'Compared_with_previous_scan': { optional: true, type: 'String' },
     Comments: { optional: true, type: 'String' } },
  'Prostate_Diagnosis_V2': { 
     Patient_ID: {  type: 'String' },
    'Date_of_diagnosis_Ext': { optional: true, type: 'String' },
     Day: { optional: true, type: 'Number' },
     'Disease_state_at_diagnosis': { optional: true, type: 'String' },
     'PSA_Date': { optional: true, type: 'Date' },
     'PSA_Value': { optional: true, type: 'Number', decimal: true },
     Phase: { optional: true, type: 'String' },
     'Primary_Gleason_Score': { optional: true, type: 'Number' },
     'Secondary_Gleason_Score': { optional: true, type: 'Number' },
     Segment: { optional: true, type: 'String' },
     'Total_Gleason_Score': { optional: true, type: 'Number' },
     'Visit_Date': { optional: true, type: 'Date' },
     'Date_of_diagnosis': { optional: true, type: 'Date' },
     Arm: { optional: true, type: 'String' } },
  'SU2C_Biopsy_AE_V1': { 
     Patient_ID: {  type: 'String' },
     Sample_ID: {  type: 'String' },
    'Best_Response': { optional: true, type: 'String' },
     Arm: { optional: true, type: 'String' },
     Day: { optional: true, type: 'Number' },
     Phase: { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date' },
     Action: { optional: true, type: 'String' },
     'Adverse_Event_Description': { optional: true, type: 'String' },
     Attribution: { optional: true, type: 'String' },
     Grade: { optional: true, type: 'Number' },
     'Onset_Date': { optional: true, type: 'Date' },
     'Onset_Date_Ext': { optional: true, type: 'String' },
     Outcome: { optional: true, type: 'String' },
     'Resolved_Date__Log_Column_': { optional: true, type: 'Date' },
     'Resolved_Date__Log_Column__Ext': { optional: true, type: 'String' },
     Serious: { optional: true, type: 'String' },
     'Unexpected?': { optional: true, type: 'String' },
     'Toxicity_Category': { optional: true, type: 'String' },
     'Toxicity_Code': { optional: true, type: 'String' } },
  'SU2C_Biopsy_V2': {
     Patient_ID: {  type: 'String' },
     Sample_ID: {  type: 'String' },
     'Best_Response': { optional: true, type: 'String' },
      Arm: { optional: true, type: 'String' },
     'Date_of_Procedure': { optional: true, type: 'Date' },
     'Date_of_Procedure_Ext': { optional: true, type: 'String' },
     Day: { optional: true, type: 'Number' },
     Phase: { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     Site: { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date' },
     'List_all_anticancer_meds_taken_within_the_24_hours_leading_up_to_biopsy': { optional: true, type: 'String' },
     'If_Other__specify': { optional: true, type: 'String' } },
  'SU2C_Pr_Ca_Tx_Sumry_V2': {
     Patient_ID: {  type: 'String' },
     Sample_ID: {  type: 'String' },
     'Best_Response': { optional: true, type: 'String' },
     Day: { optional: true, type: 'Number' },
     Phase: { optional: true, type: 'String' },
     'Radiation_Therapy': { optional: true, type: 'String' },
     'Radical_Prostatectomy': { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'Start_Date_Ext': { optional: true, type: 'String' },
     'Stop_Date_Ext': { optional: true, type: 'String' },
     'Surgery_Date_Ext': { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date' },
     'Start_Date': { optional: true, type: 'Date' },
     'Stop_Date': { optional: true, type: 'Date' },
     'Surgery_Date': { optional: true, type: 'Date' },
     Arm: { optional: true, type: 'String' } },
  'SU2C_Prior_TX_V2': {
     Patient_ID: {  type: 'String' },
     Sample_ID: {  type: 'String' },
     'Best_Response': { optional: true, type: 'String' },
      Day: { optional: true, type: 'Number' },
     'Drug_Name': { optional: true, type: 'String' },
     Phase: { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'Start_Date': { optional: true, type: 'Date' },
     'Start_Date_Ext': { optional: true, type: 'String' },
     'Stop_Date_Ext': { optional: true, type: 'String' },
     'Treatment_Type': { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date' },
     'Stop_Date': { optional: true, type: 'Date' },
     'Best_Response': { optional: true, type: 'String' },
     'If_Progressive_Disease__Specify_Type': { optional: true, type: 'String' },
     'Reason_for_Stopping_Treatment': { optional: true, type: 'String' },
     'Reason_for_Stopping_Treatment_Details': { optional: true, type: 'String' },
     'Treatment_Details': { optional: true, type: 'String' },
     'If_other__specify': { optional: true, type: 'String' },
     Arm: { optional: true, type: 'String' } },
  'SU2C_Specimen_V1': 
   { 
     Patient_ID: {  type: 'String' },
     Sample_ID: {  type: 'String' },
     'Best_Response': { optional: true, type: 'String' },
     Arm: { optional: true, type: 'String' },
     Day: { optional: true, type: 'Number' },
     Phase: { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date' },
     'Were_study_blood_samples_collected_at_this_visit?': { optional: true, type: 'String' },
     Notes: { optional: true, type: 'String' } },
  'SU2C_Subsequent_TX_V2': 
   { 
     Patient_ID: {  type: 'String' },
     Sample_ID: {  type: 'String' },
      Arm: { optional: true, type: 'String' },
      Responder: { optional: true, type: 'Boolean' },
     'Best_Response': { optional: true, type: 'String' },
     Day: { optional: true, type: 'Number' },
     'Drug_Name': { optional: true, type: 'String' },
     'If_Progressive_Disease__Specify_Type': { optional: true, type: 'String' },
     Phase: { optional: true, type: 'String' },
     'Reason_for_Stopping_Treatment': { optional: true, type: 'String' },
     Segment: { optional: true, type: 'String' },
     'Start_Date': { optional: true, type: 'Date' },
     'Start_Date_Ext': { optional: true, type: 'String' },
     'Stop_Date': { optional: true, type: 'Date' },
     'Stop_Date_Ext': { optional: true, type: 'String' },
     'Treatment_Type': { optional: true, type: 'String' },
     'Visit_Date': { optional: true, type: 'Date' },
     'Treatment_Details': { optional: true, type: 'String' },
     'Reason_for_Stopping_Treatment_Details': { optional: true, type: 'String' },
     'If_other__specify': { optional: true, type: 'String' } } };


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
    Object.keys(obj).map(function(f) {
        var g = f.replace(/[ ,()-]/g, '_');
        if (g != f) {
            obj[g] = obj[f];
            delete obj[f];
        }
    });
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
                        map_SU2C_Subsequent_TX_V2__Responder(row);
                        map_SU2C_Subsequent_TX_V2__Drug_Name(row);
                    }

                    var Sample_ID = Patient_ID ;
                    if (d >= pro)  {
                        Sample_ID += "Pro";
                        console.log('Pro !XXXXXXXXXXXXXXXXX', Sample_ID);
                    }
                    if (d >= pro2)  {
                        Sample_ID += "2";
                        console.log('Pro2 !XXXXXXXXXXXXXXXXX', Sample_ID);
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
}
if (Meteor.isClient)
    window.mapPatient = mapPatient;


map_SU2C_Subsequent_TX_V2__Responder = function(SU2C_Subsequent_TX_V2) {
    var best_response = SU2C_Subsequent_TX_V2.Best_Response;

    if ( ["Complete Response", "Partial Response", "Stable Disease" ].indexOf(best_response) >= 0)
        SU2C_Subsequent_TX_V2.Responder = true;

    else if (["Progressive Disease", "Less than Partial Response"].indexOf(best_response) >= 0)
        SU2C_Subsequent_TX_V2.Responder = false;

    else
        SU2C_Subsequent_TX_V2.Responder = null;
    console.log("SU2C_Subsequent_TX_V2.Responder", SU2C_Subsequent_TX_V2.Responder);

};
map_SU2C_Subsequent_TX_V2__Drug_Name = function(SU2C_Subsequent_TX_V2) {
    var Drug_Name = SU2C_Subsequent_TX_V2.Drug_Name;
    if (Drug_Name == null)
        return;

    // 1. Delete prednisone
    var drugs = SU2C_Subsequent_TX_V2.Drug_Name.split("; ").filter(function(d) {
        return ! d.match(/Prednisone/);
    }).map(function(s) {
        return s.
            //2. MDV3100
            replace("MDV3100", "Enzalutamide")

            // 3. Abiraterone Acetate
            .replace("Abiraterone Acetate", "Abiraterone")

            // 4. Zytiga
            .replace("Zytiga", "Abiraterone");
    });

    var d = drugs.join("; ");

    if (SU2C_Subsequent_TX_V2.Drug_Name != d) {
        console.log("Drugs before", SU2C_Subsequent_TX_V2.Drug_Name, "<"); 
        console.log("Drugs after", d, "<"); 
    }
    SU2C_Subsequent_TX_V2.Drug_Name = d;
};


ingestOncore = function () {
    console.log("Ingesting begun");
    Oncore.find({}, {sort: {patient:1}}).forEach(function(patient) {

        if (patient.attributes.Followup && patient.attributes.Followup["Date of Progression"])
            console.log("patient.attributes.Followup.Date of Progression", patient.attributes.Followup["Date of Progression"]);
        mapPatient(patient)
    });
    console.log("Ingesting finished");
}
Meteor.startup(function() {
    console.log("ingestOncore is defined");
    if (Meteor.isServer)  {
        // ingestOncore();

        HTTP.methods({
            ingestOncore : function() {
                Meteor.call("ingestOncore");
                return "ingesting";
            },
        });

        Meteor.methods({
            ingestOncore : function() {
                ingestOncore();
            },

        })
  }// isServer

});

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
      "Patient_ID",
      'Core',
      'BlockImage',
      'ReferenceSlideNumber',
      'ReferenceSlideImages',
      'BlockStatus',
    ];
    ComplexIDFields['Histological_Assessment_form'] = [ "Patient_ID", "Core"];

    CRFprototypes['Histological_Assessment_form'] = ({
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
    ComplexIDFields['Laser_Capture_Microdissection'] = [ "Patient_ID", "Core"];

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

    CRFprototypes['Patient_Enrollment_form'] = ({
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
    CRFprototypes['Tissue_Specimen_form'] = ({
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
    CRFfieldOrder["Clinical_Info"] =  [
        "Patient_ID",
        "site",
        "prior_tissue",
        "when_where_stored",
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
CRFprototypes["Clinical_Info"] =  {
    "abi_date_of_pd": {
        "label": "Abi date of PD",
        type: Date,
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
        "type": String
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
        "type": String
    },
    "abi_start_date": {
        "label": "Abi start date",
        type: Date,
    },
    "abi_stop_date": {
        "label": "Abi stop date",
        type: Date,
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
        "type": String
    },
    "adt_start_date": {
        "label": "ADT Start Date",
        type: Date,
    },
    "alk_phos_at_biopsy": {
        "label": "Alk phos at biopsy",
        "type": "Number"
    },
    "biopsy_date": {
        "label": "Biopsy Date",
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
            "Soft tissue"
        ],
        "label": "Biopsy site",
        "type": String
    },
    "chga_at_biopsy": {
        "decimal": true,
        "label": "CHGA at biopsy",
        "type": "Number"
    },
    "date_of_castration_resistance": {
        "label": "Date of Castration Resistance",
        type: Date,
    },
    "date_of_death_or_last_contact": {
        "label": "Date of Death or Last Contact",
        type: Date,
    },
    "date_of_diagnosis": {
        "label": "Date of Diagnosis",
        type: Date,
    },
    "date_of_progression": {
        "label": "Date of Progression",
        type: Date,
    },
    "death_or_last_contact": {
        "allowedValues": [
            "Death",
            "Last Contact",
            "Last contact",
            "Unk"
        ],
        "label": "Death or Last Contact",
        "type": String
    },
    "ecog_ps_at_biopsy": {
        "label": "ECOG PS at biopsy",
        "type": "Number"
    },
    "enza_date_of_progression": {
        "label": "Enza date of progression",
        type: Date,
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
        "type": String
    },
    "enza_start_date": {
        "label": "Enza start date",
        type: Date,
    },
    "enza_stop_date": {
        "label": "Enza stop date",
        type: Date,
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
        "type": String
    },
    "first_date_of_metastases": {
        "label": "First Date of Metastases",
        type: Date,
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
        "type": String
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
        "type": String
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
        "label": "Post-Biopsy treatment",
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
        "type": String
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
        "type": String
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
        "type": String
    },
    "start_date": {
        "label": "Start Date",
        type: Date,
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
        "type": String
    },
    "steroid_stop_date": {
        "label": "Steroid stop date",
        type: Date,
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
        "type": String
    },
    "treatment_stop_date": {
        "label": "Treatment Stop Date",
        type: Date,
    },
    "when_where_stored": {
        "label": "When/where stored?",
        type: Date,
    },
} ;


    var timestamp = (new Date()).getTime();

    if (Meteor.isClient)
        AutoForm.hooks({
            CRFquickForm: {
                // Called when form does not have a `type` attribute
                onSubmit: function (insertDoc, updateDoc, currentDoc) {
                    insertDoc.crf = Session.get("currentForm");
                    this.event.preventDefault();
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
        /*
        if (Meteor.isServer)
            aCRFcollection.remove({});
         */
        if (Meteor.isClient)
            window[x] = aCRFcollection;

        var aCRFschema = new SimpleSchema([clinicalReportFormSchemaObject, CRFprototypes[x]]);
        aCRFcollection.attachSchema(aCRFschema);

        if (Meteor.isServer) {

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
if (Meteor.isClient)
    Meteor.subscribe("Oncore");
