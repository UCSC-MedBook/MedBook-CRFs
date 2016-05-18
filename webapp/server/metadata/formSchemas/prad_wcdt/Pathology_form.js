quantification = [
  "NA",
  "0",
  "1",
  "2",
  "3",
];

LoadMetadata({
  collaborations: [ "WCDT" ],
  name: "Pathology Form",
  specificity: "sample",
  fields: [

    {
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
      ],
      "label": "Tumor Content",
      "type": "Select"
    },
    {
      "allowedValues": [
        "Adenocarcinoma",
        "Possible SC",
        "Small Cell",
        "IAC",
        "Mixed",
        "N/A"
      ],
      "label": "Preliminary Histology",
      "max": 200,
      "type": "Select"
    },
    {

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
      ],
      "label": "Final Histology Call",
      "max": 200,
      "optional": true,
      "type": "Select"
    },
    {
      "allowedValues": [
        "Positive",
        "Focal Positive",
        "Negative",
        "Weak",
        "Failed",
        "Not Performed"
      ],
      "label": "AR Immunohistochemistry",
      "max": 200,
      "optional": true,
      "type": "Select"
    },
    {
      "allowedValues": [
        "Positive",
        "Focal Positive",
        "Negative",
        "Weak",
        "Failed",
        "Not Performed"
      ],
      "label": "PSA Immunohistochemistry",
      "max": 200,
      "optional": true,
      "type": "Select"
    },
    {

      "allowedValues": [
        "Positive",
        "Focal Positive",
        "Negative",
        "Weak",
        "Failed",
        "Not Performed"
      ],
      "label": "CHGA Immunohistochemistry",
      "max": 200,
      "optional": true,
      "type": "Select"
    },
    {
      "allowedValues": [
        "Performed",
        "Not Performed"
      ],
      "label": "CHGA test performed",
      "max": 200,
      "optional": true,
      "type": "Select"
    },
    {
      "allowedValues": [
        "Performed",
        "Not Performed"
      ],
      "label": "AR-FISH test performed",
      "max": 200,
      "optional": true,
      "type": "Select"
    },
    {
      "label": "AR_chromosomeX_ratio",
      "optional": true,
      "type": "decimal"
    },
    {
      "allowedValues": [
        "Yes",
        "No"
      ],
      "label": "ION Torrent test performed",
      "max": 200,
      "optional": true,
      "type": "Select"
    },
    {

      "allowedValues": [
        "Positive",
        "Negative",
        "Weak",
        "N/A"
      ],
      "label": "PTEN Immunohistochemistry",
      "max": 200,
      "optional": true,
      "type": "Select"
    },
    {
      "allowedValues": [
        "Performed",
        "Not Performed"
      ],
      "label": "PTEN test performed",
      "max": 200,
      "optional": true,
      "type": "Select"
    },


    {
      "label": "AR (N) nucleus",
      "type": "Select",
      "allowedValues": quantification,
    },
    {
      "label": "AR (C) cytoplasm",
      "type": "Select",
      "allowedValues": quantification,
    },
    {
      "label": "CHG",
      "type": "Select",
      "allowedValues": quantification,
    },
    {
      "label": "PTEN",
      "type": "Select",
      "allowedValues": quantification,
    },
    {
      "label": "ERG",
      "type": "Select",
      "allowedValues": quantification,
    },

  ]

})
