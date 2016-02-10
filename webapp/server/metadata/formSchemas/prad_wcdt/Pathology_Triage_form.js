LoadMetadata("prad_wcdt", {
    "Form_Name": "Pathology Triage",
    "Fields": [

      Patient_ID_Type,

      Specimen_ID_Type,

      {
        "type": "String",
        "Field_Name": "Timepoint",
        "allowedValues": [
          "Baseline",
          "3 Months",
          "Progression",
          "Progression2",
          "Progression3"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Institution",
        "allowedValues": [
          "UCSF",
          "OHSU",
          "UCLA",
          "UCD",
          "UBC"
        ]
      },
      {
        "type": "Date",
        "Field_Name": "Received Date"
      },
      {
        "type": "String",
        "Field_Name": "Biopsy_Site",
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
        ]
      },
      {
        "type": "String",
        "Field_Name": "Biopsy_Site_Other"
      },
      {
        "type": "String",
        "Field_Name": "FFPE Cores",
        "allowedValues": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Tumor Content",
        "allowedValues": [
          "None",
          "<5%",
          "5%",
          "10%",
          "20%",
          "30%",
          "40%",
          "50%",
          "60%",
          "70%",
          "80%",
          "90%",
          "100%"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Preliminary Pathology Call",
        "allowedValues": [
          "Adenocarcinoma",
          "Small Cell",
          "ANPC",
          "Indeterminate",
          "Atypical with Adeno Architecture",
          "Adeno+ANPC",
          "Adeno+SC",
          "ANPC+SC",
          "N/A"
        ]
      },
      {
        "type": "String",
        "Field_Name": "DNA to be collected for shipment to Broad",
        "allowedValues": [
          "Yes"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Slides to be sent to Duke University for Pathology Reporting",
        "allowedValues": [
          "Yes"
        ]
      }
    ]
});
