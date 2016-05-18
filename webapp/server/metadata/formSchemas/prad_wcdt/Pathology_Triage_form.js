LoadMetadata({
  collaborations: [ "WCDT" ],
  name: "Pathology Triage",
  specificity: "patient",
  fields: [


      Patient_ID_Type,

      /*
      {
        "type": "Select",
        "label": "Timepoint",
        "allowedValues": [
          "Baseline",
          "Progression",
          "Progression2",
          "Progression3"
        ]
      },
      */

      Specimen_ID_Type,

      {
        "type": "Select",
        "label": "Institution",
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
        "label": "Received Date",
        "autoform": autoformDate
      },
      {
        "type": "Select",
        "label": "Biopsy_Site",
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

	"label": "Other (optional, use if Biopsy Site is Other)",
        "optional": true,
      },
      {
        "type": "Select",
        "label": "FFPE Cores",
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
        "type": "Select",
        "label": "Tumor Content",
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
        "type": "Select",
        "label": "Preliminary Pathology Call",
        "allowedValues": [
          "Adenocarcinoma",
          "Small Cell",
          "IAC",
          "Indeterminate",
          "Atypical with Adeno Architecture",
          "Adeno+IAC",
          "Adeno+SC",
          "IAC+SC",
          "N/A"
        ]
      },
      {
        "type": "Select",
        "label": "DNA to be collected for shipment to Broad",
        "allowedValues": [
          "Yes",
          "No"
        ]
      },
      {
        "type": "Select",
        "label": "Slides to be sent to Duke Univeristy for Pathology Reporting",
        "allowedValues": [
          "Yes",
          "No"
        ]
      }
    ]
});
