LoadMetadata({
  collaborations: [ "WCDT" ],
  name: "Histological Research",
  specificity: "sample",
  fields: [

    /*
    * OLD Names
    *
    {
    "label": "Histology_Call", // Histology_Call_prev
    "allowedValues": [
    "Adeno",
    "Small Cell",
    "IAC/Adeno",
    "IAC",
    "Indeterminate",
    "Intermediate",
    "IAC/SC",
    "Adeno/SC",
    "Unavailable",
    "QNS"
  ],
  "type": "String"
},
*/

/*
* NEW Names
*/

{
  "label": "Histology_Call",
  "allowedValues": [
    "Adeno", // (Adenocarcinoma)",
    "SCNC", // (Small cell/neuroendocrine prostate cancer)",
    "IAC", // (Intermediate Atypical Carcinoma)",
    "SCNC+IAC", // (Mixed population: Small cell/neuroendocrine + Intermediate atypical carcinoma)",
    "SCNC+Adeno", // (Mixed population: Small cell/Neuroendocrine + Adenocarcinoma)",
    "Adeno+IAC", // (Mixed Population: Adenocarcinoma + Intermediate atypical carcinoma)",
    "Cytology mixed", // (Cytology/Architecture mixture)",
    "Unavailable",
    "QNS (Insufficient tissue to characterize)",
  ],
  "type": "select"
},

{
  "label": "Adeno",
  "type": "String"

},

{
  "label": "Small_Cell",
  "type": "String"
},
{
  "label": "Trichotomy",
  "type": "select",
  "allowedValues": [
    "Small Cell",
    "Adeno",
    "IAC",
    "Exclude",
    "N/A"
  ]
},

]

})
