LoadMetadata({
  collaborations: [ "WCDT" ],
  name: "Prostate Diagnosis V4",
  specificity: "patient",
  fields: [


    Patient_ID_Type,
    {
      "label": "Date_of_CRPC_as_Defined_by_Treating_Physician",
      "optional": true,
      "type": "Date",
    },
    {
      "label": "Date_of_CRPC_as_Defined_by_Treating_Physician_Ext",
      "optional": true,
      "type": "String"
    },
    {
      "label": "Date_of_First_Metastases",
      "optional": true,
      "type": "Date",
    },
    {
      "label": "Date_of_First_Metastases_Ext",
      "optional": true,
      "type": "String"
    },
    {
      "label": "Disease_state_at_diagnosis",
      "optional": true,
      "type": "String"
    },
    {
      "label": "PSA_Date",
      "optional": true,
      "type": "Date",
    },
    {
      "label": "PSA_Date_Ext",
      "optional": true,
      "type": "String"
    },
    {
      "label": "PSA_Value_at_Diagnosis",
      "optional": true,
      "type": "decimal"
    },
    {
      "label": "Phase",
      "optional": true,
      "type": "String"
    },
    {
      "label": "Primary_Gleason_Score",
      "optional": true,
      "type": "Number"
    },
    {
      "label": "Secondary_Gleason_Score",
      "optional": true,
      "type": "Number"
    },
    {
      "label": "Segment",
      "optional": true,
      "type": "String"
    },
    {
      "label": "Total_Gleason_Score",
      "optional": true,
      "type": "Number"
    },
    {
      "label": "Visit_Date",
      "optional": true,
      "type": "Date",
    },
    {
      "label": "Day",
      "optional": true,
      "type": "Number"
    },
    {
      "label": "Date_of_diagnosis",
      "optional": true,
      "type": "Date",
    }
  ]

})
